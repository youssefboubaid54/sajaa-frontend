import React from "react";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

interface AlternatingSectionProps {
  title: string;
  description: string;
  imageOnLeft?: boolean;
  productSlug: string;
  productNameAr: string;
  bgColor?: string;
  accentColor?: string;
  icon?: string;
}

export default function AlternatingSection({
  title,
  description,
  imageOnLeft = false,
  productSlug,
  productNameAr,
  bgColor = "#F0E8D8",
  accentColor = "#D4B896",
  icon,
}: AlternatingSectionProps) {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`flex flex-col gap-5 text-center lg:text-right ${imageOnLeft ? "lg:order-2" : "lg:order-1"}`}>
            {icon && (
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-3xl mb-2 mx-auto lg:mx-0">
                {icon}
              </div>
            )}
            <h2 className="text-2xl sm:text-4xl font-bold text-navy leading-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-navy/70 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>
          </div>

          {/* Image */}
          <div className={`relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto ${imageOnLeft ? "lg:order-1" : "lg:order-2"}`}>
            <div className="absolute inset-0 bg-gold/10 rounded-4xl blur-3xl scale-110" />
            <PlaceholderImage
              productSlug={productSlug}
              productNameAr={productNameAr}
              aspectRatio="square"
              className="relative shadow-large rounded-4xl ring-1 ring-beige/60"
              bgColor={bgColor}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
