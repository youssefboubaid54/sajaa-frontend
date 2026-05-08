"use client";

import { CartItem } from "@/store/cart-store";
import { formatPrice } from "@/lib/pricing";

interface CartLineItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
}

const PRODUCT_EMOJI: Record<string, string> = {
  hams: "🌿",
  hidn: "😴",
  subaat: "✨",
};

const QTY_LABELS: Record<number, string> = {
  1: "قطعة واحدة",
  2: "قطعتان",
  3: "٣ قطع",
};

export default function CartLineItem({ item, onRemove }: CartLineItemProps) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-soft border border-beige">
      {/* Product icon */}
      <div className="w-14 h-14 rounded-xl bg-beige flex items-center justify-center text-2xl flex-shrink-0 select-none">
        {PRODUCT_EMOJI[item.productSlug] ?? "🛍️"}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-navy text-sm truncate">{item.productNameAr}</p>
        <p className="text-xs text-muted">{QTY_LABELS[item.quantity] ?? `${item.quantity} قطع`}</p>
        <p className="text-sm font-bold text-navy mt-1">{formatPrice(item.offerPriceSar)}</p>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-1.5 rounded-full hover:bg-beige transition-colors text-muted hover:text-error flex-shrink-0"
        aria-label={`إزالة ${item.productNameAr}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3,6 5,6 21,6" />
          <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
        </svg>
      </button>
    </div>
  );
}
