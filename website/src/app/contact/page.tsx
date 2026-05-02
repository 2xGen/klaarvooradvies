import { Mail } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { MotionSection } from "@/components/MotionSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Vragen over de tool, privacy of samenwerking. Voor orientatie of een adviseur: start met de situatieschets.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <MotionSection className="text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-success-light text-primary">
            <Mail className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="font-display mt-6 text-3xl font-normal text-foreground sm:text-4xl">
            Contact
          </h1>
          <p className="mt-4 text-base leading-relaxed text-text-muted">
            Heb je vragen over deze tool, samenwerking of je privacy? Vul het formulier hieronder in.
            We zijn geen adviseursdesk: voor een bindende hypotheek- of verzekeringsbeslissing moet je
            altijd bij een erkend adviseur terecht.
          </p>
          <ContactForm />
        </MotionSection>

        <MotionSection className="mt-10 rounded-2xl border border-border-soft bg-surface p-6 text-left text-sm leading-relaxed text-text-muted">
          <h2 className="font-display text-lg text-foreground">Hypotheekadviseur (ook voor orientatie)</h2>
          <p className="mt-3">
            We werken samen met <strong className="font-medium text-foreground">AFM-erkende hypotheekadviseurs</strong>.
            Wil je in contact met een adviseur over je hypotheek — ook als het alleen om orientatie
            gaat — dan raden we aan om eerst de{" "}
            <Link href="/situatieschets" className="font-semibold text-primary underline-offset-2 hover:underline">
              situatieschets
            </Link>{" "}
            in te vullen. Daarmee maak je een duidelijke situatieschets en kun je aan het einde,
            als je dat wilt, vrijblijvend een meekijk door een adviseur aanvragen. Zo sluit het
            gesprek beter aan bij jouw situatie.
          </p>
          <p className="mt-4">
            <Link
              href="/situatieschets"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-primary/30 bg-background px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary hover:bg-success-light"
            >
              Naar de situatieschets
            </Link>
          </p>
        </MotionSection>

        <MotionSection className="mt-8 rounded-2xl border border-border-soft bg-surface p-6 text-sm leading-relaxed text-text-muted">
          <h2 id="privacy-teaser" className="font-display scroll-mt-28 text-lg text-foreground">
            Privacy &amp; juridisch
          </h2>
          <p className="mt-2">
            Korte samenvatting: we bewaren alleen wat je zelf invult of - bij adviseurscontact -
            uitdrukkelijk doorgeeft. Statistiek pas na je cookie-keuze. Zie{" "}
            <Link href="/cookies" className="font-semibold text-primary underline-offset-2 hover:underline">
              cookiebeleid
            </Link>
            ,{" "}
            <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">
              privacy
            </Link>{" "}
            en{" "}
            <Link href="/voorwaarden" className="font-semibold text-primary underline-offset-2 hover:underline">
              voorwaarden
            </Link>
            .
          </p>
        </MotionSection>
      </div>
    </main>
  );
}
