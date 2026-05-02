"use client";

import {
  FileText,
  MessageCircleQuestion,
  PiggyBank,
  Route,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Inkomen & partner",
    sub: "Bruto, contract, variabel - op een plek",
    icon: Users,
  },
  {
    title: "Schulden & studieschuld",
    sub: "Wat meetelt voor je overzicht",
    icon: FileText,
  },
  {
    title: "Spaargeld & koopsom",
    sub: "Eigen geld en je richting",
    icon: PiggyBank,
  },
  {
    title: "Wat in jouw situatie opvalt",
    sub: "Korte signalen, geen offerte",
    icon: Sparkles,
  },
  {
    title: "Vragen voor je adviseur",
    sub: "Zodat je niets vergeet",
    icon: MessageCircleQuestion,
  },
  {
    title: "Volgende stappen",
    sub: "Concreet wat je nu kunt doen",
    icon: Route,
  },
] as const;

export function SituatieschetsFeatureGrid() {
  return (
    <section
      id="wat-zit-erin"
      className="scroll-mt-24 border-b border-border-soft/80 bg-background py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-center text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
          Wat zit er in je situatieschets?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-text-muted sm:text-lg">
          In een oogopslag - straks uitgewerkt in je PDF.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.li
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex gap-4 rounded-2xl border border-border-soft/90 bg-surface/90 p-4 shadow-sm sm:p-5"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-success-light text-primary"
                aria-hidden
              >
                <f.icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-base font-semibold text-foreground sm:text-lg">
                  {f.title}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-text-muted">{f.sub}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
