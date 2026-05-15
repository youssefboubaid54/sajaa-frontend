"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { ProductSlug } from "@/data/products";
import Badge from "@/components/ui/Badge";

interface GallerySlide {
  label: string;
  icon: string;
  desc: string;
}

const SLIDE_CONFIGS: GallerySlide[] = [
  { label: "المنتج", icon: "📦", desc: "صورة المنتج" },
  { label: "الاستخدام", icon: "✨", desc: "طريقة الاستخدام" },
  { label: "المكونات", icon: "🔬", desc: "المكونات الطبيعية" },
  { label: "التغليف", icon: "🎁", desc: "التغليف الفاخر" },
];

const SLUG_THEME: Record<
  ProductSlug,
  { bg: string; accent: string; icon: string; slideIcons: string[] }
> = {
  hams: {
    bg: "#F5EFE6",
    accent: "#D4B896",
    icon: "🌿",
    slideIcons: ["🌿", "🌙", "🌸", "🎀"],
  },
  hidn: {
    bg: "#EEF0F5",
    accent: "#8B9DC3",
    icon: "🌙",
    slideIcons: ["🌙", "❄️", "💜", "🎁"],
  },
  subaat: {
    bg: "#F0EDF8",
    accent: "#9B89C4",
    icon: "✨",
    slideIcons: ["✨", "🍬", "💊", "🔬"],
  },
};

interface ProductImageGalleryProps {
  productSlug: ProductSlug;
  productNameAr: string;
  bgColor?: string;
  accentColor?: string;
  isHalal?: boolean;
}

export default function ProductImageGallery({
  productSlug,
  productNameAr,
  bgColor,
  accentColor,
  isHalal,
}: ProductImageGalleryProps) {
  const theme = SLUG_THEME[productSlug];
  const bg = bgColor ?? theme.bg;
  const accent = accentColor ?? theme.accent;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full select-none">
      {/* Halal badge */}
      {isHalal && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="green">شهادة الحلال</Badge>
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-black/30 text-white text-xs px-2 py-1 rounded-full font-latin backdrop-blur-sm">
          {selectedIndex + 1}/{SLIDE_CONFIGS.length}
        </span>
      </div>

      {/* Main carousel */}
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {SLIDE_CONFIGS.map((slide, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full relative aspect-square"
              style={{ backgroundColor: bg }}
            >
              {/* Background decoration */}
              <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20"
                style={{ backgroundColor: accent }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15"
                style={{ backgroundColor: accent }}
              />
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-soft"
                  style={{ backgroundColor: `${accent}30` }}
                >
                  <span>{theme.slideIcons[idx]}</span>
                </div>
                <div>
                  <p className="font-bold text-navy text-xl mb-1">{productNameAr}</p>
                  <p className="text-sm font-medium" style={{ color: accent }}>
                    {slide.label}
                  </p>
                  <p className="text-xs text-muted mt-1">{slide.desc} — صورة قريباً</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav arrows — desktop only */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        aria-label="الصورة السابقة"
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-medium items-center justify-center hover:bg-white transition-colors disabled:opacity-30"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        aria-label="الصورة التالية"
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-medium items-center justify-center hover:bg-white transition-colors disabled:opacity-30"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {SLIDE_CONFIGS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            aria-label={`انتقلي للصورة ${idx + 1}`}
            className={[
              "rounded-full transition-all duration-200",
              selectedIndex === idx
                ? "w-5 h-2"
                : "w-2 h-2 opacity-40",
            ].join(" ")}
            style={{
              backgroundColor: selectedIndex === idx ? accent : "#1B2A4A",
            }}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
        {SLIDE_CONFIGS.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            aria-label={slide.label}
            className={[
              "flex-shrink-0 w-16 h-16 rounded-xl border-2 transition-all duration-150 overflow-hidden flex items-center justify-center text-xl",
              selectedIndex === idx
                ? "border-gold shadow-gold"
                : "border-beige opacity-60 hover:opacity-80",
            ].join(" ")}
            style={{ backgroundColor: bg }}
          >
            {theme.slideIcons[idx]}
          </button>
        ))}
      </div>
    </div>
  );
}
