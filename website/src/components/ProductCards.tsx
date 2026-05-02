"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

const imageUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80";

export function ProductCards() {
  return (
    <MotionSection className="relative bg-surface py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-sm font-semibold text-primary">Voor wie</p>
        <h2 className="font-display text-center text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          Iedereen die een huis wil kopen — eerst zelf overzicht
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-text-muted">
          Eerste huis, samen kopen, doorstromen of oversluiten: eerst je cijfers en ruimte in beeld.
          Daarna pas een hypotheekadviseur — als jíj daar klaar voor bent.
        </p>

        <motion.article
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="group mt-12 overflow-hidden rounded-[1.35rem] border border-border-soft/80 bg-background shadow-md transition duration-300 hover:shadow-xl lg:grid lg:min-h-[320px] lg:grid-cols-1"
        >
          <div className="relative hidden min-h-[240px] lg:block">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.02]"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-8">
              <span className="mb-3 inline-flex w-fit rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground/90">
                Hypotheek
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-success-light text-primary">
                <Home className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                Jouw situatieschets (PDF)
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
                Je hypotheekoverzicht: inkomen, lasten, woning en eigen geld — plus snelchecks en ruimte
                voor notities. Klaar om mee te nemen naar je gesprek.
              </p>
              <Link
                href="/situatieschets"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
              >
                Start de situatieschets
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:hidden">
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={imageUrl}
                alt="Sleutels op een hypotheekdocument"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 to-transparent" />
            </div>
            <span className="mb-2 inline-flex w-fit rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground/90">
              Hypotheek
            </span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-success-light text-primary">
              <Home className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
              Jouw situatieschets (PDF)
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
              PDF met je situatie op een rij — checklist en snelchecks voor je adviseur.
            </p>
            <Link
              href="/situatieschets"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Start de situatieschets
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </motion.article>

        <p className="mt-8 text-center text-sm text-text-muted">
          Wil je alleen even rekenen?{" "}
          <Link href="/hypotheek" className="font-semibold text-primary underline-offset-2 hover:underline">
            Open de hypotheek-rekenhulp
          </Link>
          .
        </p>
      </div>
    </MotionSection>
  );
}
