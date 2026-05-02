"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GIDS_HERO_IMAGE =
  "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/hypotheek%20gids.png";

export function GidsHero() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible bg-warm-glow pb-12 pt-8 sm:pb-16 sm:pt-12">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-70" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:gap-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Hypotheekgids</p>

          <h1 className="font-display mt-3 text-4xl font-normal leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.1rem]">
            <span className="block text-foreground">Alles over Hypotheken</span>
            <span className="mt-2 block text-primary sm:mt-3">Slimmer het gesprek in</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            Een hypotheek is waarschijnlijk de grootste financiële beslissing van je leven. Hier leggen
            we uit hoe het werkt — in gewone taal, zonder iets te verkopen. Zodat je straks bij een
            adviseur zit met de juiste vragen, niet met een hoofd vol vraagtekens.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-muted">
            Dit is <strong className="font-medium text-foreground">geen persoonlijk advies</strong>.
            Voor een offerte of bindende berekening heb je altijd een{" "}
            <strong className="font-medium text-foreground">erkend adviseur</strong> nodig.
          </p>

          <div className="mt-8">
            <Link
              href="#gids-onderwerpen"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-lg"
            >
              Bekijk alle onderwerpen
              <ArrowDown className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <p className="mt-8 max-w-xl rounded-xl border border-border-soft/80 bg-surface/80 px-4 py-3 text-xs leading-relaxed text-text-muted shadow-sm backdrop-blur-sm sm:text-sm">
            Combineer deze gids met je{" "}
            <Link href="/situatieschets" className="font-semibold text-primary underline-offset-2 hover:underline">
              situatieschets
            </Link>{" "}
            en de{" "}
            <Link href="/hypotheek" className="font-semibold text-primary underline-offset-2 hover:underline">
              rekenhulp
            </Link>{" "}
            — dan kloppen woorden én cijfers als je een professional inschakelt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-accent/35 via-transparent to-primary/20 blur-md" />
          <div className="relative aspect-[1/1] overflow-hidden rounded-[1.85rem] border border-border-soft/80 bg-surface shadow-xl ring-1 ring-black/[0.03] sm:aspect-[6/5] lg:aspect-[1/1]">
            <Image
              src={GIDS_HERO_IMAGE}
              alt="Samen achter de laptop: hypotheek rustig voorbereiden"
              width={900}
              height={680}
              className="h-full w-full object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/28 to-transparent px-5 pb-6 pt-16 sm:px-6 sm:pb-7">
              <p className="mx-auto max-w-[36ch] text-center text-sm font-semibold leading-relaxed text-white drop-shadow sm:text-base">
                Samen de juiste stappen — met rust en overzicht.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
