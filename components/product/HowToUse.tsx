import { HowToUseStep } from "@/data/products";

interface HowToUseProps {
  steps: HowToUseStep[];
}

export default function HowToUse({ steps }: HowToUseProps) {
  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-4 items-start">
          {/* Step number */}
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-navy flex items-center justify-center text-gold font-bold text-sm">
            {idx + 1}
          </div>
          {/* Content */}
          <div className="flex-1 bg-white rounded-2xl p-4 shadow-soft border border-beige">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{step.icon}</span>
              <h3 className="font-semibold text-navy text-sm">{step.titleAr}</h3>
            </div>
            <p className="text-muted text-sm leading-relaxed">{step.descAr}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
