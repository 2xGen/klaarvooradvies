import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Voorwaarden en disclaimer",
  description:
    "Algemene voorwaarden, disclaimer en beperking van aansprakelijkheid voor Klaar voor advies. Geen financieel of hypotheekadvies.",
  alternates: { canonical: "/voorwaarden" },
};

export default function VoorwaardenPage() {
  return (
    <main className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <MotionSection>
          <h1 className="font-display text-3xl font-normal text-foreground sm:text-4xl">
            Voorwaarden en disclaimer
          </h1>
          <p className="mt-3 text-sm text-text-muted">Laatst bijgewerkt: mei 2026 - klaarvooradvies.nl</p>
        </MotionSection>

        <MotionSection className="mt-10 space-y-6 text-sm leading-relaxed text-text-muted" delay={0.05}>
          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Exploitatie van de website</h2>
            <p>
              Deze website wordt technisch beheerd door{" "}
              <a
                href="https://2xgen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                2xGen
              </a>{" "}
              (
              <a href="mailto:matthijs@2xgen.com" className="font-semibold text-primary underline-offset-2 hover:underline">
                matthijs@2xgen.com
              </a>
              ). Inhoudelijke vragen over gebruik en privacy: zie ook{" "}
              <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">
                Privacyverklaring
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Geen financieel of hypotheekadvies</h2>
            <p>
              <strong className="text-foreground">Klaar voor advies</strong> is een voorbereidingstool en informatieve
              website. Wat je hier ziet - inclusief rekenresultaten, situatieschets-PDF en teksten - is{" "}
              <strong className="text-foreground">geen persoonlijk financieel, hypotheek- of verzekeringsadvies</strong>
              en geen vervanging voor een AFM-erkende adviseur of aanbieder. Bindende beslissingen (hypotheek,
              renteafspraken, verzekeringen) neem je alleen na eigen onderzoek en in overleg met een gekwalificeerde
              partij.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Juistheid en volledigheid</h2>
            <p>
              We streven naar zorgvuldige inhoud, maar regels, rentes en persoonlijke omstandigheden wijzigen.
              Uitkomsten zijn indicatief. We aanvaarden geen aansprakelijkheid voor schade die voortvloeit uit het
              gebruik van deze site, behoudens opzet of grove schuld of voor zover dwingend recht anders voorschrijft.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Gebruik van de tool en PDF</h2>
            <p>
              Je mag de situatieschets en rekenhulpen gebruiken voor je eigen voorbereiding. Herpublicatie,
              reverse-engineering van de site om anderen te misleiden, of gebruik dat de reputatie van Klaar voor
              advies of partners schaadt, is niet toegestaan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Externe links en adviseurs</h2>
            <p>
              Verwijzingen naar hypotheekadviseurs of andere partijen zijn bedoeld als service. Wij zijn niet
              verantwoordelijk voor hun dienstverlening of tarieven. Eventuele doorverbinding of lead gaat op basis van
              jouw eigen keuze en de voorwaarden van die partij.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Intellectueel eigendom</h2>
            <p>
              Teksten, vormgeving, logo&apos;s en de tool zijn beschermd. Beperkt citeren met bronvermelding is toegestaan;
              overname van grote delen zonder toestemming niet.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Wijzigingen</h2>
            <p>
              Deze voorwaarden kunnen worden bijgewerkt. De datum bovenaan geeft de laatste wijziging aan. Bij
              voortgezet gebruik na wijziging ga je akkoord met de nieuwe tekst, voor zover wettelijk toegestaan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Toepasselijk recht</h2>
            <p>
              Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden bij de bevoegde rechter in
              Nederland voorgelegd, voor zover consumenten niet een andere dwingende rechtskeuze hebben.
            </p>
          </section>
        </MotionSection>
      </div>
    </main>
  );
}
