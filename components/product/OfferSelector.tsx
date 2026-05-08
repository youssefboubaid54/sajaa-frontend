"use client";

import type { Offer, OfferQty } from "@/data/products";
import Badge from "@/components/ui/Badge";

interface OfferSelectorProps {
  offers: Offer[];
  selectedQty: OfferQty;
  onSelect: (qty: OfferQty) => void;
}

export default function OfferSelector({
  offers,
  selectedQty,
  onSelect,
}: OfferSelectorProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-navy mb-3">
        اختاري الكمية
      </legend>
      <div className="flex flex-col gap-3" role="radiogroup">
        {offers.map((offer) => {
          const isSelected = selectedQty === offer.qty;
          return (
            <label
              key={offer.qty}
              className={[
                "relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-150 select-none",
                isSelected
                  ? "border-gold bg-gold/8 shadow-gold"
                  : "border-beige bg-white hover:border-gold/50",
              ].join(" ")}
            >
              <input
                type="radio"
                name="offer-qty"
                value={offer.qty}
                checked={isSelected}
                onChange={() => onSelect(offer.qty)}
                className="sr-only"
                aria-label={`${offer.label} — ${offer.priceSar} ريال`}
              />

              {/* Custom radio */}
              <div
                className={[
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  isSelected ? "border-gold bg-gold" : "border-beige bg-white",
                ].join(" ")}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-navy" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={[
                      "font-semibold text-sm",
                      isSelected ? "text-navy" : "text-navy/80",
                    ].join(" ")}
                  >
                    {offer.label}
                  </span>
                  {offer.badge && (
                    <Badge variant={offer.qty === 2 ? "gold" : "navy"} className="text-[10px]">
                      {offer.badge}
                    </Badge>
                  )}
                </div>
                {offer.anchor && (
                  <p className="text-xs text-muted mt-0.5 line-through">
                    {offer.anchor}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="text-left shrink-0">
                <span
                  className={[
                    "font-bold text-base",
                    isSelected ? "text-navy" : "text-navy/80",
                  ].join(" ")}
                >
                  {offer.priceSar} ريال
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
