import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GidsContentBlocks } from "@/components/GidsContentBlocks";
import { MotionSection } from "@/components/MotionSection";
import {
  collectH2FromBlocks,
  extractFaqFromBlocks,
  normalizeGidsArticleBlocks,
} from "@/lib/gidsArticleBlocks";
import {
  GIDS_CATEGORY_SECTION,
  getHypotheekGidsBySlug,
  getPublishedHypotheekGidsen,
} from "@/lib/hypotheekGidsen";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getPublishedHypotheekGidsen().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getHypotheekGidsBySlug(slug);
  if (!g?.published) {
    return { title: "Gids" };
  }
  const ogImages = g.coverImage ? [{ url: g.coverImage, alt: g.title }] : undefined;
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/gids/${slug}` },
    openGraph: {
      title: g.title,
      description: g.description,
      type: "article",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: g.title,
      description: g.description,
      images: g.coverImage ? [g.coverImage] : undefined,
    },
  };
}

function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export default async function GidsArticlePage({ params }: Props) {
  const { slug } = await params;
  const g = getHypotheekGidsBySlug(slug);
  const blocks = g ? normalizeGidsArticleBlocks(g) : [];
  if (!g?.published || !blocks.length) {
    notFound();
  }

  const toc = collectH2FromBlocks(blocks);
  const faqItems = extractFaqFromBlocks(blocks);
  const structuredFaq = faqItems?.length ? faqJsonLd(faqItems) : null;

  return (
    <>
      {structuredFaq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredFaq) }}
        />
      ) : null}

      <main className="bg-background pb-16 sm:pb-24">
        <div className="relative overflow-hidden border-b border-border-soft/80 bg-warm-glow/35">
          <div className="pointer-events-none absolute inset-0 bg-grain opacity-60" />
          <div className="relative mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-14">
            <Link
              href="/gids"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Alle gidsen
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-primary">
              {GIDS_CATEGORY_SECTION[g.category].eyebrow}
            </p>
            <h1 className="font-display mt-2 text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
              {g.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
              {g.description}
            </p>
          </div>

          {g.coverImage ? (
            <div className="relative mx-auto mt-10 w-full max-w-7xl px-4 sm:mt-12 sm:px-6">
              <Image
                src={g.coverImage}
                alt={g.title}
                width={2400}
                height={1200}
                className="h-auto w-full rounded-2xl border border-border-soft/90 bg-surface-muted shadow-md"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          ) : null}

          <div className="relative mx-auto max-w-3xl px-4 pb-10 sm:px-6 sm:pb-12">
            {toc.length > 1 ? (
              <nav
                aria-label="Op deze pagina"
                className="mt-8 rounded-2xl border border-border-soft/90 bg-surface/90 p-4 shadow-sm backdrop-blur-sm sm:p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Op deze pagina
                </p>
                <ol className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="font-medium text-primary underline-offset-2 hover:underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
          </div>
        </div>

        <MotionSection className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-12">
          <article className="border-b border-border-soft/70 pb-12">
            <GidsContentBlocks blocks={blocks} />
          </article>
        </MotionSection>

        <MotionSection className="mx-auto max-w-3xl px-4 sm:px-6" delay={0.05}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/hypotheek"
              className="group flex flex-col rounded-2xl border border-border-soft bg-surface p-5 shadow-sm transition hover:border-primary/35 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                Rekenhulp
              </span>
              <span className="mt-2 font-display text-lg text-foreground">
                Maximale hypotheek berekenen
              </span>
              <span className="mt-2 text-sm leading-relaxed text-text-muted">
                Snel een richting op basis van inkomen en schulden.
              </span>
              <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                Open rekenhulp →
              </span>
            </Link>
            <Link
              href="/situatieschets"
              className="group flex flex-col rounded-2xl border border-border-soft bg-surface p-5 shadow-sm transition hover:border-primary/35 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                Voorbereiding
              </span>
              <span className="mt-2 font-display text-lg text-foreground">
                Situatieschets (PDF)
              </span>
              <span className="mt-2 text-sm leading-relaxed text-text-muted">
                Zet je cijfers op papier voor het gesprek met een adviseur.
              </span>
              <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">
                Start situatieschets →
              </span>
            </Link>
          </div>
        </MotionSection>

        <MotionSection
          className="mx-auto mt-12 max-w-3xl px-4 sm:px-6"
          delay={0.08}
        >
          <div className="rounded-2xl border border-border-soft bg-surface-muted/30 p-6 text-sm leading-relaxed text-text-muted">
            <p>
              <strong className="font-medium text-foreground">Let op:</strong> dit artikel is
              algemene informatie en geen persoonlijk hypotheekadvies. Voor jouw situatie schakel je
              een erkend hypotheek- of financieel adviseur in.
            </p>
          </div>
        </MotionSection>
      </main>
    </>
  );
}
