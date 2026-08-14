/** Rekenhulp-pagina FAQ — UI + JSON-LD (Google rich results). */
export const HYPOTHEEK_FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Is de uitkomst mijn officiële maximale hypotheek?",
    a: "Nee. Dit is een indicatie op basis van gangbare vuistregels. Banken gebruiken eigen modellen en beleid. Je krijgt hier geen offerte en geen garantie.",
  },
  {
    q: "Waarom wijkt mijn uitkomst af van wat de bank zei?",
    a: "Banken gebruiken exacte toetsnormen, energielabels, contractvormen en interne acceptatiecriteria. Deze rekenhulp gebruikt een vereenvoudigd model. Zie het als een startpunt, niet als eindoordeel.",
  },
  {
    q: "Telt NHG automatisch mee?",
    a: "De rekenhulp toont een NHG-check op basis van je invoer. Of je er daadwerkelijk voor in aanmerking komt beoordeelt je adviseur — NHG heeft aanvullende voorwaarden.",
  },
  {
    q: "Zitten kosten koper in de maximale hypotheek?",
    a: "Nee. Je kunt maximaal 100% van de woningwaarde lenen. Kosten koper (5–6%) betaal je uit eigen geld.",
  },
  {
    q: "Is dit financieel advies?",
    a: "Nee. Dit is een rekenhulp om een eerste richting te zien. Bindende keuzes en offertes horen bij een erkend hypotheekadviseur.",
  },
  {
    q: "Hoe ga ik van deze berekening naar een gesprek?",
    a: "Maak je hypotheekoverzicht — een PDF met jouw cijfers. Aan het einde kun je vrijblijvend laten meekijken door een erkend adviseur.",
  },
];

export function hypotheekFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HYPOTHEEK_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
