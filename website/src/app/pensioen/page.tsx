import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Pensioen",
  description: "We focussen nu op hypotheek. Geen pensioenadvies.",
  alternates: { canonical: "/pensioen" },
};

export default function PensioenPage() {
  return (
    <main className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <MotionSection>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success-light text-primary">
            <Home className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="font-display mt-6 text-3xl font-normal text-foreground sm:text-4xl">
            Pensioen staat op pauze
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            We richten ons nu volledig op hypotheek: situatieschets en rekenhulp. Pensioen komt later
            pas weer in beeld — zo houden we het voor jou helder.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/hypotheek"
              className="inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-deep"
            >
              Hypotheek-rekenhulp
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center rounded-full border-2 border-border-soft px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40"
            >
              Terug naar home
            </Link>
          </div>
        </MotionSection>
      </div>
    </main>
  );
}
