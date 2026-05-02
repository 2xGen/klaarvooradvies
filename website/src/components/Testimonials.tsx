"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { MotionSection } from "@/components/MotionSection";

const items = [
  {
    quote:
      "Ik wist eindelijk wat ik moest vragen bij de bank. De adviseur zei dat hij zelden zo'n voorbereide klant had.",
    who: "Sanne de Vries",
    age: "31",
    where: "Amsterdam",
    img: "https://i.pravatar.cc/96?img=47",
  },
  {
    quote:
      "In tien minuten had ik meer houvast voor mijn hypotheek dan na een uur googelen naar rentes en regels.",
    who: "Thomas Bakker",
    age: "28",
    where: "Utrecht",
    img: "https://i.pravatar.cc/96?img=33",
  },
  {
    quote:
      "Mijn partner en ik hadden eindelijk hetzelfde beeld. Dat alleen al was het waard.",
    who: "Roos & Daan Mulder",
    age: "34",
    where: "Rotterdam",
    img: "https://i.pravatar.cc/96?img=56",
  },
];

export function Testimonials() {
  return (
    <MotionSection className="relative overflow-x-clip overflow-y-visible py-16 sm:py-20">
      <div className="absolute inset-0 bg-[#eef5f1]" />
      <div
        className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-50" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-center text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Wat hypotheekzoekers vaak merken
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base leading-relaxed text-text-muted sm:text-lg">
          Voorbeelden — elke situatie is anders, maar zo voelt voorbereid zijn vaak herkenbaar.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.who}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex h-full flex-col rounded-2xl border border-border-soft/70 bg-surface/95 p-7 shadow-md backdrop-blur-sm sm:p-8"
            >
              <div className="flex items-start gap-4">
                <Image
                  src={t.img}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full border-2 border-accent/45 object-cover shadow-sm"
                />
                <figcaption className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1 text-accent-deep" aria-hidden>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-accent-deep text-accent-deep" />
                    ))}
                  </div>
                  <p className="mt-2 text-lg font-semibold leading-snug text-foreground">{t.who}</p>
                  <p className="mt-0.5 text-sm font-medium text-primary">{t.where}</p>
                  <p className="text-xs text-text-muted">{t.age} jaar</p>
                </figcaption>
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-text-muted">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
