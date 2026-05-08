export const metadata = {
  title: "تواصلي معنا | سَجَى",
  description: "تواصلي مع فريق سَجَى",
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=مرحباً، أود الاستفسار عن منتجات سَجَى`;

  return (
    <div className="min-h-screen bg-ivory" dir="rtl">
      <section className="py-20 px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-navy mb-4 text-center">تواصلي معنا</h1>
        <p className="text-muted text-center mb-12">فريقنا متاح للإجابة على استفساراتك</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* WhatsApp CTA */}
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-beige text-center flex flex-col items-center">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-xl font-bold text-navy mb-2">واتساب</h2>
            <p className="text-muted mb-4 flex-1">للاستفسار عن الطلبات والمنتجات</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-[#25D366] text-white font-bold px-4 py-3 rounded-2xl hover:bg-[#25D366]/90 transition-colors"
            >
              تحدثي معنا على واتساب
            </a>
          </div>

          {/* Email CTA */}
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-beige text-center flex flex-col items-center">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="text-xl font-bold text-navy mb-2">البريد الإلكتروني</h2>
            <p className="text-muted mb-4 flex-1">للاستفسارات العامة والدعم الفني</p>
            <a
              href="mailto:support@sajaa.health"
              className="w-full inline-block bg-navy text-white font-bold px-4 py-3 rounded-2xl hover:bg-navy/90 transition-colors"
            >
              راسليني على البريد الإلكتروني
            </a>
          </div>
        </div>

        {/* Support hours */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-beige mb-8">
          <h2 className="text-lg font-bold text-navy mb-3">ساعات الدعم</h2>
          <div className="space-y-2 text-muted">
            <div className="flex justify-between">
              <span>الأحد – الخميس</span>
              <span>٩ ص – ١٠ م</span>
            </div>
            <div className="flex justify-between">
              <span>الجمعة – السبت</span>
              <span>١٢ م – ٨ م</span>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-beige">
          <h2 className="text-lg font-bold text-navy mb-4">تابعينا</h2>
          <div className="flex gap-4 justify-center">
            {[
              { name: "TikTok", icon: "📱", href: "#" },
              { name: "Snapchat", icon: "👻", href: "#" },
              { name: "Instagram", icon: "📸", href: "#" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="flex flex-col items-center gap-1 p-4 bg-ivory rounded-2xl hover:bg-beige transition-colors"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-sm text-navy font-medium">{s.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
