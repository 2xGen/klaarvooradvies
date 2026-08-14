import type { Metadata } from "next";
import Link from "next/link";
import { HypotheekFaq } from "@/components/HypotheekFaq";
import { MaxHypotheekCalculator } from "@/components/MaxHypotheekCalculator";
import { MotionSection } from "@/components/MotionSection";
import { hypotheekFaqJsonLd } from "@/lib/hypotheekFaq";
import { HYPOTHEEK_TOPIC_NAV } from "@/lib/hypotheekTopicPages";

export const metadata: Metadata = {
  title:
    "Maximale hypotheek berekenen 2026 — rekenhulp met LTI, NHG en schulden",
  description:
    "Bereken snel je maximale hypotheek op basis van inkomen, schulden en rente. Inclusief NHG-check, LTI-uitleg en kosten koper — gratis, zonder account.",
  alternates: { canonical: "/hypotheek" },
  keywords: [
    "maximale hypotheek berekenen",
    "hypotheek indicatie",
    "LTV hypotheek",
    "LTI hypotheek",
    "loan to value",
    "loan to income",
    "NHG grens",
    "kosten koper hypotheek",
    "hypotheek vuistregel",
    "geen hypotheekadvies",
    "Klaar voor advies",
  ],
  openGraph: {
    title:
      "Maximale hypotheek berekenen 2026 — rekenhulp met LTI, NHG en schulden",
    description:
      "Bereken snel je maximale hypotheek op basis van inkomen, schulden en rente. NHG-check, LTI-uitleg en kosten koper — gratis, zonder account.",
  },
};

