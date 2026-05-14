import { HowToUseStep } from "@/data/products";

interface HowToUseProps {
  steps: HowToUseStep[];
}

export default function HowToUse({ steps }: HowToUseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex gap-4 items-start md:flex-col md:items-stretch">
          {/* Step number */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy flex items-center justify-center text-gold font-bold text-sm shadow-gold md:mb-1">
            {idx + 1}
          </div>
          {/* Content */}
          <div className="flex-1 bg-white rounded-3xl p-5 shadow-soft border border-beige">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{step.icon}</span>
              <h3 className="font-bold text-navy text-base">{step.titleAr}</h3>
            </div>
            <p className="text-muted text-sm leading-relaxed">{step.descAr}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
