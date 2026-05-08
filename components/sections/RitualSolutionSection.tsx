import Link from "next/link";
import { COPY } from "@/data/copy";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function RitualSolutionSection() {
  const steps = COPY.ritual.steps;

  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            {COPY.ritual.headline}
          </h2>
          <p className="text-navy/60 text-lg">{COPY.ritual.sub}</p>
        </div>

        {/* Steps — desktop: horizontal, mobile: vertical */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-16 right-[16.66%] left-[16.66%] h-px bg-gradient-to-l from-gold/20 via-gold/50 to-gold/20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.productSlug} className="flex flex-col items-center text-center relative">
                {/* Step number bubble */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-navy border-4 border-gold flex items-center justify-center text-gold font-bold text-lg mb-6 shadow-gold">
                  {step.number}
                </div>

                {/* Product image */}
                <div className="w-full mb-6">
                  <PlaceholderImage
                    productSlug={step.productSlug}
                    productNameAr={step.nameAr}
                    aspectRatio="square"
                    className="max-w-[180px] mx-auto shadow-medium"
                  />
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="font-bold text-navy text-xl">{step.nameAr}</h3>
                  <p className="font-semibold text-navy/80 text-base">{step.titleAr}</p>
                  <p className="text-navy/60 text-sm leading-relaxed">{step.descAr}</p>
                </div>

                {/* CTA */}
                <Link
                  href={`/products/${step.productSlug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold border-b border-gold/30 hover:border-gold transition-colors pb-0.5"
                >
                  اكتشفي {step.nameAr}
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Mobile connecting arrow */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-gold/40 text-2xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 bg-navy text-gold px-8 py-4 rounded-2xl font-medium shadow-soft hover:bg-navy-dark transition-colors"
          >
            اكتشفي الطقس الكامل
          </Link>
        </div>
      </div>
    </section>
  );
}
