import Link from "next/link";
import type { Product } from "@/data/products";
import Badge from "@/components/ui/Badge";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Button from "@/components/ui/Button";

interface ProductCardsSectionProps {
  products: Product[];
}

export default function ProductCardsSection({ products }: ProductCardsSectionProps) {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            اختاري منتجك
          </h2>
          <p className="text-navy/60 text-lg">
            كل منتج صُمّم لمشكلة نوم مختلفة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => {
            const defaultOffer =
              product.offers.find((o) => o.isDefault) ?? product.offers[0];

            return (
              <div
                key={product.slug}
                className="group flex min-w-0 flex-col rounded-3xl border border-beige bg-ivory overflow-hidden hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative">
                  <PlaceholderImage
                    productSlug={product.slug}
                    productNameAr={product.nameAr}
                    aspectRatio="landscape"
                    bgColor={product.bgColor}
                    accentColor={product.accentColor}
                    className="rounded-none"
                  />
                  {defaultOffer.badge && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="gold">{defaultOffer.badge}</Badge>
                    </div>
                  )}
                  {product.isHalal && (
                    <div className="absolute top-3 left-3">
                      <Badge variant="green">حلال</Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                  {/* Name */}
                  <div className="min-w-0">
                    <h3 className="font-bold text-navy text-xl break-words">{product.nameAr}</h3>
                    <p className="text-muted text-xs font-latin mt-0.5 break-words" dir="ltr">
                      {product.nameEn}
                    </p>
                  </div>

                  {/* Pain */}
                  <p className="text-sm text-navy/70 leading-relaxed break-words">{product.painAr}</p>

                  {/* Offer info */}
                  <div className="bg-white rounded-xl p-4 border border-beige">
                    <p className="text-xs text-muted mb-1 break-words">{defaultOffer.label}</p>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="font-bold text-navy text-lg">
                        {defaultOffer.priceSar} ريال
                      </span>
                      {defaultOffer.anchor && (
                        <span className="text-xs text-muted line-through">
                          {defaultOffer.anchor}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <Link href={`/products/${product.slug}`}>
                      <Button variant="primary" size="md" fullWidth>
                        اكتشفي {product.nameAr}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
