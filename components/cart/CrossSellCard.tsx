"use client";

import { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

interface CrossSellCardProps {
  product: Product;
  isCompletingRitual?: boolean;
}

const CROSS_SELL_COPY: Record<string, string> = {
  hams: "حضّري الغرفة قبل النوم.",
  hidn: "أغلقي الضوء والحرارة.",
  subaat: "لما يكون العقل باقي صاحي.",
};

const PRODUCT_EMOJI: Record<string, string> = {
  hams: "🌿",
  hidn: "😴",
  subaat: "✨",
};

export default function CrossSellCard({ product, isCompletingRitual }: CrossSellCardProps) {
  const { addItem } = useCartStore();

  function handleAdd() {
    addItem({
      productSlug: product.slug,
      productNameAr: product.nameAr,
      productNameEn: product.nameEn,
      quantity: 1,
      offerPriceSar: 199,
      unitAnchorPriceSar: 199,
      image: "",
      addedFrom: "cart_cross_sell",
    });
  }

  return (
    <div className="flex items-center gap-3 bg-white border border-beige rounded-2xl p-3 hover:border-gold transition-colors">
      <div className="w-10 h-10 rounded-xl bg-beige flex items-center justify-center text-xl flex-shrink-0 select-none">
        {PRODUCT_EMOJI[product.slug] ?? "🛍️"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-navy">
          {isCompletingRitual ? "اكملي طقس سَجَى" : product.nameAr}
        </p>
        <p className="text-xs text-muted truncate">
          {CROSS_SELL_COPY[product.slug] ?? product.taglineAr}
        </p>
      </div>
      <button
        onClick={handleAdd}
        className="flex-shrink-0 bg-navy text-gold text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-navy/90 transition-colors whitespace-nowrap"
      >
        + ١٩٩ ريال
      </button>
    </div>
  );
}
