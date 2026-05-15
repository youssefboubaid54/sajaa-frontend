import { ComparisonPoint } from "@/data/products";

interface ComparisonTableProps {
  points: ComparisonPoint[];
}

export default function ComparisonTable({ points }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full min-w-[300px] text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-beige">
            <th className="text-right py-4 px-3 sm:px-4 text-muted font-medium w-full">الميزة</th>
            <th className="py-4 px-3 sm:px-4 font-bold text-center whitespace-nowrap">
              <span className="inline-flex flex-col items-center gap-1">
                <span className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">S</span>
                </span>
                <span className="text-navy text-xs sm:text-sm">سَجَى</span>
              </span>
            </th>
            <th className="py-4 px-3 sm:px-4 text-muted font-medium text-center whitespace-nowrap">
              <span className="inline-flex flex-col items-center gap-1">
                <span className="w-8 h-8 rounded-full bg-beige flex items-center justify-center text-muted text-sm">
                  ?
                </span>
                <span className="text-xs sm:text-sm">البديل</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, idx) => (
            <tr
              key={idx}
              className={[
                "border-b border-beige/50 hover:bg-ivory/60 transition-colors",
                idx % 2 === 0 ? "bg-ivory/30" : "bg-white",
              ].join(" ")}
            >
              <td className="py-3.5 px-3 sm:px-4 text-navy font-medium text-sm leading-snug">{point.featureAr}</td>
              <td className="py-3.5 px-3 sm:px-4 text-center">
                {point.sajaa ? (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-success/10">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-error/10">
                    <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                )}
              </td>
              <td className="py-3.5 px-3 sm:px-4 text-center">
                {point.generic ? (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-success/10">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-error/10">
                    <svg className="w-4 h-4 text-error" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
