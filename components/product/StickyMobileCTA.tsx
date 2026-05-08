"use client";

import { useState } from "react";
import { Product, OFFERS } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { fireAddToCart } from "@/lib/pixels";
import { generateEventId } from "@/lib/event-id";
import { formatPrice } from "@/lib/pricing";

interface StickyMobileCTAProps {
  product: Product;
}

export default function StickyMobileCTA({ product }: StickyMobileCTAProps) {
  const { addItem } = useCartStore();
  const defaultOffer = OFFERS.find((o) => o.isDefault) ?? OFFERS[1];
  const [added, setAdded] = useState(false);

  function handleAdd() {
    const eventId = generateEventId("AddToCart");
    addItem({
      productSlug: product.slug,
      productNameAr: product.nameAr,
      productNameEn: product.nameEn,
      quantity: defaultOffer.qty,
      offerPriceSar: defaultOffer.priceSar,
      unitAnchorPriceSar: 199,
      image: "",
      addedFrom: "product_page",
    });
    fireAddToCart(eventId, {
      id: "",
      productSlug: product.slug,
      productNameAr: product.nameAr,
      productNameEn: product.nameEn,
      quantity: defaultOffer.qty,
      offerPriceSar: defaultOffer.priceSar,
      unitAnchorPriceSar: 199,
      image: "",
      addedFrom: "product_page",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-beige px-4 py-3 shadow-large safe-area-pb">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-navy font-bold text-sm truncate">{product.nameAr}</p>
          <p className="text-muted text-xs">{defaultOffer.label} — {formatPrice(defaultOffer.priceSar)}</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex-shrink-0 bg-navy text-gold font-bold px-5 py-3 rounded-2xl hover:bg-navy/90 active:scale-95 transition-all text-sm shadow-medium"
        >
          {added ? "✓ أضيفت للسلة" : "اطلبي الآن"}
        </button>
      </div>
    </div>
  );
}
