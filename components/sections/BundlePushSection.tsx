import Link from "next/link";
import { COPY } from "@/data/copy";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

const BUNDLE_PRODUCTS = [
  { slug: "hams", nameAr: "هَمْس", nameEn: "Hams", bgColor: "#F5EFE6", accentColor: "#D4B896" },
  { slug: "hidn", nameAr: "حِضْن", nameEn: "Hidn", bgColor: "#EEF0F5", accentColor: "#8B9DC3" },
  { slug: "subaat", nameAr: "سُبَات", nameEn: "Subaat", bgColor: "#F0EDF8", accentColor: "#9B89C4" },
];

export default function BundlePushSection() {
  return (
    <section className="bg-navy-gradient py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="gold" className="text-sm px-4 py-1.5">
            {COPY.bundle.badge}
          </Badge>
        </div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gold mb-4">
            {COPY.bundle.headline}
          </h2>
          <p className="text-gold/70 text-lg max-w-xl mx-auto">
            {COPY.bundle.sub}
          </p>
        </div>

        {/* Products row */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10">
          {BUNDLE_PRODUCTS.map((product, i) => (
            <div key={product.slug} className="flex items-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center gap-2">
                <PlaceholderImage
                  productSlug={product.slug}
                  productNameAr={product.nameAr}
                  aspectRatio="square"
                  bgColor={product.bgColor}
                  accentColor={product.accentColor}
                  className="w-20 h-20 sm:w-28 sm:h-28 shadow-medium"
                />
                <span className="text-gold font-semibold text-sm">{product.nameAr}</span>
                <span className="text-gold/60 text-xs">١٩٩ ريال</span>
              </div>
              {i < BUNDLE_PRODUCTS.length - 1 && (
                <span className="text-gold/40 text-2xl font-light">+</span>
              )}
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-white/5 border border-gold/20 rounded-3xl p-6 sm:p-8 text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="text-gold/50 text-lg line-through">
              {COPY.bundle.originalPrice}
            </span>
            <span className="text-3xl sm:text-4xl font-bold text-gold">
              {COPY.bundle.bundlePrice}
            </span>
          </div>
          <p className="text-success text-base font-semibold">
            ✨ {COPY.bundle.saving}
          </p>
          <p className="text-gold/60 text-sm mt-2">
            هَمْس + حِضْن + سُبَات — قطعة واحدة من كل منتج
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/collection">
            <Button variant="secondary" size="xl">
              {COPY.bundle.cta}
            </Button>
          </Link>
        </div>

        {/* Trust note */}
        <p className="text-center text-gold/40 text-xs mt-6">
          الدفع عند الاستلام · توصيل داخل السعودية
        </p>
      </div>
    </section>
  );
}
