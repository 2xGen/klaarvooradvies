/** Structured article blocks for `/gids/[slug]` — richer than plain `body[]`. */

export type GidsContentBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; id?: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cards"; items: { title: string; body: string }[] }
  | {
      type: "callout";
      title?: string;
      body: string;
      variant?: "neutral" | "accent" | "muted";
    }
  | { type: "faq"; items: { q: string; a: string }[] };

/** Stable anchor ids for TOC / deep links (NL headings). */
export function gidsHeadingAnchor(text: string): string {
  const base = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "sectie";
}

export function collectH2FromBlocks(blocks: GidsContentBlock[]): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  for (const b of blocks) {
    if (b.type === "h2") {
      const id = b.id ?? gidsHeadingAnchor(b.text);
      out.push({ id, text: b.text });
    }
  }
  return out;
}

export function extractFaqFromBlocks(
  blocks: GidsContentBlock[],
): { q: string; a: string }[] | undefined {
  const faq = blocks.find((b): b is Extract<GidsContentBlock, { type: "faq" }> => b.type === "faq");
  return faq?.items;
}

export function normalizeGidsArticleBlocks(g: {
  body?: string[];
  blocks?: GidsContentBlock[];
}): GidsContentBlock[] {
  if (g.blocks?.length) return g.blocks;
  if (g.body?.length) return g.body.map((text) => ({ type: "p" as const, text }));
  return [];
}
