"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { MotionSection } from "@/components/MotionSection";

const bullets = [
  "Inkomen en situatie op een rij (jij / partner)",
  "Schulden en wat ze ongeveer doen met je ruimte",
  "Snelchecks en aandachtspunten voor je gesprek (geen leenbedrag op de PDF)",
  "Wat je wilt bespreken met je adviseur",
  "Ruimte voor je eigen aantekeningen",
  "Een duidelijke volgende stap op papier",
];

export function PdfPreview() {
  return (
    <MotionSection
      id="hypotheek-pdf"
      className="relative overflow-x-clip overflow-y-visible bg-background py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center lg:mx-auto lg:max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            Je hypotheekoverzicht in één PDF
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Je situatieschets — specifiek voor je hypotheekgesprek: geen stapel jargon, wel wat een
            erkend adviseur meteen kan gebruiken.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="relative hidden h-[min(420px,55vh)] lg:col-span-4 lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-border-soft shadow-md">
              <Image
                src="https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/situatieschets%20hypotheken.jpg"
                alt="Situatieschets voor hypotheken bespreken"
                fill
                className="object-cover"
                quality={95}
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            </div>
            <p className="absolute bottom-4 left-4 right-4 text-xs font-medium leading-snug text-white drop-shadow">
              Handig om naast je hypotheek-PDF te houden: even doorpraten vóór je afspraak.
            </p>
          </div>

          <motion.ul
            className="space-y-4 lg:col-span-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-8%" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            {bullets.map((b) => (
              <motion.li
                key={b}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
                }}
                className="flex gap-3 rounded-xl border border-border-soft/80 bg-surface/90 p-3.5 text-base text-foreground shadow-sm backdrop-blur-sm"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success-light text-primary">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                <span className="leading-snug">{b}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="relative mx-auto w-full max-w-md lg:col-span-4 lg:mx-0 lg:max-w-none">
            <div className="absolute -inset-1 rounded-[1.25rem] bg-gradient-to-br from-accent/30 to-primary/15 opacity-80 blur-lg" />
            <article
              className="relative rotate-[0.5deg] overflow-hidden rounded-[1.15rem] border border-border-soft bg-surface shadow-2xl transition duration-500 hover:rotate-0"
              aria-label="Voorbeeldweergave van een PDF-document"
            >
              <header className="bg-primary px-5 py-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-95">
                  Situatieschets
                </p>
                <p className="font-display text-xl font-semibold tracking-tight">Klaar voor advies</p>
              </header>
              <div className="space-y-3 p-5 text-sm">
                {[
                  "Inkomensprofiel",
                  "Schuldenoverzicht",
                  "Snelchecks",
                  "Financiële kennis",
                  "Volgende stap",
                ].map((title) => (
                  <div key={title}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {title}
                    </p>
                    <div className="mt-1.5 h-2.5 rounded bg-surface-muted blur-[2px]" />
                    <div className="mt-1 h-2 w-[92%] rounded bg-surface-deep blur-[1px]" />
                  </div>
                ))}
              </div>
              <p className="border-t border-border-soft bg-surface-muted px-5 py-3 text-[10px] leading-relaxed text-text-muted">
                Voorbeeld — jouw export bevat jouw echte invoer (geen financieel advies).
              </p>
            </article>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
