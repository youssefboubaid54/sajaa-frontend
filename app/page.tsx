import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import RitualSolutionSection from "@/components/sections/RitualSolutionSection";
import ProductCardsSection from "@/components/sections/ProductCardsSection";
import ScienceAuthoritySection from "@/components/sections/ScienceAuthoritySection";
import IngredientsHighlightSection from "@/components/sections/IngredientsHighlightSection";
import TrustBadgesSection from "@/components/sections/TrustBadgesSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import HowToChooseSection from "@/components/sections/HowToChooseSection";
import BundlePushSection from "@/components/sections/BundlePushSection";
import HomeFAQ from "@/components/sections/HomeFAQ";
import FinalCTASection from "@/components/sections/FinalCTASection";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <RitualSolutionSection />
      <ProductCardsSection products={PRODUCTS} />
      <ScienceAuthoritySection />
      <IngredientsHighlightSection />
      <TrustBadgesSection />
      <SocialProofSection />
      <HowToChooseSection />
      <BundlePushSection />
      <HomeFAQ />
      <FinalCTASection />
    </>
  );
}
