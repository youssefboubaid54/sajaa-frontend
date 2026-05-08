import type { Ingredient } from "@/data/products";

interface IngredientCardsProps {
  ingredients: Ingredient[];
}

export default function IngredientCards({ ingredients }: IngredientCardsProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            مكونات مدعومة بالعلم
          </h2>
          <p className="text-navy/60 text-lg">
            كل مكوّن تم اختياره بناءً على دراسات علمية لدعم الاسترخاء والهدوء.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ing, i) => (
            <div
              key={i}
              className="flex flex-col p-6 bg-ivory rounded-3xl border border-beige hover:shadow-soft transition-shadow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full -z-10" />
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{ing.icon}</span>
                <div>
                  <h3 className="font-bold text-navy text-lg">{ing.nameAr}</h3>
                  <p className="text-xs text-muted font-latin">{ing.nameEn}</p>
                </div>
              </div>
              <p className="text-sm text-navy/70 leading-relaxed mb-4 flex-1">
                {ing.descAr}
              </p>
              <div className="mt-auto pt-4 border-t border-beige/50">
                <div className="flex items-start gap-2">
                  <span className="text-gold text-lg mt-0.5">🔬</span>
                  <p className="text-xs text-navy/50 leading-relaxed">
                    <span className="font-semibold text-navy/70 block mb-1">الدراسة السريرية:</span>
                    تظهر الدراسات أن هذا المكون يساهم بشكل فعال في تحسين جودة الاسترخاء وتقليل التوتر قبل النوم.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-navy/40 mt-10">
          بدون ادعاءات طبية. هذا المنتج ليس دواءً ولا يغني عن الاستشارة الطبية.
        </p>
      </div>
    </section>
  );
}
