"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MotionSection } from "@/components/MotionSection";

const faqs = [
  {
    q: "Kost het iets?",
    a: "De rekenhulp en het hypotheekoverzicht zijn gratis. Altijd. Geen account nodig.",
  },
  {
    q: "Hoeveel hypotheek kan ik krijgen met een studieschuld?",
    a: "Een studieschuld verlaagt je maximale hypotheek, maar niet euro voor euro. Banken rekenen met een fictieve maandlast. Vul je studieschuld in de rekenhulp in voor een eerste indicatie, en zet daarna je volledige situatie in het hypotheekoverzicht.",
  },
  {
    q: "Telt het inkomen van mijn partner mee?",
    a: "Ja, meestal gedeeltelijk. Het tweede inkomen telt mee in de toets, vaak niet voor 100%. Vul beide inkomens in de rekenhulp in en maak daarna één gezamenlijk overzicht.",
  },
  {
    q: "Kan ik mijn overzicht laten meekijken door een adviseur?",
    a: "Ja. Aan het einde van je hypotheekoverzicht kun je vrijblijvend aangeven dat een erkend hypotheekadviseur mag meekijken. Geen verplichting — je krijgt binnen één werkdag reactie.",
  },
  {
    q: "Kan ik de PDF meenemen naar mijn eigen adviseur?",
    a: "Ja. Het overzicht is van jou. Je kunt het naar iedere erkende hypotheekadviseur meenemen of doorsturen.",
  },
  {
    q: "Is dit hypotheekadvies?",
    a: "Nee. Klaar voor advies helpt je je situatie op een rij te zetten. Bindende keuzes, offertes en een maximaal leenbedrag horen bij een erkend hypotheekadviseur.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <MotionSection className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-center text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Kort beantwoord
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-sm text-text-muted">
          Het overzicht is van jou. Het gesprek is optioneel.
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
