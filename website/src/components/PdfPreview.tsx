"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

const bullets = [
  "Inkomen & partner",
  "Schulden & maandlasten",
  "Spaargeld & eigen geld",
  "Woning & gewenste koopsom",
  "Aandachtspunten",
  "Vragen voor je hypotheekgesprek",
];

export function PdfPreview() {
  return (
    <MotionSection
      id="hypotheek-pdf"
      className="border-t border-border-soft/80 bg-background py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Gratis hypotheekoverzicht
          </p>
          <h2 className="font-display mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
            Je berekening is maar het begin
          </h2>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted">
            Inkomen alleen vertelt niet het hele verhaal. Studieschuld, andere leningen, spaargeld,
            partner en je woonsituatie kunnen allemaal invloed hebben. Zet je volledige situatie
            gratis op één overzicht.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 text-base text-foreground">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success-light text-primary">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <Link
            href="/situatieschets"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-lg"
          >
            Maak mijn gratis hypotheekoverzicht
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <p className="mt-3 text-sm text-text-muted">Gratis · Geen account · ±5 minuten</p>
        </div>

        <article
          className="relative mx-auto w-full max-w-sm rotate-[0.5deg] overflow-hidden rounded-[1.15rem] border border-border-soft bg-surface shadow-2xl lg:mx-0 lg:max-w-none"
          aria-label="Voorbeeldweergave van een hypotheekoverzicht"
        >
          <header className="bg-primary px-5 py-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-95">
              Hypotheekoverzicht
            </p>
            <p className="font-display text-xl font-semibold tracking-tight">Klaar voor advies</p>
          </header>
          <div className="space-y-3 p-5 text-sm">
            {["Inkomensprofiel", "Schuldenoverzicht", "Spaargeld & woning", "Vragen voor je gesprek"].map(
              (title) => (
                <div key={title}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{title}</p>
                  <div className="mt-1.5 h-2.5 rounded bg-surface-muted blur-[2px]" />
                  <div className="mt-1 h-2 w-[92%] rounded bg-surface-deep blur-[1px]" />
                </div>
              ),
            )}
          </div>
          <p className="border-t border-border-soft bg-surface-muted px-5 py-3 text-[10px] leading-relaxed text-text-muted">
            Voorbeeld — jouw PDF bevat jouw eigen invoer.
          </p>
        </article>
      </div>
    </MotionSection>
  );
}
