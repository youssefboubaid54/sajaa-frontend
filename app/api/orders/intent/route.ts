import { NextResponse } from "next/server";
import crypto from "crypto";
import { withTransaction } from "@/lib/db";
import { validateSaudiPhone } from "@/lib/phone";

const PRODUCT_PRICES: Record<string, number> = {
  hams_1: 199, hams_2: 279, hams_3: 349,
  hidn_1: 199, hidn_2: 279, hidn_3: 349,
  subaat_1: 199, subaat_2: 279, subaat_3: 349,
};

const UPSELL_RULES: Record<string, string> = {
  hams: "hidn",
  hidn: "hams",
  subaat: "hams",
  "hams,hidn": "subaat",
  "hams,subaat": "hidn",
  "hidn,subaat": "hams",
  "hams,hidn,subaat": "hams",
};

const UPSELL_PRICE_SAR = 99;
const UPSELL_EXPIRES_SECONDS = 15;

function hashPhoneSha256(digits: string): string {
  return crypto.createHash("sha256").update(digits, "utf8").digest("hex");
}

function recommendUpsell(cart: { product_slug: string }[]): string | null {
  const bases = Array.from(new Set(cart.map((c) => c.product_slug.split("_")[0].toLowerCase()))).sort();
  return UPSELL_RULES[bases.join(",")] ?? null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "JSON غير صالح" }, { status: 400 });
  }

  const customerName = (body.customer_name as string | undefined)?.trim();
  const rawPhone = body.phone as string | undefined;
  const cart = body.cart as { product_slug: string; quantity: number }[] | undefined;

  if (!customerName || customerName.length < 2) {
    return NextResponse.json(
      { detail: "الاسم مطلوب (حرفين على الأقل)" },
      { status: 422 }
    );
  }
  if (!rawPhone) {
    return NextResponse.json({ detail: "رقم الجوال مطلوب" }, { status: 422 });
  }
  if (!cart || cart.length === 0) {
    return NextResponse.json({ detail: "السلة فارغة" }, { status: 422 });
  }

  for (const item of cart) {
    const slug = item.product_slug?.trim().toLowerCase();
    if (!slug || !PRODUCT_PRICES[slug]) {
      return NextResponse.json(
        { detail: `منتج غير معروف: '${item.product_slug}'` },
        { status: 400 }
      );
    }
  }

  const phone = validateSaudiPhone(rawPhone);
  if (!phone.isValid || !phone.e164 || !phone.digits) {
    return NextResponse.json(
      { detail: phone.error || "رقم جوال غير صالح" },
      { status: 422 }
    );
  }

  const orderId = crypto.randomUUID();
  const phoneSha256 = hashPhoneSha256(phone.digits);
  const itemsJson = cart.map((c) => ({
    product_slug: c.product_slug,
    quantity: c.quantity,
  }));
  const attribution = body.attribution ?? {};
  const cookies = body.cookies ?? {};
  const client = body.client ?? {};

  try {
    await withTransaction(async (dbClient) => {
      const insertResult = await dbClient.query(
        `INSERT INTO orders (
          id, status, customer_name,
          phone_e164, phone_digits, phone_sha256,
          subtotal_sar, upsell_sar, total_sar,
          currency, payment_method,
          items_json, attribution_json, cookies_json, client_json,
          event_ids_json, capi_status_json
        ) VALUES (
          $1, 'intent', $2,
          $3, $4, $5,
          0, 0, 0,
          'SAR', 'COD',
          $6, $7, $8, $9,
          '{}', '{}'
        )`,
        [
          orderId,
          customerName,
          phone.e164,
          phone.digits,
          phoneSha256,
          JSON.stringify(itemsJson),
          JSON.stringify(attribution),
          JSON.stringify(cookies),
          JSON.stringify(client),
        ]
      );

      if (insertResult.rowCount !== 1) {
        throw new Error(
          `[orders/intent] INSERT returned rowCount=${insertResult.rowCount}, expected 1`
        );
      }

      console.log(
        `[orders/intent] INSERTED order id=${orderId} status=intent into PostgreSQL (rowCount=${insertResult.rowCount})`
      );
    });
  } catch (err) {
    console.error("[orders/intent] PostgreSQL INSERT failed:", err);
    return NextResponse.json(
      { detail: "تعذّر حفظ الطلب. حاولي مرة أخرى." },
      { status: 500 }
    );
  }

  const upsellBase = recommendUpsell(cart);

  return NextResponse.json(
    {
      order_intent_id: orderId,
      normalized_phone: phone.e164,
      upsell: upsellBase
        ? {
            product_slug: upsellBase,
            price_sar: UPSELL_PRICE_SAR,
            expires_in_seconds: UPSELL_EXPIRES_SECONDS,
          }
        : null,
    },
    { status: 201 }
  );
}
