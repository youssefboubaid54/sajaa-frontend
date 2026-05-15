"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";
import Badge from "@/components/ui/Badge";

const SLUG_ICON: Record<string, string> = {
  hams: "🌿",
  hidn: "🌙",
  subaat: "✨",
};

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { addItem } = useCartStore();

  if (products.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-ivory" aria-label="منتجات أخرى">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="inline-block bg-gold/20 text-gold-dark text-xs font-semibold px-3 py-1 rounded-full mb-3">
            أكملي طقسك
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight">
            منتجات تُكمل تجربتك
          </h2>
          <p className="text-navy/60 text-sm sm:text-base mt-2 max-w-md mx-auto">
            الجمع بين منتجات سَجَى يمنحكِ طقساً متكاملاً للنوم العميق
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {products.map((product) => {
            const defaultOffer =
              product.offers.find((o) => o.isDefault) ?? product.offers[0];

            return (
              <div
                key={product.slug}
                className="group bg-white rounded-3xl border border-beige shadow-soft overflow-hidden hover:shadow-medium transition-shadow duration-300"
                style={{ borderColor: `${product.accentColor}30` }}
              >
                {/* Image area */}
                <div
                  className="relative aspect-[4/3] flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: product.bgColor }}
                >
                  {/* Decorative blobs */}
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
                    style={{ backgroundColor: product.accentColor }}
                  />
                  <div
                    className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15"
                    style={{ backgroundColor: product.accentColor }}
                  />

                  <div className="relative z-10 text-center p-6">
                    <span className="text-6xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                      {SLUG_ICON[product.slug]}
                    </span>
                    <p className="font-bold text-navy text-lg">{product.nameAr}</p>
                  </div>

                  {product.isHalal && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="green">حلال</Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
                      style={{
                        backgroundColor: `${product.accentColor}20`,
                        color: product.color,
                      }}
                    >
                      {product.taglineAr}
                    </span>
                    <p className="text-navy/70 text-sm leading-relaxed line-clamp-2">
                      {product.heroSubAr}
                    </p>
                  </div>

                  {/* Price + actions */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-beige">
                    <div>
                      <p className="font-bold text-navy text-lg">
                        {defaultOffer.priceSar} ريال
                      </p>
                      {defaultOffer.anchor && (
                        <p className="text-xs text-muted line-through">
                          {defaultOffer.anchor}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          addItem({
                            productSlug: product.slug,
                            productNameAr: product.nameAr,
                            productNameEn: product.nameEn,
                            quantity: defaultOffer.qty,
                            offerPriceSar: defaultOffer.priceSar,
                            unitAnchorPriceSar: 199,
                            image: "",
                            addedFrom: "collection",
                          });
                        }}
                        className="shrink-0 bg-navy text-gold text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-navy/90 active:scale-95 transition-all shadow-soft"
                      >
                        أضيفي للسلة
                      </button>
                      <Link
                        href={`/products/${product.slug}`}
                        className="shrink-0 border border-beige text-navy text-xs font-medium px-3 py-2.5 rounded-xl hover:bg-ivory transition-colors"
                      >
                        التفاصيل
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle CTA */}
        <div className="mt-10 bg-navy rounded-3xl p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gold to-transparent" />
          <div className="relative z-10">
            <p className="text-gold font-semibold text-sm mb-2">💎 عرض الطقس الكامل</p>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              اجمعي المنتجات الثلاثة لتجربة نوم مثالية
            </h3>
            <p className="text-white/70 text-sm mb-5 max-w-sm mx-auto">
              هَمْس + حِضْن + سُبَات — ثلاثة منتجات، طقس واحد متكامل لليالٍ أهدأ وأعمق
            </p>
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 bg-gold text-navy font-bold px-6 py-3 rounded-2xl hover:bg-gold-light transition-colors text-sm shadow-gold"
            >
              اكتشفي المجموعة الكاملة
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
