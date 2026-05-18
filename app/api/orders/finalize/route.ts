import { NextResponse } from "next/server";
import crypto from "crypto";
import { withTransaction } from "@/lib/db";
import { validateSaudiPhone } from "@/lib/phone";

const ORDER_NUMBER_PREFIX = "SJ";

const PRODUCT_PRICES: Record<string, number> = {
  hams_1: 199, hams_2: 279, hams_3: 349,
  hidn_1: 199, hidn_2: 279, hidn_3: 349,
  subaat_1: 199, subaat_2: 279, subaat_3: 349,
};

const UPSELL_PRICE_SAR = 99;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sajaa.health";

function hashPhoneSha256(digits: string): string {
  return crypto.createHash("sha256").update(digits, "utf8").digest("hex");
}

interface CartItem {
  product_slug: string;
  quantity: number;
}

function resolvePrice(slug: string): number {
  const price = PRODUCT_PRICES[slug.trim().toLowerCase()];
  if (price === undefined) {
    throw new Error(`Unknown product slug '${slug}'`);
  }
  return price;
}

function calculateSubtotal(cart: CartItem[]): { subtotal: number; items: Record<string, unknown>[] } {
  const items: Record<string, unknown>[] = [];
  let subtotal = 0;
  for (const item of cart) {
    const unitPrice = resolvePrice(item.product_slug);
    const lineTotal = unitPrice * item.quantity;
    subtotal += lineTotal;
    items.push({
      product_slug: item.product_slug,
      quantity: item.quantity,
      unit_price_sar: unitPrice,
      line_total_sar: lineTotal,
    });
  }
  return { subtotal, items };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "JSON غير صالح" }, { status: 400 });
  }

  const intentId = body.order_intent_id as string | undefined;
  const customerName = (body.customer_name as string | undefined)?.trim();
  const rawPhone = body.phone as string | undefined;
  const cart = body.cart as CartItem[] | undefined;
  const upsell = body.upsell as { accepted?: boolean; product_slug?: string } | undefined;

  if (!intentId) {
    return NextResponse.json({ detail: "رقم الطلب المؤقت مفقود" }, { status: 422 });
  }
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

  const phone = validateSaudiPhone(rawPhone);
  if (!phone.isValid || !phone.e164 || !phone.digits) {
    return NextResponse.json(
      { detail: phone.error || "رقم جوال غير صالح" },
      { status: 422 }
    );
  }

  let subtotal: number;
  let items: Record<string, unknown>[];
  try {
    ({ subtotal, items } = calculateSubtotal(cart));
  } catch (err) {
    return NextResponse.json(
      { detail: err instanceof Error ? err.message : "خطأ في حساب المجموع" },
      { status: 400 }
    );
  }

  const upsellAccepted = upsell?.accepted === true && !!upsell.product_slug;
  const upsellSar = upsellAccepted ? UPSELL_PRICE_SAR : 0;
  const totalSar = subtotal + upsellSar;
  const upsellJson = upsellAccepted
    ? { accepted: true, product_slug: upsell!.product_slug, price_sar: UPSELL_PRICE_SAR }
    : { accepted: false };

  const phoneSha256 = hashPhoneSha256(phone.digits);
  const attribution = body.attribution ?? {};
  const cookies = body.cookies ?? {};
  const client = body.client ?? {};

  try {
    const result = await withTransaction(async (dbClient) => {
      // Fetch the intent row with FOR UPDATE lock
      const fetchResult = await dbClient.query(
        `SELECT id, status, order_number FROM orders WHERE id = $1 FOR UPDATE`,
        [intentId]
      );

      if (fetchResult.rows.length === 0) {
        return { error: "الطلب المؤقت غير موجود أو منتهي الصلاحية.", status: 404 };
      }

      const existingOrder = fetchResult.rows[0] as { id: string; status: string; order_number: string | null };

      if (existingOrder.status !== "intent") {
        // Idempotent: already finalized
        if (existingOrder.order_number) {
          const verifyResult = await dbClient.query(
            `SELECT order_number, status, total_sar FROM orders WHERE id = $1`,
            [intentId]
          );
          const row = verifyResult.rows[0] as { order_number: string; status: string; total_sar: number };
          return {
            order_id: row.order_number,
            status: row.status,
            total_sar: row.total_sar,
            thank_you_url: `${SITE_URL}/thank-you/${row.order_number}`,
          };
        }
        return {
          error: `الطلب بحالة '${existingOrder.status}' ولا يمكن تأكيده مرة أخرى.`,
          status: 400,
        };
      }

      // Generate sequential order number using order_year_counters (race-safe with row lock)
      const year = new Date().getUTCFullYear();
      const counterResult = await dbClient.query(
        `SELECT next_seq FROM order_year_counters WHERE year = $1 FOR UPDATE`,
        [year]
      );

      let seq: number;
      if (counterResult.rows.length === 0) {
        await dbClient.query(
          `INSERT INTO order_year_counters (year, next_seq) VALUES ($1, 2)`,
          [year]
        );
        seq = 1;
      } else {
        seq = (counterResult.rows[0] as { next_seq: number }).next_seq;
        await dbClient.query(
          `UPDATE order_year_counters SET next_seq = $1 WHERE year = $2`,
          [seq + 1, year]
        );
      }

      const orderNumber = `${ORDER_NUMBER_PREFIX}-${year}-${String(seq).padStart(6, "0")}`;

      // UPDATE the same row — status becomes "received", order_number populated
      const updateResult = await dbClient.query(
        `UPDATE orders SET
          order_number = $1,
          status = 'received',
          customer_name = $2,
          phone_e164 = $3,
          phone_digits = $4,
          phone_sha256 = $5,
          subtotal_sar = $6,
          upsell_sar = $7,
          total_sar = $8,
          items_json = $9,
          upsell_json = $10,
          attribution_json = $11,
          cookies_json = $12,
          client_json = $13,
          updated_at = NOW()
        WHERE id = $14 AND status = 'intent'`,
        [
          orderNumber,
          customerName,
          phone.e164,
          phone.digits,
          phoneSha256,
          subtotal,
          upsellSar,
          totalSar,
          JSON.stringify(items),
          JSON.stringify(upsellJson),
          JSON.stringify(attribution),
          JSON.stringify(cookies),
          JSON.stringify(client),
          intentId,
        ]
      );

      if (updateResult.rowCount !== 1) {
        throw new Error(
          `[orders/finalize] UPDATE returned rowCount=${updateResult.rowCount}, expected 1. ` +
          `Order id=${intentId} was NOT updated in PostgreSQL.`
        );
      }

      // Hard validation: verify the row was actually updated in PostgreSQL
      const verifyResult = await dbClient.query(
        `SELECT order_number, status, total_sar FROM orders WHERE id = $1`,
        [intentId]
      );

      if (verifyResult.rows.length === 0) {
        throw new Error(`[orders/finalize] Post-update verification failed: row id=${intentId} not found`);
      }

      const verified = verifyResult.rows[0] as { order_number: string | null; status: string; total_sar: number };
      if (verified.status !== "received" || verified.order_number !== orderNumber) {
        throw new Error(
          `[orders/finalize] Post-update verification mismatch: ` +
          `expected status=received, order_number=${orderNumber}; ` +
          `got status=${verified.status}, order_number=${verified.order_number}`
        );
      }

      console.log(
        `[orders/finalize] UPDATED order id=${intentId} → ` +
        `order_number=${orderNumber}, status=received, total_sar=${totalSar} ` +
        `(rowCount=${updateResult.rowCount}, verified=true)`
      );

      return {
        order_id: orderNumber,
        status: "received",
        total_sar: totalSar,
        thank_you_url: `${SITE_URL}/thank-you/${orderNumber}`,
      };
    });

    // Check if the transaction returned an error object
    if ("error" in result) {
      return NextResponse.json(
        { detail: result.error },
        { status: result.status as number }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("[orders/finalize] PostgreSQL UPDATE failed:", err);
    return NextResponse.json(
      { detail: "تعذّر تأكيد الطلب. حاولي مرة أخرى." },
      { status: 500 }
    );
  }
}
