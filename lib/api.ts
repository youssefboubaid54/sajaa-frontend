// API client for backend calls
// Base URL from env: process.env.NEXT_PUBLIC_API_URL

export interface OrderIntentRequest {
  customer_name: string;
  phone: string;
  cart: Array<{ product_slug: string; quantity: number; offer_price_sar: number }>;
  attribution: Record<string, string>;
  client: { user_agent: string; ip?: string };
}

export interface OrderIntentResponse {
  order_intent_id: string;
  normalized_phone: string;
  upsell: {
    product_slug: string;
    price_sar: number;
    expires_in_seconds: number;
  };
}

export interface OrderFinalizeRequest {
  order_intent_id: string;
  customer: {
    name: string;
    phone_raw: string;
    phone_e164: string;
    phone_digits: string;
  };
  cart: Array<{ product_slug: string; quantity: number; offer_price_sar: number }>;
  upsell: {
    accepted: boolean;
    product_slug?: string;
    price_sar?: number;
  };
  pricing: {
    subtotal_sar: number;
    upsell_sar: number;
    total_sar: number;
  };
  events: {
    purchase_event_id: string;
    initiate_checkout_event_id: string;
  };
  attribution: Record<string, string>;
  cookies: Record<string, string>;
  page: {
    event_source_url: string;
    landing_url: string;
  };
}

export interface OrderFinalizeResponse {
  order_id: string;
  status: string;
  total_sar: number;
  thank_you_url: string;
}

export async function createOrderIntent(
  payload: OrderIntentRequest
): Promise<OrderIntentResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error((error as { detail?: string }).detail || "فشل إنشاء الطلب");
  }
  return res.json();
}

export async function finalizeOrder(
  payload: OrderFinalizeRequest
): Promise<OrderFinalizeResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/finalize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error((error as { detail?: string }).detail || "فشل تأكيد الطلب");
  }
  return res.json();
}
