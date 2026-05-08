import { v4 as uuidv4 } from "uuid";

type PixelEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase";

export function generateEventId(eventName: PixelEvent): string {
  const eventKey = eventName.toLowerCase().replace(/([A-Z])/g, "_$1").toLowerCase();
  return `sajaa_${eventKey}_${uuidv4()}`;
}

export function generateOrderIntentId(): string {
  return `oi_${uuidv4().replace(/-/g, "")}`;
}
