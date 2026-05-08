export const metadata = {
  title: "عن سَجَى | Sajaa Sleep",
  description: "قصة علامة سَجَى السعودية لطقوس النوم",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory" dir="rtl">
      <section className="py-20 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-navy mb-6">عن سَجَى</h1>

        <div className="space-y-8 text-navy/80 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-3">قصة البداية</h2>
            <p>
              سَجَى بدأت من ليلة مألوفة: جسم متعب من يوم طويل، وعقل لا يعرف كيف يفصل نفسه عما حدث.
              لم يكن الحل في قرص نوم أو وصفة طبية، بل في طقس بسيط يُذكّر الجسم أن اليوم انتهى.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-3">مهمتنا</h2>
            <p>
              نصمّم منتجات نوم تُناسب ليلة المرأة السعودية: رائحة هادئة تغيّر إحساس الغرفة،
              ظلام ناعم يحتضن العين، ودعم لطيف للهدوء الداخلي.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-3">قيمنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🔍", title: "الوضوح", desc: "مكونات معلنة، بدون وعود طبية مبالغة" },
                { icon: "🌙", title: "النعومة", desc: "تفاصيل مصممة للإحساس الفاخر" },
                { icon: "✅", title: "الإثبات", desc: "شهادات حقيقية، مصادر موثوقة" },
                { icon: "🔐", title: "الخصوصية", desc: "بياناتك لتأكيد الطلب فقط" },
              ].map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-4 shadow-soft border border-beige">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <h3 className="font-bold text-navy">{v.title}</h3>
                  <p className="text-muted text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy mb-3">فريق سَجَى</h2>
            <div className="bg-beige rounded-3xl p-6 text-center">
              <div className="w-16 h-16 bg-navy rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-gold font-bold text-xl">S</span>
              </div>
              <p className="text-muted">سيتم تحديث معلومات الفريق قريباً.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
