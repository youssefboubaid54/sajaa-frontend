export const metadata = { title: "الإرجاع والاستبدال | سَجَى" };

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-ivory" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-navy mb-8">سياسة الإرجاع والاستبدال</h1>
        <div className="space-y-6 text-navy/80">
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-beige">
            <h2 className="text-xl font-bold text-navy mb-3">شروط الإرجاع</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>خلال ٧ أيام من تاريخ الاستلام</li>
              <li>المنتج في حالته الأصلية وتغليفه الأصلي</li>
              <li>الإبلاغ عبر واتساب أو البريد الإلكتروني</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-beige">
            <h2 className="text-xl font-bold text-navy mb-3">حالات الاستبدال</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>منتج تالف عند الاستلام</li>
              <li>منتج مختلف عما طُلب</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-beige">
            <h2 className="text-xl font-bold text-navy mb-3">كيف تتواصلين معنا؟</h2>
            <p>واتساب أو البريد: support@sajaa.health — فريقنا سيرد خلال ٢٤ ساعة عمل.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
