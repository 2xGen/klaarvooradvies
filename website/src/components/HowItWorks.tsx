"use client";

import { Calculator, Download, MessageCircle } from "lucide-react";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

const steps = [
  {
    n: "1",
    title: "Bereken wat je ongeveer kunt lenen",
    body: "Inkomen, partner en studieschuld — in een minuut een eerste indicatie.",
    icon: Calculator,
  },
  {
    n: "2",
    title: "Maak je hypotheekoverzicht",
    body: "Zet inkomen, schulden, spaargeld en woning op één PDF.",
    icon: Download,
  },
  {
    n: "3",
    title: "Laat het vrijblijvend bekijken",
    body: "Een erkend hypotheekadviseur legt uit wat jouw cijfers betekenen.",
    icon: MessageCircle,
  },
];

export function HowItWorks() {
  return (
    <MotionSection
      id="hoe-het-werkt"
      className="border-t border-border-soft/80 bg-success-light/40 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm font-semibold text-primary">Hoe het werkt</p>
        <h2 className="font-display mt-2 text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Van berekening naar gesprek
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-text-muted">
          Het overzicht is van jou. Je kunt de PDF meenemen naar iedere erkende hypotheekadviseur.
          Liever eerst vrijblijvend laten meekijken? Dat kan ook.
        </p>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.title}
              className="rounded-2xl border border-border-soft/60 bg-surface/90 p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-primary">
                <s.icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="font-display mt-4 text-lg font-semibold text-primary">
                {s.n}. {s.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center">
          <Link
            href="/situatieschets"
            className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-deep"
          >
            Start mijn hypotheekoverzicht
          </Link>
        </p>
      </div>
    </MotionSection>
  );
}
