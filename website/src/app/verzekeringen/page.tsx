import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Verzekeringen",
  description: "We focussen nu op hypotheek. Geen verzekeringsadvies.",
  alternates: { canonical: "/verzekeringen" },
};

export default function VerzekeringenPage() {
  return (
    <main className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <MotionSection>
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success-light text-primary">
            <Home className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="font-display mt-6 text-3xl font-normal text-foreground sm:text-4xl">
            Nu even alleen hypotheek
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Verzekeringen laten we bewust even rusten — we willen eerst de hypotheek-situatieschets
            zo goed mogelijk maken. Later kunnen we hier uitbreiden.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/situatieschets"
              className="inline-flex justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-deep"
            >
              Naar situatieschets
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
