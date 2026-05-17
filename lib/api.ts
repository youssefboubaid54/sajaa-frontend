import type { CartItem } from "@/store/cart-store";

export interface ApiCartItem {
  product_slug: string;
  quantity: number;
}

export interface ApiClientInfo {
  user_agent: string;
  ip?: string;
  fbp?: string;
  fbc?: string;
  ttclid?: string;
  sc_click_id?: string;
}

export class ApiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiConfigError";
  }
}

export function isApiConfigured(): boolean {
  return true;
}

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : "";
}

const VALID_SLUGS = new Set(["hams", "hidn", "subaat"]);

export function buildOrderCartPayload(items: CartItem[]): ApiCartItem[] {
  const validItems = items.filter((item) => VALID_SLUGS.has(item.productSlug));
  if (validItems.length === 0) {
    throw new Error("السلة فارغة أو تحتوي على منتجات غير صالحة.");
  }
  return validItems.map((item) => ({
    product_slug: `${item.productSlug}_${item.quantity}`,
    quantity: 1,
  }));
}

export function getTrackingCookies(): Record<string, string> {
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    ttp: readCookie("_ttp"),
  };
}

export function getBrowserClient(
  attribution: Record<string, string> = {}
): ApiClientInfo {
  return {
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    fbp: readCookie("_fbp") || attribution._fbp || "",
    fbc: readCookie("_fbc") || attribution._fbc || "",
    ttclid: attribution.ttclid || "",
    sc_click_id: attribution.sc_click_id || attribution.ScCid || "",
  };
}

export interface OrderIntentRequest {
  customer_name: string;
  phone: string;
  cart: ApiCartItem[];
  attribution: Record<string, string>;
  client: ApiClientInfo;
  cookies?: Record<string, string>;
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
  customer_name: string;
  phone: string;
  cart: ApiCartItem[];
  upsell: {
    accepted: boolean;
    product_slug?: string;
  };
  attribution: Record<string, string>;
  cookies: Record<string, string>;
  client: ApiClientInfo;
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
  if (!payload.cart || payload.cart.length === 0) {
    throw new Error("لا يمكن إنشاء طلب بسلة فارغة.");
  }

  const res = await fetch("/api/orders/intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = (body as Record<string, string>).detail
      || (body as Record<string, string>).message;
    throw new Error(msg || "فشل إنشاء الطلب");
  }
  return res.json();
}

export async function finalizeOrder(
  payload: OrderFinalizeRequest
): Promise<OrderFinalizeResponse> {
  if (!payload.order_intent_id) {
    throw new Error("رقم الطلب مفقود. حاولي إعادة إتمام الطلب.");
  }

  const res = await fetch("/api/orders/finalize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = (body as Record<string, string>).detail
      || (body as Record<string, string>).message;
    throw new Error(msg || "فشل تأكيد الطلب");
  }
  return res.json();
}
