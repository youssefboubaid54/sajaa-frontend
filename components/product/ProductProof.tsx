import { Product } from "@/data/products";

interface ProductProofProps {
  product: Product;
}

export default function ProductProof({ product }: ProductProofProps) {
  return (
    <div className="space-y-12">
      {/* SFDA / Halal Authority Section */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
            معايير الجودة والأمان
          </h2>
          <p className="text-navy/60">
            نلتزم بأعلى المعايير لنقدم لكِ منتجات تثقين بها.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SFDA / Quality placeholder */}
          <div className="bg-white rounded-3xl p-6 border border-beige shadow-soft flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-navy/5 flex items-center justify-center text-3xl mb-4">
              🇸🇦
            </div>
            <h3 className="font-bold text-navy text-lg mb-2">مطابق للمواصفات</h3>
            <p className="text-navy/70 text-sm leading-relaxed">
              جميع منتجاتنا مصنعة وفقاً لأعلى معايير الجودة والسلامة المعمول بها في المملكة العربية السعودية.
            </p>
          </div>

          {/* Halal certificate */}
          {product.isHalal ? (
            <div className="bg-white rounded-3xl p-6 border border-success/20 shadow-soft flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-3xl mb-4">
                ✅
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">شهادة الحلال</h3>
              <p className="text-navy/70 text-sm leading-relaxed">
                هذا المنتج حاصل على شهادة الحلال، مما يضمن خلوه من أي مكونات غير مطابقة للشريعة الإسلامية.
              </p>
              <span className="inline-block mt-4 text-xs bg-success/10 text-success px-3 py-1.5 rounded-full font-medium">
                معتمد
              </span>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-beige shadow-soft flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-3xl mb-4">
                🔬
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">مصادر موثوقة</h3>
              <p className="text-navy/70 text-sm leading-relaxed">
                نختار مكوناتنا بعناية فائقة من أفضل المصادر العالمية لضمان الفعالية والأمان.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 30-Day Warranty Section */}
      <section className="bg-navy rounded-3xl p-8 sm:p-10 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150" />
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center text-4xl mb-6">
            🛡️
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ضمان سَجَى الذهبي - 30 يوماً
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            نحن واثقون أن طقوس سَجَى ستحدث فرقاً في لياليكِ. إذا لم تشعري بالهدوء والراحة التي وعدناكِ بها خلال 30 يوماً، يمكنكِ استرجاع المنتج بكل سهولة وبدون أسئلة معقدة.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="text-gold">✓</span> استرجاع سهل
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold">✓</span> دعم فني سريع
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold">✓</span> رضاكِ أولويتنا
            </span>
          </div>
        </div>
      </section>

      <p className="text-center text-muted text-sm">
        بدون ادعاءات طبية. وضوح كامل في المكونات.
      </p>
    </div>
  );
}
