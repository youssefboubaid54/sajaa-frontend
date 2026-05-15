import { notFound } from "next/navigation";
import { PRODUCTS, getOtherProducts } from "@/data/products";
import type { ProductSlug } from "@/data/products";
import ProductHero from "@/components/product/ProductHero";
import IngredientCards from "@/components/product/IngredientCards";
import ProductProof from "@/components/product/ProductProof";
import ComparisonTable from "@/components/product/ComparisonTable";
import ProductFAQ from "@/components/product/ProductFAQ";
import StickyMobileCTA from "@/components/product/StickyMobileCTA";
import StarRating from "@/components/ui/StarRating";
import SocialProofSection from "@/components/sections/SocialProofSection";
import AlternatingSection from "@/components/product/AlternatingSection";
import ScarcityBar from "@/components/product/ScarcityBar";
import HowToUse from "@/components/product/HowToUse";
import RelatedProducts from "@/components/product/RelatedProducts";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return [{ slug: "hams" }, { slug: "hidn" }, { slug: "subaat" }];
}

export async function generateMetadata({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};
  return {
    title: `${product.nameAr} — ${product.taglineAr} | سَجَى`,
    description: product.heroSubAr,
    openGraph: {
      title: `${product.nameAr} | سَجَى`,
      description: product.heroSubAr,
      locale: "ar_SA",
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const relatedProducts = getOtherProducts(product.slug as ProductSlug);

  return (
    <div className="min-h-screen bg-ivory pb-24 md:pb-0" dir="rtl">

      {/* ── Scarcity bar ── */}
      <ScarcityBar />

      {/* ── 1. Hero with gallery + offer selector ── */}
      <ProductHero product={product} />

      {/* ── 2. Social trust strip ── */}
      <section className="px-4 sm:px-6 pb-8 lg:pb-12 max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-beige bg-white px-5 py-4 shadow-soft">
          <StarRating rating={5} showCount={false} />
          <span className="text-navy/70 text-sm font-medium text-center">
            أكثر من ١٠,٠٠٠ امرأة سعودية تثق بسَجَى
          </span>
          <span className="hidden sm:block text-muted">•</span>
          <span className="text-xs text-muted hidden sm:block">تقييم ٥/٥ ⭐</span>
        </div>
      </section>

      {/* ── 3. Pain story ── */}
      <AlternatingSection
        title="لأننا نفهم معاناتكِ مع الأرق"
        description={product.painAr}
        imageOnLeft={false}
        productSlug={product.slug}
        productNameAr={product.nameAr}
        bgColor={product.bgColor}
        accentColor={product.accentColor}
        icon="🌙"
      />

      {/* ── 4. Before / After transformation ── */}
      <AlternatingSection
        title="من التعب والإرهاق إلى الهدوء والراحة"
        description="تخيلي أن تدخلي غرفتكِ وتشعرين فوراً بأن يومكِ الطويل قد انتهى. لا مزيد من التفكير المستمر، لا مزيد من التقلب في السرير. فقط هدوء، استرخاء، ونوم عميق يجدد طاقتكِ ليوم جديد. هذا هو الوعد الذي نقدمه لكِ مع طقوس سَجَى."
        imageOnLeft={true}
        productSlug={product.slug}
        productNameAr={product.nameAr}
        bgColor={product.bgColor}
        accentColor={product.accentColor}
        icon="✨"
      />

      {/* ── 5. Ingredients ── */}
      <IngredientCards ingredients={product.ingredients} />

      {/* ── 6. How to use ── */}
      <section className="py-16 lg:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-gold/20 text-gold-dark text-xs font-semibold px-3 py-1 rounded-full mb-3">
              سهلة الاستخدام
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-navy leading-tight">
              كيفية الاستخدام
            </h2>
            <p className="text-navy/60 text-sm sm:text-base mt-2 max-w-md mx-auto">
              ثلاث خطوات بسيطة لطقس نوم مثالي كل ليلة
            </p>
          </div>
          <HowToUse steps={product.howToUse} />
        </div>
      </section>

      {/* ── 7. Proof / certification ── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <ProductProof product={product} />
      </section>

      {/* ── 8. Comparison table ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-soft border border-beige p-6 sm:p-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-navy/5 text-navy text-xs font-semibold px-3 py-1 rounded-full mb-3">
              مقارنة شاملة
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">لماذا سَجَى؟</h2>
          </div>
          <ComparisonTable points={product.comparisonPoints} />
        </div>
      </section>

      {/* ── 9. Social proof (reviews carousel) ── */}
      <SocialProofSection />

      {/* ── 10. FAQ ── */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-gold/20 text-gold-dark text-xs font-semibold px-3 py-1 rounded-full mb-3">
            الأسئلة المتكررة
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">
            الأسئلة الشائعة
          </h2>
        </div>
        <ProductFAQ faqItems={product.faq} />
      </section>

      {/* ── 11. Related products ── */}
      <RelatedProducts products={relatedProducts} />

      {/* ── Sticky mobile CTA ── */}
      <StickyMobileCTA product={product} />
    </div>
  );
}
