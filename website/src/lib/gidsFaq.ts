/** Gids-pagina FAQ — zelfde items voor UI + JSON-LD. */
export const GIDS_FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Is dit hetzelfde als hypotheekadvies?",
    a: "Nee. Alles hier is algemene informatie — bedoeld om begrippen en stappen te verduidelijken. Geen productaanbeveling, geen persoonlijke berekening. Voor een offerte of bindende beslissing heb je een erkend adviseur nodig.",
  },
  {
    q: "Is KlaarVoorAdvies een adviseur of onder AFM-toezicht?",
    a: "Nee. KlaarVoorAdvies is een voorbereidingstool. We zijn geen tussenpersoon en geen vergunningsplichtig advieskantoor.",
  },
  {
    q: "Hoe past deze gids bij de situatieschets?",
    a: "De gids geeft context — wat termen betekenen en hoe het proces werkt. De situatieschets zet jouw eigen cijfers op papier. Samen zorgen ze dat je goed voorbereid een adviseursgesprek ingaat.",
  },
  {
    q: 'Waarom staat er nog "Binnenkort" bij sommige onderwerpen?',
    a: "We werken de artikelen stap voor stap uit zodat de informatie klopt en actueel is. Liever dat dan snel iets publiceren dat niet deugt.",
  },
  {
    q: "Kloppen NHG-grenzen en regels altijd voor mijn situatie?",
    a: "We updaten de informatie regelmatig, maar regels veranderen. Controleer altijd bij een erkend adviseur of de situatie op jou van toepassing is.",
  },
  {
    q: "Worden mijn gegevens gebruikt als ik alleen de gids lees?",
    a: "Nee. Lezen is anoniem. Alleen als je de situatieschets invult of contact opneemt, verzamelen we contactgegevens.",
  },
  {
    q: "Ik wil nu al persoonlijk advies. Waar ga ik naartoe?",
    a: "Zoek een erkend hypotheekadviseur via het AFM-register op afm.nl. Maak eerst je situatieschets aan — dan loop je beter voorbereid dat gesprek in.",
  },
];

export function gidsFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GIDS_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
