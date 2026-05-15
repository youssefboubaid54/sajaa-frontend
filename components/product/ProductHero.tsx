"use client";

import { useState } from "react";
import type { Product, OfferQty } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import { fireAddToCart } from "@/lib/pixels";
import { generateEventId } from "@/lib/event-id";
import OfferSelector from "@/components/product/OfferSelector";
import ProductImageGallery from "@/components/product/ProductImageGallery";
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
  { icon: "🔒", text: "شراء آمن ومضمون" },
  { icon: "💬", text: "دعم عبر واتساب" },
];

export default function ProductHero({ product }: ProductHeroProps) {
  const defaultOffer = product.offers.find((o) => o.isDefault) ?? product.offers[0];
  const [selectedQty, setSelectedQty] = useState<OfferQty>(
    (defaultOffer?.qty ?? 2) as OfferQty
  );
  const [loading, setLoading] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

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
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  return (
    <section className="bg-ivory py-6 sm:py-10 lg:py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-start">

          {/* ── Gallery — visually left (RTL: end side) ── */}
          <div className="lg:order-2 relative w-full max-w-md lg:max-w-none mx-auto">
            <ProductImageGallery
              productSlug={product.slug}
              productNameAr={product.nameAr}
              bgColor={product.bgColor}
              accentColor={product.accentColor}
              isHalal={product.isHalal}
            />
          </div>

          {/* ── Content — right in RTL ── */}
          <div className="lg:order-1 flex w-full min-w-0 flex-col gap-4 sm:gap-5">

            {/* Category tag + stock */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-white border border-beige px-3 py-1 text-xs font-semibold text-gold-dark shadow-soft">
                {product.taglineAr}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                متوفر — توصيل خلال ٢–٤ أيام
              </span>
            </div>

            {/* Names */}
            <div>
              <h1 className="font-bold text-navy text-4xl sm:text-5xl leading-tight mb-1">
                {product.nameAr}
              </h1>
              <p className="text-muted text-sm font-latin break-words" dir="ltr">
                {product.nameEn}
              </p>
            </div>

            {/* Rating strip */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-navy/60">٥.٠</span>
              <span className="text-xs text-muted">•</span>
              <span className="text-xs text-navy/60">+١٠,٠٠٠ عميلة سعيدة</span>
              {product.isHalal && (
                <>
                  <span className="text-xs text-muted">•</span>
                  <Badge variant="green">حلال</Badge>
                </>
              )}
            </div>

            {/* Pain headline */}
            <div className="bg-white border border-beige rounded-3xl p-4 sm:p-5 overflow-hidden shadow-soft">
              <p className="text-navy font-semibold leading-snug break-words text-base sm:text-lg">
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

            {/* Price summary */}
            {selectedOffer && (
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-1">
                <span className="text-3xl font-bold text-navy">
                  {selectedOffer.priceSar} ريال
                </span>
                {selectedOffer.anchor && (
                  <span className="text-sm text-muted line-through">
                    {selectedOffer.anchor}
                  </span>
                )}
                {selectedOffer.qty > 1 && (
                  <span className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                    وفّري {(selectedOffer.qty * 199) - selectedOffer.priceSar} ريال
                  </span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onClick={handleAddToCart}
                className={addedFeedback ? "bg-success border-success" : ""}
              >
                {addedFeedback ? "✓ تمت الإضافة للسلة" : "اطلبي الآن — الدفع عند الاستلام"}
              </Button>

              <p className="text-center text-xs text-muted">
                🔒 دفع آمن • ↩️ إرجاع مجاني خلال ٣٠ يوماً • 🚚 توصيل سريع داخل السعودية
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2">
              {TRUST_BADGES.map((b, i) => (
                <div
                  key={i}
                  className="flex min-w-0 items-center gap-2 text-xs text-navy/70 bg-white border border-beige rounded-2xl px-3 py-2.5 shadow-soft"
                >
                  <span className="shrink-0 text-base">{b.icon}</span>
                  <span className="min-w-0 break-words font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
