"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, Home, Users } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

const items = [
  {
    title: "Eerste huis",
    body: "Wil je weten wat ongeveer mogelijk is voordat je gaat bezichtigen?",
    icon: Home,
    href: "/hypotheek",
  },
  {
    title: "Studieschuld of lening",
    body: "Vraag je je af hoeveel invloed je schulden hebben op je hypotheek?",
    icon: GraduationCap,
    href: "/hypotheek-met-studieschuld",
  },
  {
    title: "Samen kopen",
    body: "Twee inkomens, één duidelijk overzicht voordat jullie een gesprek ingaan.",
    icon: Users,
    href: "/hypotheek-met-partner",
  },
  {
    title: "ZZP’er",
    body: "Wisselend inkomen maakt rekenen lastiger. Zet eerst je cijfers op een rij.",
    icon: Briefcase,
    href: "/hypotheek-als-zzper",
  },
];

export function Testimonials() {
  return (
    <MotionSection
      id="voor-wie"
      className="relative overflow-x-clip overflow-y-visible py-16 sm:py-20"
    >
      <div className="absolute inset-0 bg-[#eef5f1]" />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Herken je jouw situatie?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-text-muted">
          Eerste huis, studieschuld, samen kopen of ondernemen: eerst overzicht, dan pas het gesprek.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <motion.article
              key={t.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="flex h-full flex-col rounded-2xl border border-border-soft/70 bg-surface/95 p-6 shadow-md"
            >
              <Link href={t.href} className="flex h-full flex-col">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-light text-primary"
                  aria-hidden
                >
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{t.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{t.body}</p>
                <span className="mt-4 text-sm font-semibold text-primary">Bereken →</span>
              </Link>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/situatieschets"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Maak mijn hypotheekoverzicht
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
