interface PlaceholderImageProps {
  productSlug?: string;
  productNameAr?: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  bgColor?: string;
  accentColor?: string;
}

const slugColors: Record<string, { bg: string; accent: string; icon: string }> = {
  hams: { bg: "#F5EFE6", accent: "#D4B896", icon: "🌿" },
  hidn: { bg: "#EEF0F5", accent: "#8B9DC3", icon: "🌙" },
  subaat: { bg: "#F0EDF8", accent: "#9B89C4", icon: "✨" },
  default: { bg: "#F8F3EA", accent: "#D4B896", icon: "🌸" },
};

const aspectClasses: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export default function PlaceholderImage({
  productSlug,
  productNameAr,
  className = "",
  aspectRatio = "square",
  bgColor,
  accentColor,
}: PlaceholderImageProps) {
  const colors =
    productSlug && slugColors[productSlug]
      ? slugColors[productSlug]
      : slugColors.default;

  const bg = bgColor ?? colors.bg;
  const accent = accentColor ?? colors.accent;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl flex items-center justify-center",
        aspectClasses[aspectRatio],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ backgroundColor: bg }}
      role="img"
      aria-label={productNameAr ?? "صورة المنتج"}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-15"
        style={{ backgroundColor: accent }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-3 p-6 text-center">
        <span className="text-5xl">{colors.icon}</span>
        {productNameAr && (
          <span
            className="font-semibold text-lg"
            style={{ color: accent }}
          >
            {productNameAr}
          </span>
        )}
        <span className="text-xs text-muted opacity-60">صورة قريباً</span>
      </div>
    </div>
  );
}
