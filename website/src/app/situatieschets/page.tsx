import type { Metadata } from "next";
import Link from "next/link";
import { HypotheekOnepagerWizard } from "@/components/HypotheekOnepagerWizard";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Situatieschets",
  description:
    "Korte stappen, PDF om mee te nemen naar een erkend adviseur. Geen account. Geen financieel advies.",
  alternates: { canonical: "/situatieschets" },
};

export default function SituatieschetsPage() {
  return (
    <main className="bg-background pb-16 pt-8 sm:pb-20 sm:pt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <MotionSection className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Hypotheek · situatieschets
          </p>
          <h1 className="font-display mt-3 text-3xl font-normal text-foreground sm:text-4xl">
            Jouw situatie op papier
          </h1>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Beantwoord een paar korte stappen en ontvang een PDF die je kunt meenemen naar een erkend
            adviseur.
          </p>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            Geen account nodig. Contactgegevens zijn alleen optioneel aan het einde.
          </p>
          <p className="mt-4 text-sm text-text-muted">
            <Link href="/hypotheek" className="font-semibold text-primary underline-offset-2 hover:underline">
              Alleen rekenen?
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
            Wat je in je situatieschets terugvindt
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-muted">
            De PDF is je <strong className="font-medium text-foreground">voorbereidingsdocument</strong>: alles
            wat je zelf invult, netjes op een rij — handig om mee te nemen of door te sturen vóór een gesprek met
            een erkend adviseur.
          </p>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-text-muted">
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Jouw cijfers:</strong> inkomen (en partner),
                contracten, studieschuld en andere posten, spaargeld en je richting qua koopsom.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Helder voor het gesprek:</strong> wat in jouw
                situatie opvalt, korte interpretatie (geen productadvies) en voorbeeldvragen die je aan je adviseur
                kunt stellen.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Geen vast leenbedrag op de PDF</strong> — dat hoort
                bij je dossier en je adviseur. Wil je vooraf een ruwe bandbreedte? Gebruik de{" "}
                <Link href="/#hypotheek-indicatie" className="font-semibold text-primary underline-offset-2 hover:underline">
                  snelle indicatie op de homepage
                </Link>{" "}
                of de{" "}
                <Link href="/hypotheek" className="font-semibold text-primary underline-offset-2 hover:underline">
                  rekenhulp
                </Link>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span>
                <strong className="font-medium text-foreground">Ruimte onderaan</strong> voor je eigen vragen en
                aantekeningen bij het gesprek.
              </span>
            </li>
          </ul>

          <div className="mt-8 rounded-2xl border border-border-soft/90 bg-success-light/50 px-5 py-4 text-sm leading-relaxed text-text-muted sm:px-6 sm:text-base">
            <p>
              <strong className="font-medium text-foreground">Geen hypotheekadvies van ons.</strong> We structureren
              jouw invoer en helpen je voorbereiden. Voor een offerte, bindende leencapaciteit of productkeuze heb je
              altijd een <strong className="font-medium text-foreground">erkend adviseur</strong> nodig.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
            <p className="text-text-muted">
              Meer achtergrond over hypotheken in gewone taal?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gids"
                className="inline-flex rounded-full border border-border-strong bg-surface px-4 py-2 font-semibold text-foreground transition hover:border-primary"
              >
                Hypotheekgids
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-primary px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-primary-deep"
              >
                Contact
              </Link>
            </div>
          </div>
        </MotionSection>
      </div>
    </main>
  );
}
