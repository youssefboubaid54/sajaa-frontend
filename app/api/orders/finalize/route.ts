import { NextResponse } from "next/server";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

const ORDERS_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(ORDERS_DIR, "orders.json");

const PRICE_MAP: Record<string, number> = {
  "1": 199,
  "2": 279,
  "3": 349,
};
const UPSELL_PRICE = 99;

function generateOrderId(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = crypto.randomBytes(2).toString("hex").toUpperCase();
  return `SJ-${yy}${mm}${dd}-${rand}`;
}

function computeTotal(
  cart: { product_slug: string }[],
  upsellAccepted: boolean
): number {
  let total = 0;
  for (const item of cart) {
    const parts = item.product_slug.split("_");
    const qty = parts[1] || "1";
    total += PRICE_MAP[qty] ?? 199;
  }
  if (upsellAccepted) total += UPSELL_PRICE;
  return total;
}

async function appendOrder(record: unknown): Promise<void> {
  await fs.mkdir(ORDERS_DIR, { recursive: true });
  let existing: unknown[] = [];
  try {
    const buf = await fs.readFile(ORDERS_FILE, "utf8");
    const parsed = JSON.parse(buf);
    if (Array.isArray(parsed)) existing = parsed;
  } catch {
    // file doesn't exist yet
  }
  existing.push(record);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(existing, null, 2), "utf8");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { detail: "JSON غير صالح" },
      { status: 400 }
    );
  }

  const intentId = body.order_intent_id as string | undefined;
  const customerName = body.customer_name as string | undefined;
  const phone = body.phone as string | undefined;
  const cart = body.cart as { product_slug: string; quantity: number }[] | undefined;
  const upsell = body.upsell as { accepted: boolean; product_slug?: string } | undefined;

  if (!intentId) {
    return NextResponse.json(
      { detail: "رقم الطلب المؤقت مفقود" },
      { status: 422 }
    );
  }
  if (!customerName || !phone) {
    return NextResponse.json(
      { detail: "بيانات العميل مفقودة" },
      { status: 422 }
    );
  }
  if (!cart || cart.length === 0) {
    return NextResponse.json(
      { detail: "السلة فارغة" },
      { status: 422 }
    );
  }

  const upsellAccepted = upsell?.accepted === true;
  const total = computeTotal(cart, upsellAccepted);
  const orderId = generateOrderId();

  const record = {
    orderId,
    intentId,
    receivedAt: new Date().toISOString(),
    customer_name: customerName.trim(),
    phone,
    cart,
    upsell: upsellAccepted
      ? { accepted: true, product_slug: upsell?.product_slug }
      : { accepted: false },
    total_sar: total,
    attribution: body.attribution || {},
  };

  try {
    await appendOrder(record);
  } catch (err) {
    console.error("[orders/finalize] Failed to persist order:", err);
    return NextResponse.json(
      { detail: "تعذّر حفظ الطلب. حاولي مرة أخرى." },
      { status: 500 }
    );
  }

  // Clean up intent from memory
  if (globalThis.__orderIntents) {
    globalThis.__orderIntents.delete(intentId);
  }

  return NextResponse.json({
    order_id: orderId,
    status: "confirmed",
    total_sar: total,
    thank_you_url: `/thank-you/${orderId}`,
  });
}
