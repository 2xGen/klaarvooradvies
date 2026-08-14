"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { QuickHypotheekIndicatie } from "@/components/QuickHypotheekIndicatie";

const trustPills = ["Gratis", "Geen account", "±5 minuten"];

export function Hero() {
  return (
    <section
      id="hypotheek-indicatie"
      className="relative scroll-mt-24 overflow-x-clip overflow-y-visible bg-warm-glow pb-12 pt-8 sm:pb-16 sm:pt-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-70" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:items-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="min-w-0 lg:pt-4"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/90 px-3.5 py-1.5 text-xs font-medium text-text-muted shadow-sm backdrop-blur-sm sm:text-sm">
            <Home className="h-3.5 w-3.5 text-primary" aria-hidden />
            Eerst overzicht. Dan advies.
          </p>

          <h1 className="font-display mt-5 text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-[3.15rem]">
            Hoeveel hypotheek kun je krijgen?
          </h1>

          <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
            Vul je inkomen in en krijg direct een eerste indicatie. Zet daarna je volledige
            financiële situatie gratis op één PDF.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {trustPills.map((label) => (
              <li key={label}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border-soft/80 bg-surface/80 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm sm:text-sm">
                  <span className="text-primary" aria-hidden>
                    ✓
                  </span>
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          <QuickHypotheekIndicatie embedded />
        </motion.div>
      </div>
    </section>
  );
}
