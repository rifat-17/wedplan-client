import type { Metadata } from "next";

import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedServices } from "@/components/home/featured-services";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { MotionProvider } from "@/components/home/motion-provider";
import { SiteFooter } from "@/components/home/site-footer";
import { WhyChooseSection } from "@/components/home/why-choose-section";

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
        <CategoriesSection />
        <WhyChooseSection />
        <HowItWorksSection />
        <FinalCtaSection />
        <SiteFooter />
      </div>
    </MotionProvider>
  );
}
