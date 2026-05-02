import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsTrigger } from "@/components/CookieSettingsTrigger";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description:
    "Welke cookies Klaar voor advies gebruikt: functioneel en optioneel statistiek (Vercel Analytics). Google Search Console en hoe je je keuze wijzigt.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <MotionSection>
          <h1 className="font-display text-3xl font-normal text-foreground sm:text-4xl">Cookiebeleid</h1>
          <p className="mt-3 text-sm text-text-muted">klaarvooradvies.nl - mei 2026</p>
        </MotionSection>

        <MotionSection className="mt-10 space-y-6 text-sm leading-relaxed text-text-muted" delay={0.05}>
          <p>
            We gebruiken cookies en vergelijkbare technieken alleen voor de doeleinden die hieronder
            staan. Uitgebreid over persoonsgegevens: zie onze{" "}
            <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">
              privacyverklaring
            </Link>
            .
          </p>

          <section className="space-y-2">
            <h2 className="font-display text-lg text-foreground">1. Functioneel (noodzakelijk)</h2>
            <p>
              Deze site heeft technische cookies nodig om goed te werken (bijv. je cookiekeuze
              onthouden, beveiliging, formulieren). Zonder dit soort cookies kunnen bepaalde functies
              niet of slecht werken. Daarvoor hebben we <strong className="text-foreground">geen</strong>{" "}
              aparte toestemming nodig; ze vallen onder gerechtvaardigd belang / noodzaak voor de
              dienstverlening.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg text-foreground">2. Statistiek (optioneel)</h2>
            <p>
              Als je in de cookiebanner op <strong className="text-foreground">Accepteren</strong>{" "}
              kiest, laden we <strong className="text-foreground">Vercel Analytics</strong>. Dat meet
              op geaggregeerd niveau hoe pagina&apos;s worden bezocht (geen marketingprofielen zoals
              bij veel advertentienetwerken). Zonder jouw keuze voor statistiek schakelen we dit niet
              in.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg text-foreground">3. Google Search Console</h2>
            <p>
              Als eigenaar van de site gebruiken we{" "}
              <strong className="text-foreground">Google Search Console</strong> om technische en
              zoekgegevens over <em>onze eigen</em> site te bekijken (indexering, zoekprestaties).
              Dat is een dienst voor webmasters; het zet geen marketing- of trackingcookies bij
              gewone bezoekers van klaarvooradvies.nl om je als persoon te volgen op andere sites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg text-foreground">4. Je keuze wijzigen</h2>
            <p>
              Je kunt je keuze voor statistiek later aanpassen: gebruik onderaan elke pagina{" "}
              <CookieSettingsTrigger className="font-semibold text-primary underline-offset-2 hover:underline" />{" "}
              om de banner opnieuw te openen. Of verwijder de cookies voor dit domein in je browser;
              bij een volgend bezoek vragen we je voorkeur opnieuw.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display text-lg text-foreground">5. Contact</h2>
            <p>
              Vragen over dit beleid:{" "}
              <Link href="/contact" className="font-semibold text-primary underline-offset-2 hover:underline">
                Contact
              </Link>{" "}
              of{" "}
              <a href="mailto:matthijs@2xgen.com" className="font-semibold text-primary underline-offset-2 hover:underline">
                matthijs@2xgen.com
              </a>
              .
            </p>
          </section>
        </MotionSection>
      </div>
    </main>
  );
}
