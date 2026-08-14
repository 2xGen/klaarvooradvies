import type { Metadata } from "next";
import Link from "next/link";
import { HypotheekOnepagerWizard } from "@/components/HypotheekOnepagerWizard";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Gratis hypotheekoverzicht",
  description:
    "Zet je inkomen, schulden, spaargeld en woninggegevens overzichtelijk op één PDF. Gratis, geen account, in een paar minuten. Daarna kun je het laten meekijken.",
  alternates: { canonical: "/situatieschets" },
};

export default function SituatieschetsPage() {
  return (
    <main className="bg-background pb-16 pt-8 sm:pb-20 sm:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <MotionSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Gratis hypotheekoverzicht
          </p>
          <h1 className="font-display mt-3 text-3xl font-normal text-foreground sm:text-4xl">
            Zet je situatie op één PDF
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Inkomen, schulden, spaargeld en woninggegevens — overzichtelijk, klaar voor je gesprek.
            Geen account nodig. In ongeveer vijf minuten klaar.
          </p>
          <p className="mt-4 text-sm text-text-muted">
            Liever eerst rekenen?{" "}
            <Link href="/hypotheek" className="font-semibold text-primary underline-offset-2 hover:underline">
              Open de hypotheek-rekenhulp
            </Link>
          </p>
        </MotionSection>

        <div className="mx-auto mt-10 max-w-3xl">
          <HypotheekOnepagerWizard />
        </div>

        <MotionSection
          delay={0.06}
          className="mx-auto mt-16 max-w-2xl border-t border-border-soft pt-12 sm:mt-20 sm:pt-16"
        >
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Wat je terugvindt in je overzicht
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Alles wat je zelf invult, netjes op een rij — plus aandachtspunten en voorbeeldvragen voor
            het gesprek.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-text-muted">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Jouw cijfers:</strong> inkomen (en
                partner), contracten, studieschuld en andere lasten, spaargeld en je richting qua
                koopsom.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Voor het gesprek:</strong> wat in jouw
                situatie opvalt, en vragen die je kunt stellen.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Van jou.</strong> Meenemen naar iedere
                erkende hypotheekadviseur — of aan het einde vrijblijvend laten meekijken.
              </span>
            </li>
          </ul>

          <p className="mt-8 text-sm leading-relaxed text-text-muted">
            Wil je eerst een ruwe bandbreedte? Gebruik de{" "}
            <Link href="/#hypotheek-indicatie" className="font-semibold text-primary underline-offset-2 hover:underline">
              rekenhulp op de homepage
            </Link>{" "}
            of de{" "}
            <Link href="/hypotheek" className="font-semibold text-primary underline-offset-2 hover:underline">
              uitgebreide rekenhulp
            </Link>
            .
          </p>
        </MotionSection>
      </div>
    </main>
  );
}
