import type { Ingredient } from "@/data/products";

interface IngredientCardsProps {
  ingredients: Ingredient[];
}

export default function IngredientCards({ ingredients }: IngredientCardsProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block bg-gold/20 text-gold-dark text-xs font-semibold px-3 py-1 rounded-full mb-3">
            الشفافية الكاملة
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-navy mb-3">
            مكونات مدعومة بالعلم
          </h2>
          <p className="text-navy/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            كل مكوّن تم اختياره بناءً على دراسات علمية لدعم الاسترخاء والهدوء قبل النوم.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ingredients.map((ing, i) => (
            <div
              key={i}
              className="group flex flex-col p-5 bg-ivory rounded-3xl border border-beige hover:shadow-medium hover:border-gold/40 transition-all duration-200 relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-bl-full -z-10 group-hover:bg-gold/10 transition-colors" />

              {/* Icon + name */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl shrink-0 mt-0.5">{ing.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-bold text-navy text-base leading-tight">{ing.nameAr}</h3>
                  <p className="text-xs text-muted font-latin mt-0.5 break-words" dir="ltr">{ing.nameEn}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-navy/70 leading-relaxed flex-1 mb-4">
                {ing.descAr}
              </p>

              {/* Study note */}
              <div className="border-t border-beige/70 pt-4">
                <div className="flex items-start gap-2">
                  <span className="text-gold text-base mt-0.5 shrink-0">🔬</span>
                  <p className="text-xs text-navy/50 leading-relaxed">
                    <span className="font-semibold text-navy/60 block mb-1">الأثر العلمي:</span>
                    يساهم في تحسين جودة الاسترخاء وتقليل التوتر قبل النوم.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-navy/40 mt-8 sm:mt-10">
          بدون ادعاءات طبية. هذا المنتج ليس دواءً ولا يغني عن الاستشارة الطبية.
        </p>
      </div>
    </section>
  );
}
