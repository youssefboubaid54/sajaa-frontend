export const metadata = { title: "الشروط والأحكام | سَجَى" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-navy mb-8">الشروط والأحكام</h1>
        <div className="space-y-6 text-navy/80">
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">الدفع عند الاستلام</h2>
            <p>جميع الطلبات تُدفع عند الاستلام. لا يُطلب أي دفع مسبق عند الطلب.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">التوصيل</h2>
            <p>نوصّل داخل المملكة العربية السعودية خلال ٢–٤ أيام عمل. رسوم التوصيل تُحدد عند التأكيد.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">تأكيد الطلب</h2>
            <p>قد يتواصل فريقنا معك لتأكيد الطلب قبل الشحن. يُرجى الرد على مكالمات الفريق.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">الإلغاء</h2>
            <p>يمكن إلغاء الطلب قبل الشحن عبر التواصل معنا على واتساب.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
