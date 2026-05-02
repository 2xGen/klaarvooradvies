"use client";

import { motion } from "framer-motion";
import { ClipboardList, Download, Handshake } from "lucide-react";
import Image from "next/image";
import { MotionSection } from "@/components/MotionSection";

const steps = [
  {
    n: "1",
    title: "Vul je situatie in",
    body: "Inkomen, partner, studieschuld, spaar — in gewone taal. Precies wat een adviseur later ook wil weten.",
    icon: ClipboardList,
  },
  {
    n: "2",
    title: "Download je PDF",
    body: "Een net document met je cijfers op een rij. Geen offerte — wél houvast en een duidelijke checklist voor je gesprek.",
    icon: Download,
  },
  {
    n: "3",
    title: "Ga voorbereid in gesprek",
    body: "Met overzicht op tafel praat je rustiger over rente, looptijd en maandlast — en je stelt betere vragen.",
    icon: Handshake,
  },
];

const listParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export function HowItWorks() {
  return (
    <MotionSection
      id="hoe-het-werkt"
      className="relative rounded-t-[1.75rem] border-x border-t border-border-soft/60 bg-success-light bg-paper pb-16 pt-14 shadow-[0_-10px_48px_rgba(44,42,38,0.07)] sm:rounded-t-[2.25rem] sm:pb-20 sm:pt-16"
    >
      <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-border-soft/70 shadow-lg lg:mx-0 lg:max-w-none">
            <Image
              src="https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/klaar%20voor%20advies.jpg"
              alt="Koppel in gesprek met hypotheekadviseur"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-transparent to-transparent" />
          </div>

          <div>
            <p className="text-sm font-semibold text-primary">Hoe het werkt</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
              Van losse cijfers naar een duidelijk plan
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text-muted">
              Je bouwt één dossier: wat ertoe doet voor je hypotheek. Daarna loop je met meer rust en
              richting je adviseur binnen.
            </p>

            <motion.ul
              className="mt-10 space-y-5"
              variants={listParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
            >
              {steps.map((s) => (
                <motion.li
                  key={s.title}
                  variants={listItem}
                  className="flex gap-4 rounded-2xl border border-border-soft/60 bg-surface/80 p-4 shadow-sm backdrop-blur-sm sm:p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary">
                    <s.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-primary">{s.n}. {s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