export default function HypotheekPage() {
  const faqJsonLd = hypotheekFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="bg-background">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-10">
          <MotionSection className="mx-auto max-w-3xl">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-primary">
              Hypotheek rekenhulp
            </p>
            <h1 className="font-display mt-3 text-center text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Hoeveel kan ik lenen? <span className="text-primary">Bereken je maximale hypotheek</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-muted">
              Vul je inkomen en schulden in — je ziet direct een eerste richting. Daarna kun je je
              volledige situatie op één PDF zetten.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-text-muted">
              <Link
                href="#hypotheek-uitleg"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                Hoe dit werkt (LTI, LTV, NHG, studieschuld)
              </Link>
              {" · "}
              <Link
                href="/gids"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                Hypotheekgids
              </Link>
            </p>
          </MotionSection>

          <div id="rekenmodule" className="scroll-mt-24 mt-10">
            <MaxHypotheekCalculator />
          </div>
        </div>

        <article
          id="hypotheek-uitleg"
          className="scroll-mt-24 border-t border-border-soft/80 bg-surface-muted/25"
        >
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <section className="border-b border-border-soft/60 pb-12">
              <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
                Hoe wordt je maximale hypotheek berekend?
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-foreground">
                Banken kijken naar drie dingen: je inkomen, je lopende schulden, en de hypotheekrente.
                De verhouding tussen je lening en inkomen heet LTI — loan-to-income.
              </p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-text-muted">
                <p>
                  In Nederland geldt in 2026 een maximale LTI van ongeveer 4,5× je bruto jaarinkomen
                  als vuistregel, afhankelijk van je situatie. Deze rekenhulp gebruikt die vuistregel.
                  Je adviseur gebruikt de exacte toetsnormen van de geldverstrekker — dat kan iets hoger
                  of lager uitvallen.
                </p>
                <p>
                  <strong className="font-medium text-foreground">Voorbeeld:</strong> verdien je €
                  55.000 bruto per jaar, dan is de indicatie €55.000 × 4,5 = €247.500 — vóór aftrek
                  van schulden.
                </p>
              </div>
            </section>

            <section className="mt-12 border-b border-border-soft/60 pb-12">
              <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
                Wat is LTI en waarom telt het mee?
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-foreground">
                LTI staat voor loan-to-income: hoeveel je leent ten opzichte van je bruto
                jaarinkomen. Een LTI van 4,5 betekent dat je maximaal 4,5 keer je jaarinkomen kunt
                lenen.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Heb je een partner? Dan telt het tweede inkomen gedeeltelijk mee — in 2026 telt het
                laagste inkomen voor 90% mee in de gangbare normen. Een erkend adviseur rekent dit
                exact door.
              </p>
            </section>

            <section className="mt-12 border-b border-border-soft/60 pb-12">
              <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
                Wat is LTV — en waarom heb je eigen geld nodig?
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-foreground">
                LTV staat voor loan-to-value: de verhouding tussen je hypotheek en de woningwaarde. In
                Nederland mag je in 2026 maximaal 100% van de woningwaarde lenen — je kunt de koopsom
                dus volledig financieren.
              </p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-text-muted">
                <p>
                  <strong className="font-medium text-foreground">Maar:</strong> kosten koper betaal
                  je uit eigen zak. Denk aan notariskosten, taxatie en eventueel
                  overdrachtsbelasting — samen ruwweg 5–6% van de koopsom. Bij een woning van €300.000
                  is dat al snel €16.000–€18.000 aan eigen geld dat je nodig hebt.
                </p>
                <p>
                  <strong className="font-medium text-foreground">Vuistregel:</strong> zorg voor
                  minimaal 5% van de koopsom als eigen geld, los van je hypotheek.
                </p>
              </div>
            </section>

            <section className="mt-12 border-b border-border-soft/60 pb-12">
              <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
                Wanneer heb je recht op NHG?
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-foreground">
                Nationale Hypotheek Garantie geeft je geldverstrekker een vangnet — en jou vaak een
                lagere rente. In 2026 geldt NHG voor hypotheken tot €435.000.
              </p>
              <p className="mt-4 text-base font-semibold text-foreground">Voordelen:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-base leading-relaxed text-text-muted">
                <li>Lagere hypotheekrente (vaak 0,2–0,6% korting)</li>
                <li>Bescherming bij gedwongen verkoop met restschuld</li>
                <li>Voorwaarde: woning moet bestemd zijn als hoofdverblijf</li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Of jij in aanmerking komt hangt af van je situatie. Check de officiële voorwaarden op{" "}
                <a
                  href="https://www.nhg.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  nhg.nl
                </a>{" "}
                — en laat je adviseur dit bevestigen.
              </p>
            </section>

            <section className="mt-12 border-b border-border-soft/60 pb-12">
              <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
                Studieschuld — hoe zwaar telt die mee?
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-foreground">
                Een studieschuld verlaagt je maximale hypotheek, maar niet euro voor euro. Banken
                rekenen met een fictieve maandlast:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-text-muted">
                <li>
                  DUO-schuld na september 2015: 0,35% van de oorspronkelijke schuld per maand
                </li>
                <li>
                  DUO-schuld vóór september 2015: 0,65% van de oorspronkelijke schuld per maand
                </li>
              </ul>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-text-muted">
                <p>
                  <strong className="font-medium text-foreground">Voorbeeld:</strong> €25.000
                  studieschuld (na 2015) = €87,50 fictieve maandlast. Vul het in de rekenhulp in om te
                  zien wat dat met jouw indicatie doet.
                </p>
                <p>
                  Vul je studieschuld in de rekenhulp in — de calculator houdt hier rekening mee.
                </p>
              </div>
            </section>

            <div className="mt-12 rounded-2xl border border-border-soft bg-success-light/40 p-5 sm:p-6">
              <p className="text-sm font-semibold text-foreground">Kort gezegd</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Gebruik de rekenhulp voor een <strong className="font-medium text-foreground">richting</strong>{" "}
                en deze pagina voor <strong className="font-medium text-foreground">begrippen</strong>.
                Zet daarna je volledige situatie op papier — dan heb je iets om het gesprek mee in te
                gaan.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="#rekenmodule"
                  className="inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-deep"
                >
                  Terug naar rekenhulp
                </Link>
                <Link
                  href="#hypotheek-veelgestelde-vragen"
                  className="inline-flex rounded-full border border-border-strong bg-surface px-5 py-2 text-sm font-semibold text-foreground transition hover:border-primary"
                >
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </article>

        <HypotheekFaq />

        <section className="border-t border-border-soft/80 bg-background py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-center text-2xl font-normal text-foreground sm:text-3xl">
              Eerst rekenen. Dan overzicht. Dan het gesprek.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-text-muted">
              Een berekening op alleen inkomen is een startpunt. Zet daarna je hele situatie op papier.
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border-soft bg-surface-muted/40">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground sm:px-5">
                      Tool
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-foreground sm:px-5">
                      Waarvoor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft/80 text-text-muted">
                  <tr>
                    <td className="px-4 py-4 font-medium text-foreground sm:px-5">Rekenhulp</td>
                    <td className="px-4 py-4 sm:px-5">
                      Snel een richting — hoeveel kun je lenen?
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium text-foreground sm:px-5">
                      <Link href="/situatieschets" className="text-primary underline-offset-2 hover:underline">
                        Hypotheekoverzicht (PDF)
                      </Link>
                    </td>
                    <td className="px-4 py-4 sm:px-5">
                      Jouw cijfers op papier — daarna kun je het laten meekijken
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium text-foreground sm:px-5">
                      <Link href="/gids" className="text-primary underline-offset-2 hover:underline">
                        Hypotheekgids
                      </Link>
                    </td>
                    <td className="px-4 py-4 sm:px-5">
                      Begrijp wat termen als NHG, LTI en annuïteit betekenen
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-10 text-center text-sm font-semibold text-foreground">
              Bereken voor jouw situatie
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {HYPOTHEEK_TOPIC_NAV.filter((l) => l.href !== "/hypotheek").map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex rounded-full border border-border-soft bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
