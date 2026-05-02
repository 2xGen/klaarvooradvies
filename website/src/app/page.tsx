import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { Faq } from "@/components/Faq";
import { FourthSection } from "@/components/FourthSection";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PdfPreview } from "@/components/PdfPreview";
import { PhotoStrip } from "@/components/PhotoStrip";
import { ProductCards } from "@/components/ProductCards";
import { QuickHypotheekIndicatie } from "@/components/QuickHypotheekIndicatie";
import { SituatieschetsFeatureGrid } from "@/components/SituatieschetsFeatureGrid";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SituatieschetsFeatureGrid />
      <QuickHypotheekIndicatie />
      <HowItWorks />
      <PdfPreview />
      <FourthSection />
      <ProductCards />
      <PhotoStrip />
      <Testimonials />
      <Faq />
      <CtaSection />
    </main>
  );
}
