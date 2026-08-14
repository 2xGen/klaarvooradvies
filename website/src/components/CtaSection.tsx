"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

export function CtaSection() {
  return (
    <MotionSection className="relative overflow-x-clip overflow-y-visible border-t border-border-soft/80 bg-background py-16 sm:py-20">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display text-3xl font-semibold text-foreground sm:text-4xl"
        >
          Klaar om te weten waar je staat?
        </motion.h2>
        <p className="mt-4 text-base text-text-muted sm:text-lg">
          Maak gratis je hypotheekoverzicht. Daarna bepaal je zelf of je het laat bekijken.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          <Link
            href="/situatieschets"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-lg"
          >
            Maak mijn gratis hypotheekoverzicht
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </motion.div>
        <p className="mt-4 text-sm text-text-muted">Gratis · Geen account · ±5 minuten</p>
      </div>
    </MotionSection>
  );
}
