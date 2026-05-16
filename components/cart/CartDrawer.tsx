"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { getCartSubtotal, getCartSavings, formatPrice } from "@/lib/pricing";
import { isApiConfigured } from "@/lib/api";
import { PRODUCTS } from "@/data/products";
import { COPY } from "@/data/copy";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, addItem } = useCartStore();
  const { setStep } = useCheckoutStore();
  const subtotal = getCartSubtotal(items);
  const savings = getCartSavings(items);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("drawer-open");
    } else {
      document.body.classList.remove("drawer-open");
    }
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  const missingProducts = PRODUCTS.filter(
    (p) => !items.some((i) => i.productSlug === p.slug)
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 shadow-large flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-beige">
          <h2 className="text-lg font-bold text-navy">{COPY.cart.title}</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-beige transition-colors text-ink"
            aria-label="إغلاق السلة"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="text-5xl">🛒</div>
              <p className="text-navy font-semibold">{COPY.cart.empty}</p>
              <p className="text-muted text-sm">{COPY.cart.emptyDesc}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-soft"
                >
                  <div className="w-14 h-14 rounded-xl bg-beige flex items-center justify-center text-2xl flex-shrink-0">
                    {item.productSlug === "hams" ? "🌿" : item.productSlug === "hidn" ? "😴" : "✨"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm">{item.productNameAr}</p>
                    <p className="text-xs text-muted">{item.quantity} قطعة</p>
                    <p className="text-gold-dark font-bold text-sm mt-1">
                      {formatPrice(item.offerPriceSar)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-full hover:bg-beige transition-colors text-muted hover:text-error"
                    aria-label="إزالة"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6" />
                      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Cross-sell */}
              {missingProducts.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-navy mb-2">{COPY.cart.crossSellTitle}</p>
                  {missingProducts.map((product) => (
                    <button
                      key={product.slug}
                      onClick={() =>
                        addItem({
                          productSlug: product.slug,
                          productNameAr: product.nameAr,
                          productNameEn: product.nameEn,
                          quantity: 1,
                          offerPriceSar: 199,
                          unitAnchorPriceSar: 199,
                          image: "",
                          addedFrom: "cart_cross_sell",
                        })
                      }
                      className="w-full flex items-center gap-3 bg-white border border-beige rounded-2xl p-3 hover:border-gold transition-colors text-right mb-2"
                    >
                      <div className="w-10 h-10 rounded-xl bg-beige flex items-center justify-center text-xl flex-shrink-0">
                        {product.slug === "hams" ? "🌿" : product.slug === "hidn" ? "😴" : "✨"}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-navy">{product.nameAr}</p>
                        <p className="text-xs text-muted">{product.taglineAr}</p>
                      </div>
                      <span className="text-xs text-gold-dark font-bold">199 ر</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-beige space-y-3">
            {savings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted">{COPY.cart.cod}</span>
                <span className="text-success font-medium">
                  وفّرتِ {formatPrice(savings)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-navy font-bold">المجموع</span>
              <span className="text-navy font-bold text-lg">{formatPrice(subtotal)}</span>
            </div>
            {!isApiConfigured() && (
              <p className="text-amber-600 text-xs text-center">
                خدمة الطلبات غير متاحة حالياً. حاولي لاحقاً.
              </p>
            )}
            <button
              onClick={() => {
                closeCart();
                setStep("checkout");
              }}
              disabled={!isApiConfigured()}
              className="w-full bg-navy text-gold py-4 rounded-2xl font-bold text-base hover:bg-navy-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {COPY.cart.cta}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
