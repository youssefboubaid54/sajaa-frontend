export default function TrustBadgesSection() {
  return (
    <section className="bg-navy py-16 lg:py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            علامة سعودية تثقين بها
          </h2>
          <p className="text-white/70 text-lg">
            صُنعنا سَجَى خصيصاً للمرأة السعودية، مع الالتزام بأعلى معايير الجودة والأمان.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-4">
              🇸🇦
            </div>
            <h4 className="font-semibold text-lg mb-2">صُنع للمرأة السعودية</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              نفهم تفاصيل يومك، ضغوطاتك، واحتياجك للهدوء. سَجَى صُممت لتكون جزءاً من روتينك الليلي.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-4">
              ✅
            </div>
            <h4 className="font-semibold text-lg mb-2">مكونات حلال</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              جميع منتجاتنا القابلة للاستهلاك (مثل سُبَات) مصممة لتكون حلالاً بمكونات شفافة وواضحة.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-3xl border border-white/10">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-4">
              🛡️
            </div>
            <h4 className="font-semibold text-lg mb-2">معايير الجودة</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              نلتزم بأعلى معايير الجودة في اختيار المكونات وتصنيع المنتجات لضمان تجربة آمنة وفعالة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
