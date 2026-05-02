"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { GIDS_FAQ_ITEMS } from "@/lib/gidsFaq";

export function GidsFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="gids-veelgestelde-vragen"
      className="border-t border-border-soft/80 bg-surface-muted/30 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="font-display text-center text-2xl font-normal text-foreground sm:text-3xl">
          Veelgestelde vragen
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-text-muted">
          Korte antwoorden. Nog steeds geen persoonlijk hypotheekadvies — twijfel je? Bel een erkend
          adviseur.
        </p>

        <div className="mt-10 space-y-3">
          {GIDS_FAQ_ITEMS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-border-soft/80 bg-background/90 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md"
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
    </section>
  );
}
