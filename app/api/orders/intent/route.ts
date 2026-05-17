import { NextResponse } from "next/server";
import crypto from "crypto";

const ALL_SLUGS = ["hams", "hidn", "subaat"];
const UPSELL_PRICE = 99;
const UPSELL_EXPIRES = 180;

interface IntentData {
  customer_name: string;
  phone: string;
  cart: { product_slug: string; quantity: number }[];
  attribution: Record<string, string>;
  created_at: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __orderIntents: Map<string, IntentData> | undefined;
}

function getIntentStore(): Map<string, IntentData> {
  if (!globalThis.__orderIntents) {
    globalThis.__orderIntents = new Map();
  }
  return globalThis.__orderIntents;
}

function parseSlugFromCartItem(productSlug: string): string {
  const parts = productSlug.split("_");
  return parts[0];
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

  const store = getIntentStore();
  store.set(intentId, {
    customer_name: customerName.trim(),
    phone,
    cart,
    attribution: (body.attribution as Record<string, string>) || {},
    created_at: Date.now(),
  });

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
