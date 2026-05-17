import { NextResponse } from "next/server";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";

const ALL_SLUGS = ["hams", "hidn", "subaat"];
const UPSELL_PRICE = 99;
const UPSELL_EXPIRES = 180;

const ORDERS_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(ORDERS_DIR, "orders.json");

interface OrderRecord {
  intentId: string;
  order_number: string | null;
  status: "intent" | "confirmed";
  customer_name: string;
  phone: string;
  cart: { product_slug: string; quantity: number }[];
  upsell: { accepted: boolean; product_slug?: string } | null;
  total_sar: number | null;
  attribution: Record<string, string>;
  createdAt: string;
  confirmedAt: string | null;
}

async function readOrders(): Promise<OrderRecord[]> {
  try {
    const buf = await fs.readFile(ORDERS_FILE, "utf8");
    const parsed = JSON.parse(buf);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeOrders(orders: OrderRecord[]): Promise<void> {
  await fs.mkdir(ORDERS_DIR, { recursive: true });
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}

function parseSlugFromCartItem(productSlug: string): string {
  return productSlug.split("_")[0];
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

  const customerName = body.customer_name as string | undefined;
  const phone = body.phone as string | undefined;
  const cart = body.cart as { product_slug: string; quantity: number }[] | undefined;

  if (!customerName || customerName.trim().length < 2) {
    return NextResponse.json(
      { detail: "الاسم مطلوب (حرفين على الأقل)" },
      { status: 422 }
    );
  }
  if (!phone) {
    return NextResponse.json(
      { detail: "رقم الجوال مطلوب" },
      { status: 422 }
    );
  }
  if (!cart || cart.length === 0) {
    return NextResponse.json(
      { detail: "السلة فارغة" },
      { status: 422 }
    );
  }

  const intentId = crypto.randomUUID();

  const record: OrderRecord = {
    intentId,
    order_number: null,
    status: "intent",
    customer_name: customerName.trim(),
    phone,
    cart,
    upsell: null,
    total_sar: null,
    attribution: (body.attribution as Record<string, string>) || {},
    createdAt: new Date().toISOString(),
    confirmedAt: null,
  };

  try {
    const orders = await readOrders();
    orders.push(record);
    await writeOrders(orders);
  } catch (err) {
    console.error("[orders/intent] Failed to persist intent:", err);
    return NextResponse.json(
      { detail: "تعذّر حفظ الطلب. حاولي مرة أخرى." },
      { status: 500 }
    );
  }

  const cartSlugs = new Set(cart.map((c) => parseSlugFromCartItem(c.product_slug)));
  const upsellSlug = ALL_SLUGS.find((s) => !cartSlugs.has(s));

  return NextResponse.json({
    order_intent_id: intentId,
    normalized_phone: phone,
    upsell: upsellSlug
      ? {
          product_slug: upsellSlug,
          price_sar: UPSELL_PRICE,
          expires_in_seconds: UPSELL_EXPIRES,
        }
      : null,
  });
}
