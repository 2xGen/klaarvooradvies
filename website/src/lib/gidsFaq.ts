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
    q: "Hoe past deze gids bij het hypotheekoverzicht?",
    a: "De gids legt begrippen uit. Het hypotheekoverzicht zet jouw cijfers op papier. Samen zorg je dat je weet waar je staat voordat je een gesprek ingaat.",
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
    a: "Maak eerst je hypotheekoverzicht. Aan het einde kun je vrijblijvend aangeven dat een erkend adviseur mag meekijken — binnen één werkdag reactie, zonder verplichting.",
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
