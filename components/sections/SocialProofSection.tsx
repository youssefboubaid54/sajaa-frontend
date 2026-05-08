"use client";

import useEmblaCarousel from "embla-carousel-react";
import { REVIEWS } from "@/data/reviews";
import StarRating from "@/components/ui/StarRating";

const ENABLE_PLACEHOLDERS =
  process.env.NEXT_PUBLIC_ENABLE_PLACEHOLDER_REVIEWS === "true";

export default function SocialProofSection() {
  const [emblaRef] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const reviews = ENABLE_PLACEHOLDERS
    ? REVIEWS
    : REVIEWS.filter((r) => !r.isPlaceholder);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            تجارب حقيقية من نساء سعوديات
          </h2>
          <p className="text-navy/60 text-lg">
            الأرق، التعب، التفكير المستمر... كلها مشاكل شاركتنا إياها عميلاتنا، وكيف ساعدتهن سَجَى في إيجاد الهدوء.
          </p>
        </div>

        {/* UGC video placeholder strip */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="relative aspect-[9/16] sm:aspect-video lg:aspect-[9/16] rounded-2xl overflow-hidden bg-beige border border-beige flex flex-col items-center justify-center gap-2 max-h-48 sm:max-h-none"
            >
              <div className="w-12 h-12 rounded-full bg-navy/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-navy/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-xs text-navy/50 font-medium">قريباً</span>
            </div>
          ))}
        </div>

        {/* Reviews carousel */}
        {reviews.length > 0 && (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-80 sm:w-96 bg-ivory rounded-3xl border border-beige p-6 flex flex-col gap-3"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-navy">{review.nameAr}</p>
                        <span className="text-success text-xs flex items-center gap-0.5 bg-success/10 px-1.5 py-0.5 rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          مشتري مؤكد
                        </span>
                      </div>
                      <p className="text-xs text-muted">{review.city}</p>
                    </div>
                    <StarRating rating={review.rating} showCount={false} />
                  </div>

                  {/* Text */}
                  <p className="text-sm text-navy/70 leading-relaxed flex-1">
                    &ldquo;{review.textAr}&rdquo;
                  </p>

                  {/* Product tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-beige text-navy px-3 py-1 rounded-full">
                      {review.productSlug === "all" ? "الطقس الكامل" : review.productSlug === "hams" ? "هَمْس" : review.productSlug === "hidn" ? "حِضْن" : "سُبَات"}
                    </span>
                    {review.isPlaceholder && (
                      <span className="text-[10px] text-muted">مراجعة تجريبية</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {reviews.length === 0 && (
          <div className="text-center py-12 text-navy/40">
            <p>المراجعات ستظهر قريباً</p>
          </div>
        )}
      </div>
    </section>
  );
}
