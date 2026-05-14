import { ComparisonPoint } from "@/data/products";

interface ComparisonTableProps {
  points: ComparisonPoint[];
}

export default function ComparisonTable({ points }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-beige">
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="border-b border-beige bg-ivory/70">
            <th className="text-right py-4 px-4 text-muted font-medium">الميزة</th>
            <th className="py-4 px-4 text-navy font-bold text-center">
              <span className="inline-flex items-center gap-1">
                <span className="w-6 h-6 rounded-full bg-navy flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">S</span>
                </span>
                سَجَى
              </span>
            </th>
            <th className="py-4 px-4 text-muted font-medium text-center">البديل العادي</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, idx) => (
            <tr
              key={idx}
              className={`border-b border-beige/50 ${idx % 2 === 0 ? "bg-ivory/50" : "bg-white"}`}
            >
              <td className="py-4 px-4 text-navy font-medium">{point.featureAr}</td>
              <td className="py-4 px-4 text-center">
                {point.sajaa ? (
                  <span className="text-success text-lg">✓</span>
                ) : (
                  <span className="text-error text-lg">✗</span>
                )}
              </td>
              <td className="py-4 px-4 text-center">
                {point.generic ? (
                  <span className="text-success text-lg">✓</span>
                ) : (
                  <span className="text-error text-lg">✗</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
