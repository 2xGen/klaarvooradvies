import Link from "next/link";
import { AdviserCta } from "@/components/AdviserCta";
import { MaxHypotheekCalculator } from "@/components/MaxHypotheekCalculator";
import { MotionSection } from "@/components/MotionSection";
import {
  HYPOTHEEK_TOPIC_NAV,
  hypotheekTopicFaqJsonLd,
  type HypotheekTopic,
} from "@/lib/hypotheekTopicPages";

export function HypotheekTopicPage({ topic }: { topic: HypotheekTopic }) {
  const faqJsonLd = hypotheekTopicFaqJsonLd(topic);
  const siblings = HYPOTHEEK_TOPIC_NAV.filter((l) => l.href !== `/${topic.slug}`);

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
              {topic.eyebrow}
            </p>
            <h1 className="font-display mt-3 text-center text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
              {topic.h1}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-text-muted">
              {topic.intro}
            </p>
          </MotionSection>

          <div id="rekenmodule" className="mt-10 scroll-mt-24">
            <MaxHypotheekCalculator />
          </div>
        </div>

        <article className="border-t border-border-soft/80 bg-surface-muted/25">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            {topic.sections.map((section, i) => (
              <section
                key={section.heading}
                className={i < topic.sections.length - 1 ? "border-b border-border-soft/60 pb-12" : ""}
              >
                <h2
                  className={`font-display text-2xl font-normal text-foreground sm:text-3xl ${i > 0 ? "mt-12" : ""}`}
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-text-muted">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-12 flex flex-wrap gap-3">
              <Link
                href="/situatieschets"
                className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-deep"
              >
                Maak mijn gratis hypotheekoverzicht
              </Link>
              {topic.gidsHref ? (
                <Link
                  href={topic.gidsHref}
                  className="inline-flex rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary"
                >
                  {topic.gidsLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </article>

        <AdviserCta />

        <section className="border-t border-border-soft/80 bg-background py-12 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-center text-2xl font-normal text-foreground">
              Andere situaties
            </h2>
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {siblings.map((l) => (
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

        <section className="border-t border-border-soft/80 bg-surface py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-center text-2xl font-normal text-foreground sm:text-3xl">
              Veelgestelde vragen
            </h2>
            <div className="mt-10 space-y-6">
              {topic.faqs.map((item) => (
                <div key={item.q}>
                  <h3 className="text-base font-semibold text-foreground">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
