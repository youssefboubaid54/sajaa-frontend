import Link from "next/link";
import { COPY } from "@/data/copy";
import Button from "@/components/ui/Button";

export default function HowToChooseSection() {
  return (
    <section className="bg-ivory py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            {COPY.howToChoose.headline}
          </h2>
          <p className="text-navy/60 text-lg">{COPY.howToChoose.sub}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COPY.howToChoose.cards.map((card) => {
            const bgColors: Record<string, string> = {
              hams: "#F5EFE6",
              hidn: "#EEF0F5",
              subaat: "#F0EDF8",
            };
            const accentColors: Record<string, string> = {
              hams: "#D4B896",
              hidn: "#8B9DC3",
              subaat: "#9B89C4",
            };

            return (
              <div
                key={card.productSlug}
                className="rounded-3xl border border-beige p-7 flex flex-col gap-5 hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: bgColors[card.productSlug] }}
              >
                {/* Icon */}
                <span className="text-4xl">{card.icon}</span>

                {/* Question */}
                <div className="space-y-2">
                  <p className="font-semibold text-navy text-base leading-snug">
                    {card.questionAr}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: accentColors[card.productSlug] }}
                  >
                    {card.answerAr}
                  </p>
                </div>

                {/* CTA */}
                <Link href={`/products/${card.productSlug}`} className="mt-auto">
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    style={{
                      borderColor: accentColors[card.productSlug],
                      color: accentColors[card.productSlug],
                    }}
                  >
                    {card.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
