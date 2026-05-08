type BadgeVariant = "gold" | "navy" | "green" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: "bg-gold text-navy-dark",
  navy: "bg-navy text-gold",
  green: "bg-success text-white",
  gray: "bg-gray-200 text-gray-700",
};

export default function Badge({
  children,
  variant = "gold",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
