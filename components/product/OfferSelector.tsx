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
    <fieldset className="min-w-0">
      <legend className="text-sm font-semibold text-navy mb-3">
        اختاري الكمية
      </legend>
      <div className="flex min-w-0 flex-col gap-3" role="radiogroup">
        {offers.map((offer) => {
          const isSelected = selectedQty === offer.qty;
          return (
            <label
              key={offer.qty}
              className={[
                "relative flex min-w-0 items-start gap-3 rounded-2xl border-2 p-4 cursor-pointer transition-all duration-150 select-none sm:items-center sm:gap-4 sm:p-5",
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
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={[
                      "font-semibold text-sm break-words",
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
                  <p className="text-xs text-muted mt-0.5 line-through break-words">
                    {offer.anchor}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="shrink-0 text-left">
                <span
                  className={[
                    "font-bold text-base whitespace-nowrap",
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
