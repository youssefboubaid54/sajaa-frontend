import Link from "next/link";
import { COPY } from "@/data/copy";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

export default function HeroSection() {
  return (
    <section className="bg-ivory-gradient min-h-[85vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text — right in RTL */}
          <div className="flex flex-col gap-6 order-1 lg:order-1 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex">
              <span className="bg-gold/20 text-navy text-xs font-semibold px-3 py-1.5 rounded-full border border-gold/30">
                ✨ طقوس نوم للمرأة السعودية
              </span>
            </div>

            {/* Star Rating */}
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center text-gold text-xl tracking-widest drop-shadow-sm">
                ★★★★★
              </div>
              <p className="text-sm font-medium text-navy/80">
                +٢٠٠٠ امرأة سعودية تنام أفضل الآن
              </p>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-tight mt-2">
              {COPY.hero.headline}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-xl">
              {COPY.hero.sub}
            </p>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-3 mt-1">
              {COPY.trust.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white/70 border border-beige rounded-full px-3 py-1.5 text-xs text-navy/80 font-medium shadow-soft"
                >
                  <span className="text-sm">{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/collection">
                <Button variant="primary" size="lg">
                  اطلبي طقس النوم الآن
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg">
                  عن سَجَى
                </Button>
              </Link>
            </div>

            {/* Social proof note */}
            <p className="text-xs text-navy/50 mt-1">
              الدفع عند الاستلام · توصيل داخل السعودية
            </p>
          </div>

          {/* Image — left in RTL (visually on the left) */}
          <div className="order-2 lg:order-2 animate-slide-up">
            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gold/10 rounded-4xl blur-3xl scale-110" />
              <PlaceholderImage
                productSlug="hams"
                productNameAr="طقس سَجَى"
                aspectRatio="portrait"
                className="relative shadow-large rounded-4xl"
                bgColor="#F0E8D8"
                accentColor="#D4B896"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-navy text-gold text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-medium">
                🔒 الدفع عند الاستلام
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
