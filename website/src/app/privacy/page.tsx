import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Hoe Klaar voor advies omgaat met persoonsgegevens, cookies, analytics en hosting. Geen gegevens zonder jouw actie of toestemming waar dat wettelijk nodig is.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <MotionSection>
          <h1 className="font-display text-3xl font-normal text-foreground sm:text-4xl">
            Privacyverklaring
          </h1>
          <p className="mt-3 text-sm text-text-muted">Laatst bijgewerkt: mei 2026 - domein klaarvooradvies.nl</p>
        </MotionSection>

        <MotionSection className="mt-10 space-y-6 text-sm leading-relaxed text-text-muted" delay={0.05}>
          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Wie is verantwoordelijk?</h2>
            <p>
              Deze website <strong className="text-foreground">Klaar voor advies</strong> is gebouwd en
              beheerd door{" "}
              <a
                href="https://2xgen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                2xGen
              </a>
              . Voor vragen over deze verklaring of gegevensverwerking kun je mailen naar{" "}
              <a href="mailto:matthijs@2xgen.com" className="font-semibold text-primary underline-offset-2 hover:underline">
                matthijs@2xgen.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Kernprincipe</h2>
            <p>
              We verwerken <strong className="text-foreground">geen persoonsgegevens</strong> tenzij je die zelf invult
              op deze website of - waar nodig - uitdrukkelijk toestemming geeft (zoals bij cookies voor statistiek of
              bij een adviseursaanvraag). Wat we niet nodig hebben, slaan we niet op.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Welke gegevens kunnen wij ontvangen?</h2>
            <ul className="list-inside list-disc space-y-2 pl-1">
              <li>
                <strong className="text-foreground">Contactformulier</strong> - naam, e-mailadres en je bericht, enkel
                wanneer je het formulier verstuurt, om je vraag te beantwoorden.
              </li>
              <li>
                <strong className="text-foreground">Situatieschets (wizard)</strong> - de gegevens die jij in de
                tool invult. De PDF wordt op jouw apparaat gegenereerd. Alleen als je aan het einde expliciet kiest
                voor contact met een adviseur en geldige contactgegevens invult, kunnen wij die lead met een partner
                delen of opslaan voor opvolging, zoals in de tool beschreven.
              </li>
              <li>
                <strong className="text-foreground">Technische beveiliging</strong> - verborgen spam-velden
                (honeypot) worden genegeerd en niet bewaard.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Bewaartermijnen (richting gevend)</h2>
            <p>
              Berichten en leads bewaren we niet langer dan nodig is voor beantwoording, opvolging of wettelijke
              plicht. Exacte bewaartermijnen hangen af van de aard van je verzoek; je kunt altijd verzoeken om
              verwijdering, voor zover geen wettelijke bewaarplicht het tegenspreekt.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Hosting, database en koppelingen</h2>
            <p>
              De site draait op <strong className="text-foreground">Vercel</strong> (hosting, beveiligde verbindingen).
              Gegevens die je via formulieren of de situatieschets doorgeeft, kunnen in een beveiligde database
              (bijv. <strong className="text-foreground">Supabase</strong>, EU-clusters waar van toepassing) worden
              opgeslagen. Optioneel kunnen gegevens - als je die flow gebruikt - ook naar een door jou of ons
              ingerichte <strong className="text-foreground">webhook</strong> worden doorgestuurd voor interne
              opvolging. Zonder jouw actie sturen we geen stille profielen door.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Cookies en meting</h2>
            <p>
              Welke cookies we gebruiken (functioneel, optionele statistiek met Vercel Analytics, en hoe we Search
              Console inzetten) staat uitgewerkt in het{" "}
              <Link href="/cookies" className="font-semibold text-primary underline-offset-2 hover:underline">
                cookiebeleid
              </Link>
              . Je kunt je voorkeur wijzigen via &quot;Cookie-instellingen&quot; in de footer of door cookies voor dit
              domein te wissen en de site opnieuw te openen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Rechten</h2>
            <p>
              Je hebt recht op inzage, correctie en - in gepaste gevallen - verwijdering van persoonsgegevens.
              Stuur daarvoor een verzoek naar{" "}
              <a href="mailto:matthijs@2xgen.com" className="font-semibold text-primary underline-offset-2 hover:underline">
                matthijs@2xgen.com
              </a>
              . Voor klachten kun je ook contact opnemen met de Autoriteit Persoonsgegevens.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg text-foreground">Meer informatie</h2>
            <p>
              Algemene voorwaarden, beperking van aansprakelijkheid en de disclaimer over geen financieel advies
              staan op de pagina{" "}
              <Link href="/voorwaarden" className="font-semibold text-primary underline-offset-2 hover:underline">
                Voorwaarden
              </Link>
              . Voor algemene vragen:{" "}
              <Link href="/contact" className="font-semibold text-primary underline-offset-2 hover:underline">
                Contact
              </Link>
              .
            </p>
          </section>
        </MotionSection>
      </div>
    </main>
  );
}
