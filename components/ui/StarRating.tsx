interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export default function StarRating({
  rating,
  count,
  size = "md",
  showCount = true,
}: StarRatingProps) {
  const clampedRating = Math.min(5, Math.max(0, rating));
  const starSize = sizeMap[size];

  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(clampedRating);
          const partial =
            !filled && i < clampedRating && clampedRating % 1 >= 0.5;
          return (
            <svg
              key={i}
              className={[starSize, filled || partial ? "text-gold" : "text-gray-300"].join(" ")}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>
      {showCount && (
        <span className="text-sm text-muted font-arabic" dir="rtl">
          {count != null ? `(${count.toLocaleString("ar-SA")})` : "(—)"}
        </span>
      )}
    </div>
  );
}
