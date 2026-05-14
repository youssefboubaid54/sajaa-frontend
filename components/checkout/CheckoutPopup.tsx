"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { validateSaudiPhone } from "@/lib/phone";
import { getCartSubtotal, formatPrice } from "@/lib/pricing";
import {
  buildOrderCartPayload,
  createOrderIntent,
  getBrowserClient,
  getTrackingCookies,
} from "@/lib/api";
import { getStoredAttribution } from "@/lib/attribution";
import { generateEventId } from "@/lib/event-id";
import { fireInitiateCheckout } from "@/lib/pixels";
import { COPY } from "@/data/copy";

const schema = z.object({
  name: z.string().min(2, COPY.checkout.nameError),
  phone: z.string().refine(
    (v) => validateSaudiPhone(v).isValid,
    COPY.checkout.phoneError
  ),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPopup() {
  const { step, setStep, setCustomer, setOrderIntentId, setUpsellProduct, setEventId, setAttribution } =
    useCheckoutStore();
  const { items } = useCartStore();
  const subtotal = getCartSubtotal(items);
  const isOpen = step === "checkout";
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.classList.add("drawer-open");
    else document.body.classList.remove("drawer-open");
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  if (!isOpen) return null;

  async function onSubmit(data: FormValues) {
    setApiError(null);
    const phone = validateSaudiPhone(data.phone);
    if (!phone.isValid || !phone.e164 || !phone.digits) return;

    setCustomer(data.name, data.phone, phone.e164, phone.digits);

    const eventId = generateEventId("InitiateCheckout");
    setEventId("initiate_checkout", eventId);
    fireInitiateCheckout(eventId, items, subtotal);

    const attribution = getStoredAttribution() as Record<string, string>;
    setAttribution(attribution);

    try {
      const intent = await createOrderIntent({
        customer_name: data.name,
        phone: phone.e164,
        cart: buildOrderCartPayload(items),
        attribution,
        client: getBrowserClient(attribution),
        cookies: getTrackingCookies(),
      });

      setOrderIntentId(intent.order_intent_id);
      if (intent.upsell?.product_slug) {
        setUpsellProduct(intent.upsell.product_slug);
      }
      setStep("upsell");
      reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      setApiError(message || "تعذر إنشاء الطلب. حاولي مرة أخرى.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setStep("idle")}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-ivory rounded-3xl shadow-large p-6 animate-slide-up" dir="rtl">
        {/* Close */}
        <button
          onClick={() => setStep("idle")}
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-beige transition-colors text-muted"
          aria-label="إغلاق"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-navy">{COPY.checkout.title}</h2>
          <p className="text-gold-dark text-sm font-medium mt-1">{COPY.checkout.subtitle}</p>
          <p className="text-muted text-sm mt-2">{COPY.checkout.desc}</p>
        </div>

        {/* Cart summary */}
        {items.length > 0 && (
          <div className="bg-beige/50 rounded-2xl p-4 mb-4 space-y-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-navy font-medium">{item.productNameAr} × {item.quantity}</span>
                <span className="text-muted">{formatPrice(item.offerPriceSar)}</span>
              </div>
            ))}
            <div className="border-t border-beige pt-2 mt-2 flex justify-between font-bold">
              <span className="text-navy">المجموع</span>
              <span className="text-navy">{formatPrice(subtotal)}</span>
            </div>
          </div>
        )}

        {apiError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 text-center">
            <p className="text-red-700 text-sm font-medium">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder={COPY.checkout.namePlaceholder}
              className="w-full border border-beige rounded-xl px-4 py-3 bg-white text-ink placeholder-muted focus:outline-none focus:border-gold transition-colors text-right"
              dir="rtl"
            />
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder={COPY.checkout.phonePlaceholder}
              type="tel"
              dir="ltr"
              className="w-full border border-beige rounded-xl px-4 py-3 bg-white text-ink placeholder-muted focus:outline-none focus:border-gold transition-colors text-right"
            />
            {errors.phone && (
              <p className="text-error text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy text-gold py-4 rounded-2xl font-bold text-base hover:bg-navy-light transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "جارٍ التأكيد..." : COPY.checkout.cta}
          </button>
        </form>

        <p className="text-center text-xs text-muted mt-3">{COPY.checkout.privacy}</p>
      </div>
    </div>
  );
}
