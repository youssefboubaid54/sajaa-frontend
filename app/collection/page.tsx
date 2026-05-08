import ProductCardsSection from "@/components/sections/ProductCardsSection";
import { PRODUCTS } from "@/data/products";
import { COPY } from "@/data/copy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المنتجات | سَجَى",
  description: "اكتشفي مجموعة سَجَى لطقوس النوم الفاخرة للمرأة السعودية.",
};

export default function CollectionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {COPY.collection.heroHeadline}
          </h1>
          <p className="text-gold/80 text-base">{COPY.collection.heroSub}</p>
        </div>
      </section>

      <ProductCardsSection products={PRODUCTS} />
    </>
  );
}
