"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { formatPhoneDisplay } from "@/lib/phone";
import Link from "next/link";

export default function ThankYouPage() {
  const params = useParams();
  const rawOrderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId;
  const orderNumber = decodeURIComponent(rawOrderId || "");
  const { clearCart } = useCartStore();
  const { customerName, phoneE164 } = useCheckoutStore();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";

  return (
    <div className="min-h-screen bg-ivory" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 py-20">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-navy mb-2">تم استلام طلبك بنجاح ✨</h1>
          <p className="text-muted">سنتواصل معك لتأكيد الطلب وتنسيق التوصيل</p>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-beige mb-6">
          <h2 className="text-lg font-bold text-navy mb-4">تفاصيل الطلب</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">رقم الطلب</span>
              <span className="font-bold text-navy font-mono text-left" dir="ltr">
                {orderNumber}
              </span>
            </div>
            {customerName && (
              <div className="flex justify-between">
                <span className="text-muted">الاسم</span>
                <span className="font-medium text-navy">{customerName}</span>
              </div>
            )}
            {phoneE164 && (
              <div className="flex justify-between">
                <span className="text-muted">الجوال</span>
                <span className="font-medium text-navy" dir="ltr">{formatPhoneDisplay(phoneE164)}</span>
              </div>
            )}
          </div>
        </div>

        {/* COD reminder */}
        <div className="bg-navy/5 rounded-2xl p-4 border border-navy/10 mb-6">
          <p className="text-navy text-sm text-center font-medium">
            💳 الدفع عند الاستلام. سنستخدم رقمك لتأكيد الطلب وتنسيق التوصيل.
          </p>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-beige mb-6">
          <h2 className="text-lg font-bold text-navy mb-4">كيف تستعدين لأول ليلة مع سَجَى؟</h2>
          <div className="space-y-3 text-sm text-muted">
            <div className="flex gap-3">
              <span>🌙</span>
              <span>رتّبي منطقة النوم قبل ربع ساعة من موعد نومك.</span>
            </div>
            <div className="flex gap-3">
              <span>📵</span>
              <span>ضعي الجوال على الشاحن بعيداً عن السرير.</span>
            </div>
            <div className="flex gap-3">
              <span>🌿</span>
              <span>رشّي هَمْس على المخدة وانتظري دقيقة قبل الاستلقاء.</span>
            </div>
          </div>
        </div>

        {/* WhatsApp support */}
        <div className="text-center mb-6">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، طلبي رقم ${orderNumber}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#25D366] text-white font-bold px-6 py-3 rounded-2xl hover:bg-[#25D366]/90 transition-colors"
          >
            💬 تواصلي معنا على واتساب
          </a>
        </div>

        {/* Order number reminder */}
        <p className="text-center text-muted text-sm">
          احتفظي برقم الطلب:{" "}
          <strong className="text-navy font-mono" dir="ltr">{orderNumber}</strong>
        </p>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-navy/60 hover:text-navy text-sm underline underline-offset-2 transition-colors"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
