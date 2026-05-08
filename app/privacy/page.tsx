export const metadata = { title: "سياسة الخصوصية | سَجَى" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-navy mb-8">سياسة الخصوصية</h1>
        <div className="prose prose-arabic max-w-none text-navy/80 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">البيانات التي نجمعها</h2>
            <p>نجمع الاسم ورقم الجوال فقط لأغراض تأكيد الطلب وتنسيق التوصيل.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">استخدام البيانات</h2>
            <p>بياناتك تُستخدم حصراً لتأكيد طلبك والتواصل معك لأغراض التوصيل. لا نبيع بياناتك لأطراف ثالثة.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">ملفات تعريف الارتباط</h2>
            <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الموقع عبر أدوات التحليل. يمكنك إيقاف هذه الملفات من إعدادات متصفحك.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">حذف البيانات</h2>
            <p>يمكنك التواصل معنا لطلب حذف بياناتك في أي وقت.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-navy mb-3">التواصل</h2>
            <p>للاستفسارات المتعلقة بالخصوصية: support@sajaa.health</p>
          </section>
        </div>
      </div>
    </div>
  );
}
