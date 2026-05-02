"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MotionSection } from "@/components/MotionSection";

const faqs = [
  {
    q: "Is dit financieel advies?",
    a: "Nee — alleen voorbereiding. We geven geen hypotheekadvies en zijn niet WFT-vergunningsplichtig. Je situatieschets is een overzicht van jouw gegevens, geen persoonlijk productadvies. Voor bindende keuzes: altijd een erkend hypotheek- of financieel adviseur.",
  },
  {
    q: "Wat gebeurt er met mijn gegevens?",
    a: "Je gegevens worden gebruikt om jouw PDF te genereren. We verkopen geen data aan derden. Als je een webhook of nieuwsbrief koppelt, gelden daar de voorwaarden van die dienst — houd je privacyverklaring actueel.",
  },
  {
    q: "Kost het iets?",
    a: "De situatieschets is gratis. Altijd.",
  },
  {
    q: "Waarom staat er geen maximaal leenbedrag op mijn PDF?",
    a: "De situatieschets is bedoeld als voorbereiding: jouw cijfers en vragen op papier voor je adviseur — geen product of offerte. Een bindend leenbedrag hoort bij je dossier en je adviseur. Wil je zelf een ruwe berekening? Probeer de snelle rekenhulp op de homepage of de rekenhulp op de hypotheekpagina.",
  },
  {
    q: "Kan ik de PDF delen met mijn adviseur?",
    a: "Ja — dat is precies het idee. Download je hypotheek-situatieschets, stuur hem mee of neem hem mee, en loop voorbereid je hypotheekgesprek in.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionSection className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-center text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Vragen die we vaak horen
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-text-muted">
          Klik gerust open — kort en duidelijk antwoord.
        </p>

        <div className="mt-10 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-border-soft/80 bg-background/80 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted/50 sm:px-5 sm:text-base"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex shrink-0 text-primary"
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-border-soft/60"
                    >
                      <p className="px-4 pb-4 pt-3 text-sm leading-relaxed text-text-muted sm:px-5 sm:pb-5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
