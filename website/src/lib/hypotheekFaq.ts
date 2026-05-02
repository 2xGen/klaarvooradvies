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
    a: "Nee. Klaar voor advies is een voorbereidingstool. Wij zijn geen adviseur en vallen niet onder AFM-toezicht. Raadpleeg altijd een erkend financieel adviseur voor bindende beslissingen.",
  },
  {
    q: "Hoe ga ik beter voorbereid naar een adviseur?",
    a: "Maak je situatieschets — een PDF met jouw cijfers die je meeneemt naar het gesprek. Dat is precies waarvoor Klaar voor advies is gebouwd.",
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
