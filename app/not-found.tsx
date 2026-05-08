import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center" dir="rtl">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🌙</div>
        <h1 className="text-4xl font-bold text-navy mb-4">الصفحة غير موجودة</h1>
        <p className="text-muted mb-8">يبدو أن هذه الصفحة تحولت إلى نوم عميق.</p>
        <Link
          href="/"
          className="inline-block bg-navy text-gold font-bold px-8 py-3 rounded-2xl hover:bg-navy/90 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
