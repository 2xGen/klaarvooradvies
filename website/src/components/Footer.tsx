import Link from "next/link";
import { CookieSettingsTrigger } from "@/components/CookieSettingsTrigger";

const productLinks = [
  { href: "/situatieschets", label: "Hypotheek-situatieschets (PDF)" },
  { href: "/hypotheek", label: "Max. hypotheek — rekenhulp" },
];

const infoLinks = [
  { href: "/#hoe-het-werkt", label: "Hoe het werkt" },
  { href: "/gids", label: "Hypotheekgids" },
  { href: "/#hypotheek-pdf", label: "Wat zit in de hypotheek-PDF?" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/voorwaarden", label: "Voorwaarden" },
  { href: "/cookies", label: "Cookiebeleid" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Klaar<span className="text-primary"> voor </span>advies
            </p>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Voorbereiding op je hypotheek — PDF en rekenhulp vóór je adviseur.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Hypotheek
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-foreground/90 underline-offset-4 hover:text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Informatie
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {infoLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-foreground/90 underline-offset-4 hover:text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Juridisch
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-foreground/90 underline-offset-4 hover:text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsTrigger />
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-text-muted">
              Klaar voor advies is geen hypotheekadviseur en valt niet onder AFM-toezicht. De
              hypotheek-situatieschets is uitsluitend bedoeld als voorbereiding. Raadpleeg altijd
              een erkend hypotheek- of financieel adviseur.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border-soft pt-8 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Klaar voor advies</p>
            <p>
              Website door{" "}
              <a
                href="https://2xgen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground/90 underline-offset-2 hover:underline"
              >
                2xGen
              </a>{" "}
              ·{" "}
              <a href="mailto:matthijs@2xgen.com" className="font-medium text-foreground/90 underline-offset-2 hover:underline">
                matthijs@2xgen.com
              </a>
            </p>
          </div>
          <p className="max-w-xl sm:text-right">Geen financieel advies — voorbereidingstool.</p>
        </div>
      </div>
    </footer>
  );
}
