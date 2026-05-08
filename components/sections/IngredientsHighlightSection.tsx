const INGREDIENTS = [
  {
    icon: "🌿",
    nameAr: "لافندر طبيعي",
    descAr: "يُهدّئ الجهاز العصبي ويساعد على الاسترخاء",
  },
  {
    icon: "💊",
    nameAr: "ماغنيسيوم",
    descAr: "يدعم استرخاء العضلات والجهاز العصبي",
  },
  {
    icon: "🔬",
    nameAr: "جلايسين",
    descAr: "حمض أميني يساعد في تنظيم درجة حرارة الجسم",
  },
  {
    icon: "🪡",
    nameAr: "حرير طبيعي",
    descAr: "ناعم على البشرة الحساسة حول العين",
  },
  {
    icon: "❄️",
    nameAr: "جل تبريد",
    descAr: "يخفض الحرارة الموضعية بلطف",
  },
  {
    icon: "✅",
    nameAr: "لا سكر مضاف",
    descAr: "مناسبة لمن تراقب السكر في الروتين اليومي",
  },
];

export default function IngredientsHighlightSection() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            مكونات واضحة، بدون وعود طبية
          </h2>
          <p className="text-navy/60 text-lg">
            كل مكوّن معلن بشفافية كاملة. لا ادعاءات مبالغة، لا مكونات خفية.
          </p>
        </div>

        {/* Ingredient grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {INGREDIENTS.map((ing, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-beige hover:shadow-soft transition-shadow"
            >
              <span className="text-3xl mb-2">{ing.icon}</span>
              <h4 className="font-semibold text-navy text-sm mb-1">{ing.nameAr}</h4>
              <p className="text-xs text-navy/50 leading-relaxed">{ing.descAr}</p>
            </div>
          ))}
        </div>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Halal cert placeholder */}
          <div className="rounded-3xl border-2 border-dashed border-beige p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center text-2xl">
              ✅
            </div>
            <h4 className="font-semibold text-navy">شهادة الحلال — سُبَات</h4>
            <p className="text-sm text-navy/60 leading-relaxed">
              شهادة الحلال ستُعرض عند توفرها. سُبَات مصمم ليكون حلالاً بمكونات شفافة.
            </p>
            <span className="text-xs bg-success/10 text-success px-3 py-1 rounded-full font-medium">
              قريباً
            </span>
          </div>

          {/* Lab / COA placeholder */}
          <div className="rounded-3xl border-2 border-dashed border-beige p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center text-2xl">
              🔬
            </div>
            <h4 className="font-semibold text-navy">تقارير المختبر (COA)</h4>
            <p className="text-sm text-navy/60 leading-relaxed">
              نتائج الاختبارات ستُنشر بالكامل. الشفافية في المكونات هي أساس سَجَى.
            </p>
            <span className="text-xs bg-navy/10 text-navy px-3 py-1 rounded-full font-medium">
              قريباً
            </span>
          </div>

          {/* Sourcing card */}
          <div className="rounded-3xl border border-beige bg-white p-6 flex flex-col gap-3">
            <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center text-2xl">
              🌍
            </div>
            <h4 className="font-semibold text-navy">مصادر المكونات</h4>
            <p className="text-sm text-navy/60 leading-relaxed">
              نختار المكونات بعناية من مصادر موثوقة. كل ما تضعينه على جسمك أو تتناولينه نضعه أمام عينيك.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-navy/40 mt-8 max-w-lg mx-auto">
          بدون ادعاءات طبية. وضوح كامل في المكونات. هذه المنتجات ليست دواءً ولا تُشخّص أي حالة صحية.
        </p>
      </div>
    </section>
  );
}
