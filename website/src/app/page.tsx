import type { Metadata } from "next";
import { AdviserCta } from "@/components/AdviserCta";
import { CtaSection } from "@/components/CtaSection";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PdfPreview } from "@/components/PdfPreview";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Hoeveel hypotheek kun je krijgen?",
  description:
    "Bereken je maximale hypotheek op basis van inkomen, studieschuld en partner. Maak daarna gratis een hypotheekoverzicht en laat het vrijblijvend bekijken door een erkend adviseur.",
  alternates: { canonical: "/" },
  keywords: [
    "hoeveel hypotheek kan ik krijgen",
    "maximale hypotheek berekenen",
    "hypotheekoverzicht maken",
    "hypotheek berekenen met studieschuld",
    "hypotheek berekenen met partner",
    "hypotheek zzp",
    "gratis hypotheekoverzicht",
    "Klaar voor advies",
  ],
  openGraph: {
    title: "Hoeveel hypotheek kun je krijgen?",
    description:
      "Bereken eerst zelf wat er ongeveer mogelijk is. Maak daarna gratis een persoonlijk hypotheekoverzicht — of laat het vrijblijvend bekijken.",
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PdfPreview />
      <AdviserCta />
      <Testimonials />
      <HowItWorks />
      <Faq />
      <CtaSection />
    </main>
  );
}
