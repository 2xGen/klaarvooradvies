"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

export function CtaSection() {
  return (
    <MotionSection className="relative overflow-x-clip overflow-y-visible py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-soft to-primary-deep" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-25 mix-blend-overlay" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
        >
          Zet je hypotheek op papier voordat je gaat praten
        </motion.h2>
        <p className="mt-4 text-base text-white/90 sm:text-lg">
          In een paar minuten een PDF met je situatie op een rij — gratis, zonder account. Daarna
          bepaal jíj of je een adviseur belt.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          <Link
            href="/situatieschets"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-foreground shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-xl"
          >
            Start met je situatieschets
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </motion.div>
        <p className="mt-4 text-sm font-semibold text-white">Zo weet je waar je staat — vóór het gesprek.</p>
        <p className="mt-6 text-xs leading-relaxed text-white/75">
          Geen hypotheekadvies — alleen voorbereiding. Geen verplichtingen.
        </p>
      </div>
    </MotionSection>
  );
}
