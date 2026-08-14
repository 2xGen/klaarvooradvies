"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

export function AdviserCta() {
  return (
    <MotionSection
      id="meekijken"
      className="relative overflow-x-clip overflow-y-visible py-16 text-white sm:py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-soft to-primary-deep" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-25 mix-blend-overlay" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
          Vrijblijvend gesprek
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl md:text-5xl">
          Wil je weten wat er écht mogelijk is?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
          Je berekening is slechts een eerste indicatie. Een erkend hypotheekadviseur kan je
          persoonlijke situatie beoordelen en uitleggen wat dit betekent voor jouw
          hypotheekmogelijkheden.
        </p>
        <Link
          href="/situatieschets"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-foreground shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-xl"
        >
          Laat mijn situatie vrijblijvend bekijken
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
        <p className="mt-4 text-sm text-white/80">Geen verplichting. Geen offerte. Binnen 1 werkdag reactie.</p>
      </div>
    </MotionSection>
  );
}
