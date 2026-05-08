import { COPY } from "@/data/copy";

export default function ProblemSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            {COPY.problem.headline}
          </h2>
          <p className="text-navy/60 text-lg leading-relaxed">{COPY.problem.sub}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COPY.problem.cards.map((card, i) => {
            const products = ["هَمْس", "حِضْن", "سُبَات"];
            const slugs = ["hams", "hidn", "subaat"];
            const bgColors = ["#F5EFE6", "#EEF0F5", "#F0EDF8"];
            const accentColors = ["#D4B896", "#8B9DC3", "#9B89C4"];

            return (
              <div
                key={i}
                className="group relative rounded-3xl p-8 border border-beige hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: bgColors[i] }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-soft"
                  style={{ backgroundColor: `${accentColors[i]}20` }}
                >
                  {card.icon}
                </div>

                {/* Content */}
                <h3 className="font-bold text-navy text-lg mb-3 leading-snug">
                  {card.titleAr}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-5">
                  {card.descAr}
                </p>

                {/* Product hint */}
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: `${accentColors[i]}25`,
                    color: accentColors[i],
                  }}
                >
                  <span>الحل:</span>
                  <span>{products[i]}</span>
                </div>

                {/* Hover arrow */}
                <a
                  href={`/products/${slugs[i]}`}
                  className="absolute inset-0 rounded-3xl"
                  aria-label={`اكتشفي ${products[i]}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
