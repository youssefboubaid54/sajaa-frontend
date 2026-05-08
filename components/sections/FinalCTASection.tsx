import Link from "next/link";
import Button from "@/components/ui/Button";

export default function FinalCTASection() {
  return (
    <section className="bg-navy-gradient py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative element */}
        <div className="w-16 h-1 bg-gold mx-auto rounded-full mb-8" />

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold mb-6 leading-tight">
          ابدئي الليلة بطقس سَجَى
        </h2>

        <p className="text-gold/70 text-lg mb-10 leading-relaxed max-w-lg mx-auto">
          الدفع عند الاستلام. توصيل داخل السعودية. لا مخاطرة، فقط ليالٍ أهدأ.
        </p>

        <Link href="/collection">
          <Button variant="secondary" size="xl">
            اطلبي طقس النوم الآن
          </Button>
        </Link>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          {[
            { icon: "💳", text: "الدفع عند الاستلام" },
            { icon: "🚚", text: "توصيل داخل السعودية" },
            { icon: "↩️", text: "إرجاع سهل" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 text-gold/60 text-sm">
              <span>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
