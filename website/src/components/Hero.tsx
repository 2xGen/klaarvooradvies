"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const trustPills = ["PDF met je hypotheekoverzicht", "In een paar minuten klaar"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** Same surface treatment as `/gids` hub — warm-glow, sage accents, fades naturally into the rest of the page */
export function Hero() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible bg-warm-glow pb-12 pt-8 sm:pb-16 sm:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-70" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 sm:gap-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="min-w-0 overflow-visible"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/90 px-3.5 py-1.5 text-xs font-medium text-text-muted shadow-sm backdrop-blur-sm sm:text-sm">
            <Home className="h-3.5 w-3.5 text-primary" aria-hidden />
            Hypotheek voorbereiden — gratis situatieschets (PDF)
          </p>

          <h1 className="font-display mt-5 text-4xl font-bold tracking-normal text-foreground sm:text-5xl lg:text-6xl xl:text-[3.35rem]">
            Voorbereid op je hypotheekgesprek
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            In een paar minuten een gratis PDF met inkomen, schulden en spaargeld op een rij — voor je gesprek met een{" "}
            <strong className="font-semibold text-foreground">erkend adviseur</strong>.
          </p>

          <div className="mt-7 w-full max-w-xl">
            <Link
              href="/situatieschets"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-lg"
            >
              Start je situatieschets
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-2 sm:mt-11 sm:gap-2.5"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {trustPills.map((label) => (
              <motion.li key={label} variants={item}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border-soft/80 bg-surface/80 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm sm:text-sm">
                  <span className="text-primary" aria-hidden>
                    ✓
                  </span>
                  {label}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-muted sm:mt-10 sm:text-base">
            Met overzicht op papier stel je scherpere vragen — nog vóór je offertes vergelijkt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md overflow-visible lg:max-w-none"
        >
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-accent/35 via-transparent to-primary/20 blur-md" />
          <div className="relative aspect-[1/1] overflow-hidden rounded-[1.85rem] border border-border-soft/80 bg-surface shadow-xl ring-1 ring-black/[0.03] sm:aspect-[6/5] lg:aspect-[1/1]">
            <Image
              src="https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/klaar%20voor%20advies%20nederland.jpg"
              alt="Voorbereidend hypotheekgesprek met adviseur"
              width={900}
              height={680}
              className="h-full w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/28 to-transparent px-5 pb-6 pt-16 sm:px-6 sm:pb-7">
              <p className="mx-auto max-w-[36ch] text-center text-sm font-semibold leading-relaxed text-white drop-shadow sm:text-base">
                Hypotheek helder op tafel — samen, zonder haast.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
