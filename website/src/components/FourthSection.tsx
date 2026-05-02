"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

export function FourthSection() {
  return (
    <MotionSection className="relative overflow-x-clip overflow-y-visible bg-surface-muted/45 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-35" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold text-primary">Waarom dit helpt</p>
          <h2 className="font-display mt-2 text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
            Sterker je gesprek&nbsp;in
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Met situatieschets en rekenhulp heb je overzicht vóór je gesprek: welke vragen je wilt
            stellen en welke keuzes echt tellen. Je gesprek wordt korter, scherper en rustiger —
            omdat je niet meer hoeft te improviseren met losse cijfers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/situatieschets"
              className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-deep"
            >
              Start je situatieschets
            </Link>
            <Link
              href="/gids"
              className="inline-flex rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary"
            >
              Naar hypotheekgids
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem] border border-border-soft/70 shadow-md">
          <Image
            src="https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/samen%20een%20huis%20kopen.jpg"
            alt="Samen een huis kopen"
            fill
            className="object-cover"
            quality={95}
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
        </div>
      </div>
    </MotionSection>
  );
}
