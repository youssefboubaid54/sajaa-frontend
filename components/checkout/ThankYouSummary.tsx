import { CartItem } from "@/store/cart-store";
import { formatPrice, getCartSubtotal } from "@/lib/pricing";
import { formatPhoneDisplay } from "@/lib/phone";

interface ThankYouSummaryProps {
  orderId: string;
  customerName: string;
  phoneE164: string;
  items: CartItem[];
  upsellAccepted: boolean;
  upsellProductNameAr?: string;
  totalSar: number;
}

const QTY_LABELS: Record<number, string> = {
  1: "قطعة واحدة",
  2: "قطعتان",
  3: "٣ قطع",
};

export default function ThankYouSummary({
  orderId,
  customerName,
  phoneE164,
  items,
  upsellAccepted,
  upsellProductNameAr,
  totalSar,
}: ThankYouSummaryProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-soft border border-beige space-y-4">
      <h2 className="text-lg font-bold text-navy border-b border-beige pb-3">ملخص الطلب</h2>

      {/* Order meta */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">رقم الطلب</span>
          <span className="font-bold text-navy font-mono">{orderId}</span>
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
            <span className="font-medium text-navy" dir="ltr">
              {formatPhoneDisplay(phoneE164)}
            </span>
          </div>
        )}
      </div>

      {/* Items */}
      {items.length > 0 && (
        <div className="space-y-2 text-sm border-t border-beige pt-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-navy">
                {item.productNameAr} — {QTY_LABELS[item.quantity] ?? `${item.quantity} قطع`}
              </span>
              <span className="font-medium text-navy">{formatPrice(item.offerPriceSar)}</span>
            </div>
          ))}
          {upsellAccepted && upsellProductNameAr && (
            <div className="flex justify-between text-gold-dark">
              <span>{upsellProductNameAr} (إضافة خاصة)</span>
              <span className="font-medium">٩٩ ريال</span>
            </div>
          )}
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between font-bold text-navy text-base border-t border-beige pt-3">
        <span>الإجمالي</span>
        <span>{formatPrice(totalSar)}</span>
      </div>

      {/* COD note */}
      <div className="bg-navy/5 rounded-xl p-3 text-center">
        <p className="text-navy text-xs font-medium">
          💳 الدفع عند الاستلام — لا حاجة لدفع الآن
        </p>
      </div>
    </div>
  );
}
