import type { CartItem } from "@/store/cart-store";

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.offerPriceSar, 0);
}

export function getCartAnchorTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.unitAnchorPriceSar * item.quantity,
    0
  );
}

export function getCartSavings(items: CartItem[]): number {
  return Math.max(0, getCartAnchorTotal(items) - getCartSubtotal(items));
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function formatPrice(priceSar: number): string {
  return `${priceSar.toLocaleString("ar-SA")} ريال`;
}

export function getOfferLabel(qty: 1 | 2 | 3): string {
  const labels: Record<1 | 2 | 3, string> = {
    1: "قطعة واحدة",
    2: "قطعتان",
    3: "٣ قطع",
  };
  return labels[qty];
}
