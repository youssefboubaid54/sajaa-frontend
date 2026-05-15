import { HowToUseStep } from "@/data/products";

interface HowToUseProps {
  steps: HowToUseStep[];
}

export default function HowToUse({ steps }: HowToUseProps) {
  return (
    <div className="relative">
      {/* Connector line — desktop */}
      <div className="hidden md:block absolute top-5 right-[2.25rem] left-[2.25rem] h-0.5 bg-beige" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative flex gap-4 items-start md:flex-col md:items-center md:text-center">
            {/* Mobile: vertical connector */}
            {idx < steps.length - 1 && (
              <div className="md:hidden absolute right-[1.1rem] top-10 bottom-0 w-0.5 bg-beige" />
            )}

            {/* Step number */}
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center text-gold font-bold text-sm shadow-gold">
              {idx + 1}
            </div>

            {/* Content card */}
            <div className="flex-1 md:w-full bg-white rounded-3xl p-5 shadow-soft border border-beige">
              <div className="flex items-center gap-2 mb-2 md:justify-center">
                <span className="text-2xl">{step.icon}</span>
                <h3 className="font-bold text-navy text-sm sm:text-base leading-snug">{step.titleAr}</h3>
              </div>
              <p className="text-muted text-sm leading-relaxed md:text-center">{step.descAr}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
