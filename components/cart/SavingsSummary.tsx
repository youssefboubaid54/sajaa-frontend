import { CartItem } from "@/store/cart-store";
import { getCartSubtotal, getCartSavings, getCartAnchorTotal, formatPrice } from "@/lib/pricing";

interface SavingsSummaryProps {
  items: CartItem[];
}

export default function SavingsSummary({ items }: SavingsSummaryProps) {
  const subtotal = getCartSubtotal(items);
  const savings = getCartSavings(items);

  if (items.length === 0) return null;

  return (
    <div className="space-y-1.5 text-sm">
      {savings > 0 && (
        <div className="flex justify-between text-success">
          <span>وفّرتِ</span>
          <span className="font-semibold">{formatPrice(savings)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-navy text-base">
        <span>المجموع</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <p className="text-xs text-muted text-center pt-1">الدفع عند الاستلام 🔒</p>
    </div>
  );
}
