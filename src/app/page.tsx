import type { Metadata } from "next";
import { FeaturedServices } from "@/components/home/featured-services";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HeroSection } from "@/components/home/hero-section";

import { MotionProvider } from "@/components/home/motion-provider";




import WeddingCategories from "@/components/home/wedding-categories";
import WhyChooseWedPlan from "@/components/home/why-choose-wedplan";
import HowWedPlanWorks from "@/components/home/ow-wedplan-works";

export const metadata: Metadata = {
  title: "WedPlan — Your Dream Wedding Starts Here",
  description:
    "Discover and book trusted wedding photographers, venues, florists, caterers, and stylists. Transparent pricing, verified vendors, and calm planning from first search to first dance.",
};

export default function Home() {
  return (
    <MotionProvider>
      <div className="overflow-x-clip">
        <HeroSection />
        <FeaturedServices />
        <WeddingCategories />
        <WhyChooseWedPlan />
        <HowWedPlanWorks />
        <FinalCtaSection />
      </div>
    </MotionProvider>
  );
}
