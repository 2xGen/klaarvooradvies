import type { GidsContentBlock } from "@/lib/gidsArticleBlocks";
import { gidsHeadingAnchor } from "@/lib/gidsArticleBlocks";

function blockTopMargin(blocks: GidsContentBlock[], index: number): string {
  if (index === 0) return "";
  const prev = blocks[index - 1]!;
  const cur = blocks[index]!;
  if (cur.type === "p" && prev.type === "p") return "mt-4";
  if (cur.type === "ul" && (prev.type === "p" || prev.type === "h3")) return "mt-4";
  if (cur.type === "p" && prev.type === "ul") return "mt-4";
  if (cur.type === "h3") return "mt-8";
  if (cur.type === "callout") return "mt-8";
  if ((cur.type === "cards" || cur.type === "faq") && prev.type === "h2") return "mt-6";
  if (cur.type === "faq" && prev.type === "h2") return "mt-6";
  return "mt-10 sm:mt-12";
}

function calloutClasses(variant: NonNullable<Extract<GidsContentBlock, { type: "callout" }>["variant"]>) {
  switch (variant) {
    case "accent":
      return "border-accent/35 bg-accent-soft/50";
    case "muted":
      return "border-border-soft bg-surface-muted/40";
    default:
      return "border-border-soft bg-surface";
  }
}

export function GidsContentBlocks({ blocks }: { blocks: GidsContentBlock[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        const gap = blockTopMargin(blocks, i);
        switch (block.type) {
          case "lead":
            return (
              <p
                key={i}
                className={`${gap} text-lg font-medium leading-relaxed text-foreground sm:text-xl sm:leading-relaxed`}
              >
                {block.text}
              </p>
            );
          case "h2": {
            const id = block.id ?? gidsHeadingAnchor(block.text);
            return (
              <h2
                key={i}
                id={id}
                className={`${gap} scroll-mt-28 font-display text-2xl font-normal text-foreground sm:text-3xl`}
              >
                {block.text}
              </h2>
            );
          }
          case "h3":
            return (
              <h3
                key={i}
                className={`${gap} font-display text-xl font-normal text-foreground sm:text-2xl`}
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className={`${gap} text-base leading-relaxed text-text-muted`}>
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul
                key={i}
                className={`${gap} list-disc space-y-2.5 pl-5 text-base leading-relaxed text-text-muted marker:text-primary`}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "cards":
            return (
              <ul key={i} className={`${gap} grid gap-4 sm:grid-cols-2`}>
                {block.items.map((card, j) => (
                  <li
                    key={j}
                    className="flex flex-col rounded-2xl border border-border-soft bg-surface p-5 shadow-sm transition hover:border-primary/25"
                  >
                    <span className="font-display text-lg text-foreground">{card.title}</span>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{card.body}</p>
                  </li>
                ))}
              </ul>
            );
          case "callout": {
            const v = block.variant ?? "neutral";
            return (
              <aside
                key={i}
                className={`${gap} rounded-2xl border p-5 sm:p-6 ${calloutClasses(v)}`}
              >
                {block.title ? (
                  <p className="text-sm font-semibold text-foreground">{block.title}</p>
                ) : null}
                <p
                  className={`text-sm leading-relaxed text-text-muted ${block.title ? "mt-2" : ""}`}
                >
                  {block.body}
                </p>
              </aside>
            );
          }
          case "faq":
            return (
              <div key={i} className={`${gap} space-y-3`}>
                {block.items.map((item, j) => (
                  <details
                    key={j}
                    className="group overflow-hidden rounded-2xl border border-border-soft/80 bg-background/90 shadow-sm open:bg-surface"
                  >
                    <summary className="cursor-pointer list-none px-4 py-4 text-left text-sm font-semibold text-foreground transition hover:bg-surface-muted/40 sm:px-5 sm:text-base [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-3">
                        {item.q}
                        <span className="text-xs font-sans font-semibold uppercase tracking-wide text-primary group-open:rotate-180">
                          ▼
                        </span>
                      </span>
                    </summary>
                    <div className="border-t border-border-soft/60 px-4 pb-4 pt-1 sm:px-5 sm:pb-5">
                      <p className="text-sm leading-relaxed text-text-muted">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
