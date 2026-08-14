export type HypotheekTopicFaq = { q: string; a: string };

export type HypotheekTopic = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: HypotheekTopicFaq[];
  gidsHref?: string;
  gidsLabel?: string;
};

export const HYPOTHEEK_TOPICS: HypotheekTopic[] = [
  {
    slug: "hypotheek-met-studieschuld",
    title: "Hypotheek berekenen met studieschuld",
    description:
      "Bereken hoeveel hypotheek je kunt krijgen met een studieschuld. DUO-schuld telt mee, maar niet euro voor euro. Gratis indicatie, daarna een hypotheekoverzicht.",
    eyebrow: "Studieschuld",
    h1: "Hypotheek berekenen met studieschuld",
    intro:
      "Heb je een DUO-schuld? Vul hem in de rekenhulp in. Je ziet direct hoe dat je maximale hypotheek ongeveer beïnvloedt — daarna kun je je volledige situatie op één PDF zetten.",
    sections: [
      {
        heading: "Hoe zwaar telt een studieschuld mee?",
        paragraphs: [
          "Een studieschuld verlaagt je maximale hypotheek, maar niet euro voor euro. Banken rekenen met een fictieve maandlast: een percentage van de oorspronkelijke DUO-schuld, niet alleen van wat je nu nog open hebt staan.",
          "In deze rekenhulp gebruiken we de gangbare weging: 0,35% per maand voor een studieschuld vanaf september 2015, en 0,65% voor oudere schulden. Een erkend adviseur toetst dit later met de actuele normen van de geldverstrekker.",
        ],
      },
      {
        heading: "Voorbeeld",
        paragraphs: [
          "Stel: je hebt €25.000 studieschuld (na 2015). De fictieve maandlast is ongeveer €87,50. Die last drukt je maximale hypotheek met ruwweg €10.000 tot €15.000 — afhankelijk van rente en inkomen. Precies hoeveel, zie je in de rekenhulp hierboven.",
          "Heb je ook een partner met een studieschuld? Dan tellen beide schulden mee in een gezamenlijke aanvraag.",
        ],
      },
      {
        heading: "Van indicatie naar overzicht",
        paragraphs: [
          "De rekenhulp is een startpunt. In je hypotheekoverzicht zet je oorspronkelijk bedrag, restschuld en andere lasten naast je inkomen. Daarna kun je het vrijblijvend laten bekijken door een erkend hypotheekadviseur.",
        ],
      },
    ],
    faqs: [
      {
        q: "Telt mijn restschuld of het oorspronkelijke bedrag?",
        a: "Voor de toets rekenen banken meestal met de oorspronkelijke hoofdsom bij DUO, niet alleen met wat je nu nog open hebt. Vul daarom het oorspronkelijke bedrag in.",
      },
      {
        q: "Verdwijnt studieschuld uit de toets als ik klaar ben met aflossen?",
        a: "Als de schuld weg is en je dat kunt aantonen, hoort die niet meer in de toets. Tot die tijd telt hij mee.",
      },
      {
        q: "Telt de studieschuld van mijn partner ook?",
        a: "Bij een gezamenlijke hypotheekaanvraag worden schulden van beide aanvragers meegenomen. Maak daarom één overzicht met beide situaties.",
      },
    ],
    gidsHref: "/gids/studieschuld-en-hypotheek",
    gidsLabel: "Uitleg: studieschuld en je leencapaciteit",
  },
  {
    slug: "hypotheek-met-lening",
    title: "Hypotheek berekenen met een lening of schuld",
    description:
      "Bereken je maximale hypotheek als je een persoonlijke lening, private lease, creditcard of andere schuld hebt. Gratis indicatie plus hypotheekoverzicht.",
    eyebrow: "Lening of schuld",
    h1: "Hypotheek berekenen met een lening",
    intro:
      "Een persoonlijke lening, private lease of creditcard verlaagt je leenruimte. Vul je maandlasten in en zie direct een eerste indicatie — daarna je volledige situatie op één overzicht.",
    sections: [
      {
        heading: "Welke schulden tellen mee?",
        paragraphs: [
          "Voor een hypotheek kijken geldverstrekkers naar lopende verplichtingen: persoonlijke lening, doorlopend krediet, private lease, creditcardlimiet en alimentatie. Die lasten gaan van je leenruimte af, omdat de bank wil zien dat je de hypotheek naast bestaande verplichtingen kunt dragen.",
          "BKR-registraties zijn daarbij relevant: niet elke registratie is een afwijzing, maar ze horen wel in je dossier. Zet ze in je hypotheekoverzicht, ook als je denkt dat ze ‘klein’ zijn.",
        ],
      },
      {
        heading: "Lening versus studieschuld",
        paragraphs: [
          "Een consumptieve lening weegt vaak zwaarder dan een studieschuld. Bij een persoonlijke lening rekenen banken vaak met een vast percentage van de openstaande schuld per maand. Private lease telt als maandlast. Studieschuld heeft een eigen, lagere weging.",
          "Heb je beide? Vul ze allebei in. Alleen inkomen rekenen geeft dan een te rooskleurig beeld.",
        ],
      },
      {
        heading: "Wat je nu kunt doen",
        paragraphs: [
          "Gebruik de rekenhulp voor een richting. Zet daarna lening, lease, creditcard en overige lasten in je hypotheekoverzicht. Een erkend adviseur kan dan beoordelen wat dit voor jouw maximale hypotheek betekent — en of aflossen vóór de aanvraag zin heeft.",
        ],
      },
    ],
    faqs: [
      {
        q: "Telt private lease mee voor mijn hypotheek?",
        a: "Ja, private lease is een financiële verplichting en drukt je leenruimte. Vul de maandlast in de rekenhulp in.",
      },
      {
        q: "Moet ik een lening eerst aflossen?",
        a: "Dat hangt af van rente, restschuld en timing. Soms scheelt aflossen duizenden euro’s leenruimte, soms niet. Laat dat doorrekenen voordat je extra aflost.",
      },
      {
        q: "Ziet de bank mijn BKR-registratie altijd?",
        a: "Geldverstrekkers toetsen BKR. Een registratie betekent niet automatisch een nee, maar verzwijgen is geen optie. Zet alles in je overzicht.",
      },
    ],
  },
  {
    slug: "hypotheek-met-partner",
    title: "Hypotheek berekenen met partner",
    description:
      "Bereken jullie maximale hypotheek met twee inkomens. Het tweede inkomen telt mee, maar niet altijd voor 100%. Gratis rekenhulp en gezamenlijk hypotheekoverzicht.",
    eyebrow: "Samen kopen",
    h1: "Hypotheek berekenen met partner",
    intro:
      "Twee inkomens geven meer ruimte, maar het tweede inkomen telt niet altijd volledig mee. Vul beide bruto jaarinkomens in voor een eerste indicatie — daarna één gezamenlijk overzicht.",
    sections: [
      {
        heading: "Hoe telt het tweede inkomen mee?",
        paragraphs: [
          "Bij een aanvraag met partner kijken banken naar het gezamenlijke inkomen. In de gangbare toets telt het laagste inkomen vaak voor 90% mee. Contractvorm, proeftijd en variabel inkomen maken verschil.",
          "Ook schulden worden samengevoegd: studieschuld, lening of lease van jullie allebei drukken de gezamenlijke leenruimte.",
        ],
      },
      {
        heading: "Eén overzicht, twee situaties",
        paragraphs: [
          "Een losse berekening per persoon zegt weinig. Zet beide inkomens, contracten, schulden en spaargeld in één hypotheekoverzicht. Dan zien jullie — en later een adviseur — hetzelfde plaatje.",
        ],
      },
      {
        heading: "Samen kopen: wat je verder nodig hebt",
        paragraphs: [
          "Naast inkomen telt eigen geld voor kosten koper. Bij een woning van €350.000 is dat al snel €18.000–€21.000. NHG kan tot de grens van 2026 een lagere rente geven als de woning jullie hoofdverblijf wordt.",
        ],
      },
    ],
    faqs: [
      {
        q: "Telt het inkomen van mijn partner voor 100% mee?",
        a: "Niet altijd. In veel toetsen telt het laagste inkomen voor ongeveer 90% mee. De rekenhulp geeft een richting; je adviseur rekent de exacte norm.",
      },
      {
        q: "Moeten we allebei eigenaar worden?",
        a: "Dat is een juridische en fiscale keuze, geen rekenhulp-vraag. Bespreek het in het hypotheekgesprek, samen met hoe jullie inkomens en schulden in de aanvraag staan.",
      },
      {
        q: "Wat als één van ons zzp’er is?",
        a: "Dan gelden extra eisen voor dat inkomen, vaak meerdere jaarcijfers. Maak het overzicht compleet en laat het beoordelen — een standaard LTI-som is dan te grof.",
      },
    ],
  },
  {
    slug: "hypotheek-als-zzper",
    title: "Hypotheek berekenen als zzp’er",
    description:
      "Bereken je maximale hypotheek als ondernemer of zzp’er. Banken kijken naar jaarcijfers, niet alleen naar je laatste factuur. Gratis indicatie plus hypotheekoverzicht.",
    eyebrow: "ZZP / ondernemer",
    h1: "Hypotheek berekenen als zzp’er",
    intro:
      "Als ondernemer telt niet je laatste goede maand, maar een langer inkomensbeeld. Gebruik de rekenhulp voor een eerste richting met je gemiddelde jaarinkomen — daarna je cijfers op één overzicht.",
    sections: [
      {
        heading: "Hoe kijken banken naar zzp-inkomen?",
        paragraphs: [
          "Voor een vast contract rekenen banken met je bruto jaarsalaris. Als zzp’er of dga kijken ze meestal naar de winst over meerdere jaren — vaak drie — en naar hoe stabiel die is. Een piekjaar telt minder zwaar dan een gelijkmatig beeld.",
          "Vul in de rekenhulp daarom een realistisch gemiddelde in, niet je beste jaar. Anders wordt de indicatie te hoog.",
        ],
      },
      {
        heading: "Wat je nodig hebt voor het gesprek",
        paragraphs: [
          "Jaarstukken, aangiften, een overzicht van omzet en kosten, en vaak een recente prognose. Dat verschilt per geldverstrekker. In je hypotheekoverzicht zet je alvast inkomen, schulden, spaargeld en je woondoeel — dan is het gesprek geen speurtocht naar losse pdf’s.",
        ],
      },
      {
        heading: "ZZP en hypotheek: eerst overzicht, dan beoordeling",
        paragraphs: [
          "Online rekenhulpen zijn grof voor ondernemersinkomen. De waarde zit in het overzicht plus iemand die jouw jaarcijfers tegen bankbeleid kan leggen. Dat is precies de stap na de PDF: vrijblijvend laten bekijken door een erkend hypotheekadviseur.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan ik als zzp’er überhaupt een hypotheek krijgen?",
        a: "Ja, dat kan. Bankbeleid vraagt meestal meer bewijs dan bij een vast contract: jaarcijfers en bestendigheid van inkomen. Een indicatie op deze pagina is het begin, geen toezegging.",
      },
      {
        q: "Hoeveel jaren cijfers heb ik nodig?",
        a: "Vaak drie, soms twee bij een sterk dossier. Wat jouw bank accepteert, beoordeelt een adviseur aan de hand van je stukken.",
      },
      {
        q: "Telt een partner in loondienst extra zwaar?",
        a: "Een vast tweede inkomen kan het dossier steviger maken. Vul beide inkomens in en maak één overzicht — dan zie je de combinatie, niet twee losse sommen.",
      },
    ],
  },
];

export function getHypotheekTopic(slug: string): HypotheekTopic | undefined {
  return HYPOTHEEK_TOPICS.find((t) => t.slug === slug);
}

export function hypotheekTopicFaqJsonLd(topic: HypotheekTopic) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export const HYPOTHEEK_TOPIC_NAV = [
  { href: "/hypotheek", label: "Maximale hypotheek" },
  ...HYPOTHEEK_TOPICS.map((t) => ({ href: `/${t.slug}`, label: t.eyebrow })),
];
