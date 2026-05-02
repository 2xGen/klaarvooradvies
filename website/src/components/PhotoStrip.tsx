"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  {
    src: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/klaar%20voor%20advies%20eerste%20stap.png",
    alt: "Samen op de bank over je hypotheek praten",
  },
  {
    src: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/situatieschets%20hypotheken.jpg",
    alt: "Situatieschets hypotheken",
  },
  {
    src: "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/samen%20een%20huis%20kopen.jpg",
    alt: "Samen een huis kopen",
  },
];

export function PhotoStrip() {
  return (
    <section className="border-y border-border-soft/60 bg-surface-muted/50 py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-sm font-medium text-text-muted">
          Zo ziet het eruit als je samen over je hypotheek praat — menselijk, niet alleen cijfers.
        </p>
        <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible">
          {photos.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[5/4] w-[min(78vw,320px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-border-soft/70 shadow-md sm:w-auto"
            >
              <Image src={p.src} alt={p.alt} fill className="object-cover" sizes="(max-width:640px) 78vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 to-transparent opacity-80" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
