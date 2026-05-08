import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
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
    title: `${product.nameAr} | سَجَى`,
    description: product.heroSubAr,
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-ivory" dir="rtl">
      {/* Scarcity Bar */}
      <ScarcityBar />

      {/* 1. Hero with offer selector */}
      <ProductHero product={product} />

      {/* 2. Star rating slot */}
      <section className="py-6 px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <StarRating rating={5} showCount={false} />
          <span className="text-navy/70 text-sm font-medium">أكثر من 10,000 امرأة سعودية يثقن بسَجَى</span>
        </div>
      </section>

      {/* 3. Pain story (Alternating Section 1) */}
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

      {/* 4. Before/After Transformation (Alternating Section 2) */}
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

      {/* 5. Ingredients */}
      <IngredientCards ingredients={product.ingredients} />

      {/* 6. How to use (Alternating Section 3) */}
      <AlternatingSection
        title="كيفية الاستخدام"
        description={product.howToUse.map((step, idx) => `${idx + 1}. ${step}`).join("\n\n")}
        imageOnLeft={false}
        productSlug={product.slug}
        productNameAr={product.nameAr}
        bgColor={product.bgColor}
        accentColor={product.accentColor}
        icon="📖"
      />

      {/* 7. Proof/certification */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <ProductProof product={product} />
      </section>

      {/* 8. Comparison table */}
      <section className="py-16 px-4 max-w-4xl mx-auto bg-white rounded-3xl shadow-soft my-8">
        <h2 className="text-3xl font-bold text-navy text-center mb-10">لماذا سَجَى؟</h2>
        <ComparisonTable points={product.comparisonPoints} />
      </section>

      {/* 9. Social proof (reviews) */}
      <SocialProofSection />

      {/* 10. FAQ */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-navy text-center mb-10">الأسئلة الشائعة</h2>
        <ProductFAQ faqItems={product.faq} />
      </section>

      {/* Sticky mobile CTA */}
      <StickyMobileCTA product={product} />
    </div>
  );
}
