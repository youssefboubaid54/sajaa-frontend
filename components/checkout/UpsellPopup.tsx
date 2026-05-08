"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { getCartSubtotal, formatPrice } from "@/lib/pricing";
import { finalizeOrder } from "@/lib/api";
import { generateEventId } from "@/lib/event-id";
import { firePurchase } from "@/lib/pixels";
import { PRODUCTS } from "@/data/products";
import { COPY } from "@/data/copy";

const UPSELL_PRICE = 99;
const UPSELL_TIMER = 180; // seconds

export default function UpsellPopup() {
  const router = useRouter();
  const {
    step,
    setStep,
    orderIntentId,
    customerName,
    phoneRaw,
    phoneE164,
    phoneDigits,
    upsellProduct: upsellSlug,
    webEventIds,
    attribution,
    acceptUpsell,
    skipUpsell,
    setLastOrderId,
  } = useCheckoutStore();
  const { items, clearCart } = useCartStore();
  const [timeLeft, setTimeLeft] = useState(UPSELL_TIMER);
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = step === "upsell";
  const subtotal = getCartSubtotal(items);
  const upsellProductData = upsellSlug
    ? PRODUCTS.find((p) => p.slug === upsellSlug)
    : null;

  // Timer countdown
  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(UPSELL_TIMER);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) document.body.classList.add("drawer-open");
    else document.body.classList.remove("drawer-open");
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  async function finalize(accepted: boolean) {
    setIsLoading(true);

    if (accepted) acceptUpsell();
    else skipUpsell();

    const purchaseEventId = generateEventId("Purchase");
    const upsellTotal = accepted ? UPSELL_PRICE : 0;
    const total = subtotal + upsellTotal;

    firePurchase(purchaseEventId, orderIntentId ?? "", total, items);

    try {
      const result = await finalizeOrder({
        order_intent_id: orderIntentId ?? "",
        customer: {
          name: customerName,
          phone_raw: phoneRaw,
          phone_e164: phoneE164 ?? "",
          phone_digits: phoneDigits ?? "",
        },
        cart: items.map((i) => ({
          product_slug: i.productSlug,
          quantity: i.quantity,
          offer_price_sar: i.offerPriceSar,
        })),
        upsell: {
          accepted,
          product_slug: accepted ? upsellSlug : undefined,
          price_sar: accepted ? UPSELL_PRICE : undefined,
        },
        pricing: {
          subtotal_sar: subtotal,
          upsell_sar: upsellTotal,
          total_sar: total,
        },
        events: {
          purchase_event_id: purchaseEventId,
          initiate_checkout_event_id: webEventIds["initiate_checkout"] ?? "",
        },
        attribution,
        cookies: {},
        page: {
          event_source_url: typeof window !== "undefined" ? window.location.href : "",
          landing_url: attribution["landing_url"] ?? "",
        },
      });

      setLastOrderId(result.order_id);
      clearCart();
      setStep("done");
      router.push(`/thank-you/${result.order_id}`);
    } catch {
      // Fallback navigation
      clearCart();
      setStep("done");
      router.push("/thank-you/order");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-ivory rounded-3xl shadow-large p-6 animate-slide-up" dir="rtl">
        {/* Timer badge */}
        <div className="text-center mb-4">
          <span className="inline-block bg-navy text-gold text-xs font-bold px-3 py-1 rounded-full">
            {COPY.upsell.timerLabel}: {formatTime(timeLeft)}
          </span>
        </div>

        <div className="text-center mb-5">
          <h2 className="text-xl font-bold text-navy">{COPY.upsell.title}</h2>
          <p className="text-gold-dark font-semibold mt-1">{COPY.upsell.subtitle}</p>
        </div>

        {upsellProductData && (
          <div className="bg-white border border-beige rounded-2xl p-4 mb-5 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-beige flex items-center justify-center text-3xl flex-shrink-0">
              {upsellProductData.slug === "hams" ? "🌿" : upsellProductData.slug === "hidn" ? "😴" : "✨"}
            </div>
            <div className="flex-1">
              <p className="font-bold text-navy">{upsellProductData.nameAr}</p>
              <p className="text-sm text-muted">{upsellProductData.taglineAr}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gold-dark font-bold">{formatPrice(UPSELL_PRICE)}</span>
                <span className="text-muted text-xs line-through">{formatPrice(199)}</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted mb-4">{COPY.upsell.desc}</p>

        <div className="space-y-3">
          <button
            onClick={() => finalize(true)}
            disabled={isLoading || timeLeft === 0}
            className="w-full bg-navy text-gold py-4 rounded-2xl font-bold hover:bg-navy-light transition-colors disabled:opacity-60"
          >
            {isLoading ? "جارٍ التأكيد..." : COPY.upsell.accept}
          </button>
          <button
            onClick={() => finalize(false)}
            disabled={isLoading}
            className="w-full text-muted text-sm py-3 hover:text-ink transition-colors"
          >
            {COPY.upsell.skip}
          </button>
        </div>
      </div>
    </div>
  );
}
