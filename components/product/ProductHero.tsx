"use client";

import { useState } from "react";
import type { Product, OfferQty } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { fireAddToCart } from "@/lib/pixels";
import { generateEventId } from "@/lib/event-id";
import OfferSelector from "@/components/product/OfferSelector";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface ProductHeroProps {
  product: Product;
}

const OFFER_PRICE_MAP: Record<1 | 2 | 3, 199 | 279 | 349> = {
  1: 199,
  2: 279,
  3: 349,
};

const TRUST_BADGES = [
  { icon: "💳", text: "الدفع عند الاستلام" },
  { icon: "🚚", text: "توصيل داخل السعودية" },
  { icon: "🔒", text: "شراء آمن" },
  { icon: "💬", text: "دعم عبر واتساب" },
];

export default function ProductHero({ product }: ProductHeroProps) {
  const defaultOffer = product.offers.find((o) => o.isDefault) ?? product.offers[0];
  const [selectedQty, setSelectedQty] = useState<OfferQty>(
    (defaultOffer?.qty ?? 2) as OfferQty
  );
  const [loading, setLoading] = useState(false);

  const { addItem, openCart } = useCartStore();

  const selectedOffer =
    product.offers.find((o) => o.qty === selectedQty) ?? product.offers[0];

  const handleAddToCart = async () => {
    setLoading(true);
    const item = {
      productSlug: product.slug,
      productNameAr: product.nameAr,
      productNameEn: product.nameEn,
      quantity: selectedQty,
      offerPriceSar: OFFER_PRICE_MAP[selectedQty],
      unitAnchorPriceSar: 199 as const,
      image: "",
      addedFrom: "product_page" as const,
    };

    addItem(item);
    openCart();

    const eventId = generateEventId("AddToCart");
    fireAddToCart(eventId, { ...item, id: "" });
    setLoading(false);
  };

  return (
    <section className="bg-ivory py-12 lg:py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start min-w-0">
          {/* Image — visually left (RTL: end side) */}
          <div className="lg:order-2 relative">
            <div className="absolute inset-0 bg-gold/10 rounded-4xl blur-3xl scale-110" />
            <PlaceholderImage
              productSlug={product.slug}
              productNameAr={product.nameAr}
              bgColor={product.bgColor}
              accentColor={product.accentColor}
              aspectRatio="square"
              className="relative shadow-large rounded-4xl"
            />
            {product.isHalal && (
              <div className="absolute top-4 left-4">
                <Badge variant="green">شهادة الحلال</Badge>
              </div>
            )}
          </div>

          {/* Content — right in RTL */}
          <div className="lg:order-1 flex w-full min-w-0 flex-col gap-5 px-1 sm:px-0">
            {/* Names */}
            <div>
              <h1 className="font-bold text-navy text-4xl leading-tight mb-1">
                {product.nameAr}
              </h1>
              <p className="text-muted text-sm font-latin break-words" dir="ltr">
                {product.nameEn}
              </p>
            </div>

            {/* Pain headline */}
            <div className="bg-white border border-beige rounded-2xl p-5 sm:p-6 overflow-hidden">
              <p className="text-navy/80 font-semibold leading-snug break-words">
                {product.heroHeadlineAr}
              </p>
              <p className="text-navy/60 text-sm mt-2 leading-relaxed break-words">
                {product.heroSubAr}
              </p>
            </div>

            {/* Offer selector */}
            <OfferSelector
              offers={product.offers}
              selectedQty={selectedQty}
              onSelect={setSelectedQty}
            />

            {/* Current price summary */}
            {selectedOffer && (
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-1">
                <span className="text-2xl font-bold text-navy">
                  {selectedOffer.priceSar} ريال
                </span>
                {selectedOffer.anchor && (
                  <span className="text-sm text-muted line-through">
                    {selectedOffer.anchor}
                  </span>
                )}
              </div>
            )}

            {/* Add to cart */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              onClick={handleAddToCart}
            >
              اطلبي الآن - الدفع عند الاستلام
            </Button>

            {/* Trust row */}
            <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2">
              {TRUST_BADGES.map((b, i) => (
                <div
                  key={i}
                  className="flex min-w-0 items-center gap-2 text-xs text-navy/70 bg-white border border-beige rounded-xl px-3 py-2"
                >
                  <span className="shrink-0">{b.icon}</span>
                  <span className="min-w-0 break-words">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
