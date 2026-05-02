import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GidsFaq } from "@/components/GidsFaq";
import { GidsHero } from "@/components/GidsHero";
import { MotionSection } from "@/components/MotionSection";
import { gidsFaqJsonLd } from "@/lib/gidsFaq";
import {
  GIDS_CATEGORY_SECTION,
  type HypotheekGidsCategory,
  HYPOTHEEK_GIDSEN,
} from "@/lib/hypotheekGidsen";

export const metadata: Metadata = {
  title: "Hypotheekgids — begrijp het voordat je tekent",
  description:
    "Gratis uitleg over hypotheken in gewone taal: basis, je gesprek voorbereiden, studieschuld en NHG. Geen hypotheekadvies — combineer met je situatieschets en rekenhulp.",
  alternates: { canonical: "/gids" },
  keywords: [
    "hypotheekgids",
    "hypotheek uitleg",
    "wat is een hypotheek",
    "hypotheek voorbereiden",
    "hypotheek documenten",
    "studieschuld hypotheek",
    "NHG uitleg",
    "geen hypotheekadvies",
    "situatieschets hypotheek",
    "Klaar voor advies",
  ],
  openGraph: {
    title: "Hypotheekgids — Klaar voor advies",
    description:
      "Begrijp hypotheekbegrippen vóór je tekent. Geen verkoop, geen persoonlijk advies — wél duidelijkheid voor je gesprek met een erkend adviseur.",
  },
};

function groupByCategory(items: typeof HYPOTHEEK_GIDSEN): Record<HypotheekGidsCategory, typeof HYPOTHEEK_GIDSEN> {
  const acc: Record<HypotheekGidsCategory, typeof HYPOTHEEK_GIDSEN> = {
    basis: [],
    voorbereiding: [],
    regelingen: [],
  };
  for (const g of items) {
    acc[g.category].push(g);
  }
  return acc;
}

export default function GidsHubPage() {
  const grouped = groupByCategory(HYPOTHEEK_GIDSEN);
  const categories = (Object.keys(GIDS_CATEGORY_SECTION) as HypotheekGidsCategory[]).filter(
    (cat) => grouped[cat].length > 0,
  );
  const faqJsonLd = gidsFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="bg-background">
        <GidsHero />

        <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-12">
          <div id="gids-onderwerpen" className="scroll-mt-24 space-y-14">
            {categories.map((cat, idx) => {
              const list = grouped[cat];
              const section = GIDS_CATEGORY_SECTION[cat];
              return (
                <MotionSection key={cat} delay={idx * 0.05}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary/90">
                    {section.eyebrow}
                  </p>
                  <h2 className="font-display mt-1 text-xl text-foreground sm:text-2xl">
                    {section.heading}
                  </h2>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((g) => (
                      <li key={g.slug}>
                        {g.published ? (
                          <Link
                            href={`/gids/${g.slug}`}
                            className="group block h-full overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                          >
                            {g.coverImage ? (
                              <div className="relative aspect-[5/3] w-full overflow-hidden bg-surface-muted">
                                <Image
                                  src={g.coverImage}
                                  alt=""
                                  fill
                                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                              </div>
                            ) : null}
                            <div className="p-5">
                              <GidsCardInner g={g} showBadge={false} />
                            </div>
                          </Link>
                        ) : (
                          <div className="h-full rounded-2xl border border-dashed border-border-soft bg-surface-muted/60 p-5">
                            <GidsCardInner g={g} showBadge />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </MotionSection>
              );
            })}
          </div>

          <MotionSection className="mx-auto mt-14 max-w-3xl" delay={0.04}>
            <details className="group rounded-2xl border border-border-soft bg-surface px-5 py-4 shadow-sm open:bg-surface sm:px-6 sm:py-5">
              <summary className="cursor-pointer list-none font-display text-lg font-normal text-foreground [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-3">
                  Over deze gids
                  <span className="text-xs font-sans font-semibold uppercase tracking-wide text-primary group-open:rotate-180">
                    ▼
                  </span>
                </span>
              </summary>
              <div
                id="over-de-hypotheekgids"
                className="scroll-mt-24 mt-4 space-y-3 border-t border-border-soft/70 pt-4 text-sm leading-relaxed text-text-muted sm:text-base"
              >
                <p>
                  Deze gids is een groeiende verzameling artikelen over hypotheken in Nederland.
                  Geen productaanbevelingen, geen verkooppraatjes — alleen uitleg die je helpt om
                  straks beter voorbereid bij een erkend adviseur te zitten.
                </p>
                <p>
                  <strong className="font-display font-semibold text-foreground">KlaarVoorAdvies</strong>{" "}
                  is geen
                  hypotheekadviseur en valt niet onder AFM-toezicht. Alles wat je hier leest is
                  algemene informatie. Voor een persoonlijke offerte, exacte leencapaciteit of
                  productadvies heb je altijd een erkend adviseur nodig.
                </p>
              </div>
            </details>
          </MotionSection>
        </div>

        <GidsFaq />

        <section className="border-t border-border-soft/80 bg-warm-glow/40 py-14 sm:py-16">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
            <h2 className="font-display text-2xl font-normal text-foreground sm:text-3xl">
              Klaar om te beginnen?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
              Gebruik de gids als achtergrond — en de situatieschets als je concrete voorbereiding.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/situatieschets"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-deep"
              >
                Maak mijn situatieschets
              </Link>
              <Link
                href="/hypotheek"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-primary bg-transparent px-8 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                Open de rekenhulp
              </Link>
            </div>
            <p className="mt-8 text-xs leading-relaxed text-text-muted">
              Geen financieel advies. Geen verplichtingen. Gewoon duidelijkheid.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

function GidsCardInner({
  g,
  showBadge,
}: {
  g: (typeof HYPOTHEEK_GIDSEN)[number];
  showBadge: boolean;
}) {
  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <h3 className="font-display text-lg leading-snug text-foreground">{g.title}</h3>
        {showBadge && (
          <span className="shrink-0 self-start rounded-md bg-accent/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground">
            Binnenkort
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{g.description}</p>
    </>
  );
}
