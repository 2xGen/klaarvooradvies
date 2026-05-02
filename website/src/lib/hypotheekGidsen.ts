/** Toekomstige hypotheekgidsen — zet `published` op true en voeg `blocks` of `body` toe wanneer een artikel live gaat. */

import type { GidsContentBlock } from "./gidsArticleBlocks";

export type HypotheekGidsCategory = "basis" | "voorbereiding" | "regelingen";

export type HypotheekGidsMeta = {
  slug: string;
  title: string;
  description: string;
  category: HypotheekGidsCategory;
  /** Wanneer false: alleen op de hub, zonder detailpagina. */
  published: boolean;
  /** Featured / kaart / Open Graph-afbeelding (absolute URL). */
  coverImage?: string;
  /** Gestructureerde inhoud (aanbevolen). */
  blocks?: GidsContentBlock[];
  /** Eenvoudige alinea’s — alleen als `blocks` ontbreekt. */
  body?: string[];
};

/** Sectie-label (klein) + kop boven de kaarten. */
export const GIDS_CATEGORY_SECTION: Record<
  HypotheekGidsCategory,
  { eyebrow: string; heading: string }
> = {
  basis: { eyebrow: "Hypotheek basis", heading: "De basis" },
  voorbereiding: { eyebrow: "Voor je gesprek", heading: "Voor je hypotheekgesprek" },
  regelingen: { eyebrow: "Regelingen", heading: "Regelingen en bijzondere situaties" },
};

export const HYPOTHEEK_GIDSEN: HypotheekGidsMeta[] = [
  {
    slug: "wat-is-een-hypotheek",
    title: "Wat is een hypotheek?",
    description:
      "Lening, onderpand, rente en looptijd. Wat die woorden echt betekenen — en wat je tekent als je er één afsluit.",
    category: "basis",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/wat%20is%20een%20hypotheek.png",
    blocks: [
      {
        type: "lead",
        text: "Een hypotheek is een lening voor een woning: je leent geld, betaalt rente, en legt de woning als zekerheid vast. Zo ontstaat ruimte om te kopen wat je in één keer niet contant betaalt.",
      },
      {
        type: "h2",
        id: "vier-bouwstenen",
        text: "De vier bouwstenen",
      },
      {
        type: "cards",
        items: [
          {
            title: "Lening",
            body: "De bank of een andere geldverstrekker leent je een bedrag (de hoofdsom). Je lost dat volgens afspraak af — vaak maandelijks, verspreid over jaren.",
          },
          {
            title: "Onderpand",
            body: "Bijna altijd staat het huis waar je voor leent als onderpand: juridisch rust er een hypotheek op het pand ten gunste van de kredietgever.",
          },
          {
            title: "Rente",
            body: "Dat is het tarief voor het geleende geld. Hogere rente betekent meestal meer af aan rente over dezelfde looptijd — afhankelijk van hoe je aflost en wat je contract zegt.",
          },
          {
            title: "Looptijd",
            body: "Het aantal jaren waarin je de afspraak nakomt — bij hypotheken vaak twintig of dertig jaar. De looptijd hoort bij je maandlast en je totaal aan rente.",
          },
        ],
      },
      {
        type: "h2",
        id: "woning-als-zekerheid",
        text: "Waarom een woning als zekerheid?",
      },
      {
        type: "p",
        text: "De geldverstrekker wil weten dat ze bij wanbetaling het verkocht pand kunnen gebruiken om de schuld te dekken — daarom koppelt ze het recht aan het huis. Het pand blijft normaal gesproken van jou; het hypotheekrecht is een vordering die aan dat pand vastzit.",
      },
      {
        type: "ul",
        items: [
          "Betaal je structureel niet mee, dan kan na een lang juridisch traject gedwongen verkoop volgen om de schuld af te lossen.",
          "Daarom toetsen banken zowel de waarde van het pand als wat jij aan inkomen en schulden kunt dragen.",
        ],
      },
      {
        type: "h2",
        id: "hoofdsom-rente-looptijd",
        text: "Hoofdsom, rente en looptijd",
      },
      {
        type: "p",
        text: "Het geleende bedrag is de hoofdsom. Wat je maandelijks betaalt, hangt af van hoe je die hoofdsom terugbetaalt (bijvoorbeeld annuïtair of lineair), welke rente je afspreekt en hoe lang de looptijd is.",
      },
      {
        type: "p",
        text: "Een langere looptijd kan je maandlast drukken, maar je betaalt vaak meer rente in totaal omdat je langer leent. Wat voor jou past, hangt af van inkomen, spaargeld en hoeveel risico je wilt lopen — daar ga je met een adviseur door.",
      },
      {
        type: "h2",
        id: "renteperiode",
        text: "Renteperiode en contract",
      },
      {
        type: "p",
        text: "Rente en looptijd staan in je offerte en later in je contract. Daar staat ook of je rente vastzet voor een periode (bijvoorbeeld tien jaar) of een andere afspraak kiest. Na die periode heronderhandel je of sluit je een nieuwe renteperiode af — afhankelijk van wat je met de bank afspreekt.",
      },
      {
        type: "h2",
        id: "notaris",
        text: "Wat je bij de notaris tekent",
      },
      {
        type: "p",
        text: "In de praktijk horen twee stukken bij elkaar. De hypotheekakte legt vast dat er een hypotheek op het pand rust ten gunste van de geldverstrekker. Daarnaast teken je de lening: bedrag, rente, looptijd, incasso van de maandtermijn, voorwaarden bij verkoop of verhuizing — dat zijn bindende afspraken.",
      },
      {
        type: "callout",
        variant: "accent",
        title: "Even tijd nemen",
        body: "Lees offerte en notariële stukken rustig door of neem ze mee naar een adviseur. Wat je tekent, bepaalt jarenlang je verplichtingen.",
      },
      {
        type: "h2",
        id: "na-het-passeren",
        text: "Na het passeren",
      },
      {
        type: "p",
        text: "Je bent koper én hypotheeknemer: de woning is van jou (eventueel samen met iemand anders), maar de schuld loopt tot je volgens de afspraak hebt afgelost of herfinancierd. Verhuizen of bijlenen betekent opnieuw kijken naar waarde, inkomen en de regels in je contract.",
      },
      {
        type: "p",
        text: "Welke hoofdsom, rente en looptijd bij jou passen, rekent een erkend adviseur uit op jouw situatie — dit artikel beschrijft alleen de bouwstenen van het gesprek.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Is een hypotheek hetzelfde als een gewone lening?",
            a: "Nee. Bij een hypotheek hoort vrijwel altijd vastgoed als onderpand en leg je een hypotheek op de woning — dat recht van de bank op het pand ontbreekt bij een ‘losse’ consumptief krediet.",
          },
          {
            q: "Wat is het verschil tussen de hypotheekakte en de lening?",
            a: "De hypotheekakte zet het recht op het pand vast (hypotheek voor de bank). De lening beschrijft de financiële afspraken: bedrag, rente, looptijd en voorwaarden. Je hebt ze allebei nodig als je koopt met geleend geld.",
          },
          {
            q: "Waarom wil de bank weten wat het huis waard is?",
            a: "Omdat het pand de zekerheid is achter de lening. De bank wil inschatten of de waarde past bij het geleende bedrag en wat er gebeurt bij verkoop.",
          },
          {
            q: "Kan ik mijn hypotheek eerder aflossen of verhuizen?",
            a: "Dat kan vaak wel, maar je contract bepaalt de voorwaarden: boeterente, meeverhuizen, of opnieuw lenen. Je adviseur en je papieren geven het exacte antwoord voor jouw situatie.",
          },
        ],
      },
    ],
  },
  {
    slug: "verschil-hypotheekvormen",
    title: "Annuïtair, lineair of aflossingsvrij",
    description:
      "Drie manieren om een hypotheek terug te betalen. Hoe je maandlasten en restschuld in de loop van de tijd veranderen — en wat je wilt weten voordat je kiest.",
    category: "basis",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/Drie%20manieren%20om%20een%20hypotheek%20terug%20te%20betalen.png",
    blocks: [
      {
        type: "lead",
        text: "Bij annuïtair, lineair en aflossingsvrij gaat het om één vraag: hoeveel los je elke maand af — en hoe verandert je maandlast daardoor? Alle drie betaal je rente over wat je nog schuldig bent; het verschil zit in het aflossingspatroon en wat je aan het einde van de rit nog open hebt staan.",
      },
      {
        type: "h2",
        id: "drie-manieren",
        text: "Drie manieren in het kort",
      },
      {
        type: "cards",
        items: [
          {
            title: "Annuïtair",
            body: "Je betaalt elke maand hetzelfde totaalbedrag. In het begin zit daar relatief veel rente in en weinig aflossing; naarmate de schuld daalt, verschuift dat. Aan het einde van de looptijd is de schuld weg als je volgens plan hebt betaald.",
          },
          {
            title: "Lineair",
            body: "Je lost elke maand een vast bedrag aan hoofdsom af. Je rente daalt omdat je schuld krimpt, dus je totaal maandbedrag wordt in de loop van de tijd lager.",
          },
          {
            title: "Aflossingsvrij",
            body: "Je betaalt maandelijks vooral rente over de volledige schuld en lost in die periode niet of nauwelijks af — tenzij je vrijwillig bijstort. Aan het einde moet je de hoofdsom een keer terugbetalen (bijvoorbeeld uit verkoop of spaargeld).",
          },
        ],
      },
      {
        type: "h2",
        id: "annuiteit",
        text: "Annuïtair",
      },
      {
        type: "p",
        text: "Veel mensen kiezen annuïteit omdat de maandlast in het begin overzichtelijk blijft: één vast bedrag per maand. Je bouwt wel aflossing op, maar in de eerste jaren gaat een groot deel naar rente. Wil je weten hoe jouw totaal aan rente over de looptijd eruitziet, dan hoort dat bij de vergelijking die een adviseur voor je uitrekent.",
      },
      {
        type: "h2",
        id: "lineair",
        text: "Lineair",
      },
      {
        type: "p",
        text: "Lineair betalen voelt in de start vaak zwaarder: je maandtotaal start hoger omdat je meteen een vaste hap uit de hoofdsom neemt én rente betaalt over wat er nog openstaat. Daarna daalt je termijn, omdat de rentedeel krimpt. Op papier betaal je vaak minder rente in totaal dan bij een vergelijkbare annuïteitenhypotheek — het verdelingspatroon is anders.",
      },
      {
        type: "h2",
        id: "aflossingsvrij",
        text: "Aflossingsvrij",
      },
      {
        type: "p",
        text: "Aflossingsvrij geeft lage maandlasten zolang je niet aflost, maar de schuld blijft staan. Je moet later een strategie hebben voor de aflossing — bijvoorbeeld verkoop van de woning, beleggingen, erfenis of een andere reserve. Banken en adviseurs kijken scherp naar dat risico; het past niet bij elke situatie.",
      },
      {
        type: "callout",
        variant: "muted",
        title: "Fiscale en voorwaarden-aspecten",
        body: "Welke hypotheekvorm voor jou fiscaal interessant is of haalbaar binnen je inkomen, hangt van je dossier en het jaar af. Belastingregels wijzigen; een erkend adviseur legt uit wat voor jou geldt en wat je bank accepteert.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-hypotheekvormen",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Welke vorm kiest de meeste kopers?",
            a: "Annuïteit komt veel voor vanwege de vaste maandlast. Lineair en aflossingsvrij komen voor bij mensen die het maandpatroon of het risico bewust anders willen. Je adviseur vergelijkt scenario’s op jouw cijfers.",
          },
          {
            q: "Is aflossingsvrij ‘goedkoper’ per maand?",
            a: "Vaak wel in de maandtermijn, omdat je niet aflost. Maar de schuld blijft vol staan en je moet later alsnog aflossen of verkopen volgens plan. De totale kosten en risico’s zijn daardoor niet automatisch lager.",
          },
          {
            q: "Kan ik later van annuïtair naar lineair?",
            a: "Verandering van hypotheekvorm gaat via je geldverstrekker en voorwaarden in je contract — soms met kosten of een nieuwe renteafspraak. Vraag het na bij je adviseur als je situatie wijzigt.",
          },
        ],
      },
    ],
  },
  {
    slug: "documenten-hypotheekgesprek",
    title: "Welke documenten neem je mee?",
    description:
      "Van loonstrook tot koopcontract. Een concrete checklist zodat je niet terug hoeft voor iets dat thuis op de plank lag.",
    category: "voorbereiding",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/Voor%20je%20gesprek.png",
    blocks: [
      {
        type: "lead",
        text: "Een hypotheekaanvraag draait om aantoonbare feiten: inkomen, schulden, de woning en wie je bent. Wat je precies moet meesturen verschilt per bank en stadium — onderstaande lijst dekt wat je in veel gevallen nodig hebt. Mis je iets, dan volgt vaak vertraging.",
      },
      {
        type: "h2",
        id: "inkomen-werk",
        text: "Inkomen en werk",
      },
      {
        type: "ul",
        items: [
          "Recente loonstroken (vaak de laatste drie maanden) en jaaropgave(n).",
          "Contract of werkgeversverklaring als je werkgever dat standaard levert.",
          "Zzp: jaarstukken, omzetprognose en vaak meer jaarhistorie — jouw adviseur zegt wat je bank wil.",
          "Uitkeringen of andere inkomens: bewijsstukken van het uitkerende instantie.",
        ],
      },
      {
        type: "h2",
        id: "woning-koop",
        text: "Woning en koop",
      },
      {
        type: "ul",
        items: [
          "Koop-/voorlopig koopcontract of bod als je al verder bent in het proces.",
          "Kosten koper en financieringsplan op een rij (bedrag woning, eigen geld, gewenste hypotheek).",
          "Eventuele bouwdepot- of verbouwoffertes als dat van toepassing is.",
        ],
      },
      {
        type: "h2",
        id: "schulden-vermogen",
        text: "Schulden en vermogen",
      },
      {
        type: "ul",
        items: [
          "Studieschuld: stand van DUO en aflossingstype (vóór of na 2015).",
          "Andere leningen: recente afschriften (lease, creditcard, persoonlijke lening).",
          "Overzicht spaar- en beleggingsrekeningen als de bank daarom vraagt.",
        ],
      },
      {
        type: "h2",
        id: "identiteit-partner",
        text: "Identiteit en partner",
      },
      {
        type: "ul",
        items: [
          "Geldige ID voor iedere aanvrager.",
          "Partner die meesignt? Zelfde documenten voor inkomen en schulden voor alle betrokkenen.",
          "Scheidingsconvenant of alimentatieafspraken als dat speelt.",
        ],
      },
      {
        type: "callout",
        variant: "accent",
        title: "Tip",
        body: "Zet op voorhand op één lijst welke bestanden je digitaal hebt (PDF). Dan kun je in het gesprek direct doorlinken of uploaden zonder thuis nog een map te missen.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-documenten",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Moet ik alles fysiek meenemen?",
            a: "Vaak werk je digitaal via een portaal of je adviseur. Print alleen wat expliciet gevraagd wordt; een ID en soms ondertekende verklaringen gaan nog wel eens op papier.",
          },
          {
            q: "Wat als ik net van baan ben gewisseld?",
            a: "Dan wil de bank je nieuwe contract en loon zien. Houd proeftijden en tijdelijke contracten bij de hand — je adviseur weet hoe banken dat beoordelen.",
          },
          {
            q: "Helpt een situatieschets?",
            a: "Ja. Als je je cijfers al op papier hebt, loop je sneller door de intake heen en vergeet je minder velden. Het vervangt geen bankformulier, maar het helpt wél om het gesprek strak te houden.",
          },
        ],
      },
    ],
  },
  {
    slug: "wat-vraagt-hypotheekadviseur",
    title: "Wat vraagt een adviseur aan je?",
    description:
      "Wat een erkend hypotheekadviseur tijdens een intakegesprek wil weten — en hoe je je situatieschets als voorbereiding gebruikt.",
    category: "voorbereiding",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/Wat%20vraagt%20een%20adviseur%20aan%20je.png",
    blocks: [
      {
        type: "lead",
        text: "Een hypotheekadviseur bouwt een dossier om je leencapaciteit en risico’s te beoordelen. Geen detail om je op te jagen — het zijn dezelfde vragen die een bank later ook stelt. Hoe completer je antwoord, hoe minder je achteraf hoeft bij te leveren.",
      },
      {
        type: "h2",
        id: "inkomen-werk-intake",
        text: "Inkomen en werk",
      },
      {
        type: "p",
        text: "Denk aan bruto en netto, vaste uren, bonusregelingen, proeftijd en of je in loondienst of zzp bent. Bij een partner telt vaak ook het tweede inkomen mee — dan wil men hetzelfde niveau van detail. Als je recent bent gestopt of gestart met werk, moet je dat kunnen onderbouwen.",
      },
      {
        type: "h2",
        id: "woning-financiering",
        text: "Woning en financiering",
      },
      {
        type: "p",
        text: "Welke woning denk je aan, voor welk bedrag, en hoeveel eigen geld heb je? Ga je starterslening of familiale gift gebruiken? Wil je energiebesparende maatregelen financieren? Dat soort keuzes bepaalt welk product en welke rente passend zijn.",
      },
      {
        type: "h2",
        id: "schulden-verplichtingen",
        text: "Schulden en verplichtingen",
      },
      {
        type: "p",
        text: "Studieschuld, lease, alimentatie, andere hypotheken — alles wat je maandelijks vast moet betalen, kan de ruimte voor een nieuwe hypotheek beïnvloeden. Een adviseur vraagt ook naar terugbetaalregelingen en restbedragen, niet alleen naar ‘of’ je iets hebt.",
      },
      {
        type: "h2",
        id: "toekomst-risico",
        text: "Toekomst en risico",
      },
      {
        type: "p",
        text: "Kinderwens, zorg voor ouders, geplande verhuizing of ondernemersrisico: geen verplichte privacy-inbreuk, maar wel relevant als het je draagkracht kan raken. Verzekeringen tegen overlijden of arbeidsongeschiktheid komen hier vaak ter sprake — niet om te verkopen, maar om te checken of je hypotheek past bij hoe je je buffer ziet.",
      },
      {
        type: "h2",
        id: "situatieschets",
        text: "Situatieschets als voorbereiding",
      },
      {
        type: "p",
        text: "Als je vooraf een situatieschets invult, heb je veel van deze antwoorden al op papier. Je adviseur kan dan focussen op uitzonderingen en vergelijkingen in plaats van opnieuw alle basisvragen af te tikken.",
      },
      {
        type: "callout",
        variant: "neutral",
        title: "Onthouden",
        body: "Een erkend adviseur werkt onder vergunning en legt verantwoording af over het advies. Schrijf geen dingen ‘mooier’ voor dan ze zijn — inconsistenties tussen jouw verhaal en bankgegevens komen altijd boven water.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-adviseur",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Moet ik alles in het eerste gesprek weten?",
            a: "Nee. Je mag schattingen geven over een woning en je spaarstand, maar wat je weet moet kloppen met wat je later kunt tonen. Wat je niet weet, geef je aan als ‘nog open’.",
          },
          {
            q: "Stelt elke adviseur dezelfde vragen?",
            a: "De kern is gelijk (inkomen, schuld, woning), maar de volgorde en detailniveau verschillen. Banken hebben eigen vragenlijsten; je adviseur vertaalt jouw situatie daarnaartoe.",
          },
          {
            q: "Is dit hetzelfde als bij de bank zonder adviseur?",
            a: "De bank wil dezelfde feiten, maar een adviseur vergelijkt meerdere aanbieders en legt uit wat productverschil voor jou betekent. Zonder tussenpersoon loop je die vergelijking zelf.",
          },
        ],
      },
    ],
  },
  {
    slug: "studieschuld-en-hypotheek",
    title: "Studieschuld en je leencapaciteit",
    description:
      "Hoe een DUO-schuld meetelt bij je hypotheekaanvraag, wat banken daarvoor vragen, en hoe je het helder op papier zet.",
    category: "regelingen",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/studieschuld.png",
    blocks: [
      {
        type: "lead",
        text: "Een studieschuld telt mee bij je maximale hypotheek omdat banken ruimte reserveren voor een maandelijkse aflossing — ook als je die in de praktijk even pauzeert. Ze rekenen niet euro-voor-euro af van je leenbedrag, maar met een vaste formule op basis van wat je bij DUO hebt geleend.",
      },
      {
        type: "h2",
        id: "waarom-meetellen",
        text: "Waarom meetelt het?",
      },
      {
        type: "p",
        text: "Regels van toezichthouders en bankbeleid zorgen ervoor dat een studieschuld zichtbaar is in je maandlast. In plaats van alleen je werkelijke aflossing te nemen, gebruiken veel aanbieders een percentage van de oorspronkelijke schuld per maand — een ‘fictieve’ last. Zo blijft ruimte over voor andere verplichtingen.",
      },
      {
        type: "h2",
        id: "duo-regels",
        text: "Wat er vaak wordt gehanteerd",
      },
      {
        type: "p",
        text: "Het onderscheid zit vaak in wanneer je schuld is ontstaan. Voor schulden na september 2015 geldt in veel modellen een lagere maandelijkse weging dan voor oudere schulden. De exacte percentages verschillen per moment en aanbieder en worden periodiek bijgesteld.",
      },
      {
        type: "ul",
        items: [
          "Je hebt het over de oorspronkelijke hoofdsom bij DUO, niet alleen wat je nu nog kwijt bent.",
          "Regelingen als tijdelijk stoppen met aflossen veranderen je echte cashflow, maar de bank kan voor de toets alsnog met de fictieve norm rekenen.",
        ],
      },
      {
        type: "callout",
        variant: "accent",
        title: "Rekenhulp",
        body: "Op de hypotheekpagina kun je je studieschuld invullen om een ruwe indicatie van je leencapaciteit te zien. Dat is geen bankberekening — je adviseur gebruikt de officiële toets.",
      },
      {
        type: "h2",
        id: "wat-bank-vraagt",
        text: "Wat de bank van je vraagt",
      },
      {
        type: "ul",
        items: [
          "Actuele stand van je studieschuld bij DUO (screenshot of PDF).",
          "Of je een terugbetaalplan hebt en welke rente DUO hanteert.",
          "Soms: historie als je schuld door DUO is herzien of opnieuw is vastgesteld.",
        ],
      },
      {
        type: "h2",
        id: "op-papier",
        text: "Helder op papier zetten",
      },
      {
        type: "p",
        text: "Noteer oorspronkelijk bedrag, restschuld, startdatum regeling en je maandelijkse DUO-last. Combineer dat met je andere leningen en vaste lasten in je situatieschets — dan hoeft je adviseur niet te gissen tijdens het gesprek.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-studieschuld",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Verdwijnt studieschuld als ik hem afbetaald heb?",
            a: "Zodra de schuld weg is en dat aantoonbaar is, hoort die niet meer in je toets. Tot die tijd telt hij mee volgens de regels van de bank.",
          },
          {
            q: "Waarom wijkt mijn bank af van online rekenhulpen?",
            a: "Banken gebruiken eigen systemen en soms actuelere normen. Online tools zijn een orientatie; een bankbrief is leidend.",
          },
          {
            q: "Telt een partnerstudieschuld ook?",
            a: "Als je gezamenlijk een hypotheek aanvraagt, worden schulden van beide aanvragers meegenomen in het dossier — precies hoe, legt je adviseur uit.",
          },
        ],
      },
    ],
  },
  {
    slug: "nhg-wat-is-het",
    title: "NHG — wat is het en wanneer telt het?",
    description:
      "Wanneer Nationale Hypotheek Garantie relevant is, wat de grens is in 2026, en waar je de officiële informatie vindt.",
    category: "regelingen",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/wat%20is%20nhg.png",
    blocks: [
      {
        type: "lead",
        text: "Nationale Hypotheek Garantie (NHG) is een regeling waarbij een garantiefonds achter jouw hypotheek staat onder strikte voorwaarden. Voor jou kan dat een lagere rente betekenen; voor de bank is het een extra vangnet bij betalingsproblemen.",
      },
      {
        type: "h2",
        id: "wat-doet-nhg",
        text: "Wat doet NHG?",
      },
      {
        type: "p",
        text: "Je betaalt een eenmalige premie bij afsluiten (uitgedrukt als percentage van het leenbedrag binnen de grens). Als je aan alle voorwaarden voldoet, komt je hypotheek in aanmerking voor de garantie. Dat betekent niet dat je zomaar kwijtgescholden wordt bij problemen — het regelt vooral wie welk risico draagt tussen jou, bank en fonds.",
      },
      {
        type: "h2",
        id: "grens-2026",
        text: "Grens en jaar",
      },
      {
        type: "p",
        text: "De maximale koopsom waar NHG voor in aanmerking komt, wordt jaarlijks bijgesteld. Voor 2026 wordt in veel communicatie uitgegaan van een grens rond €435.000 voor een standaard situatie — controleer het actuele bedrag op de website van NHG, want correcties zijn mogelijk.",
      },
      {
        type: "h2",
        id: "voordelen",
        text: "Wat mensen er vaak uit halen",
      },
      {
        type: "ul",
        items: [
          "Lagere rente dan vergelijkbare leningen zonder NHG — verschil en grootte wisselen per aanbieder.",
          "Een duidelijk kader bij gedwongen verkoop en restschuld binnen de regeling.",
          "Eén standaard waar veel banken mee werken — dat maakt vergelijken iets eenvoudiger.",
        ],
      },
      {
        type: "h2",
        id: "voorwaarden",
        text: "Voorwaarden in het kort",
      },
      {
        type: "ul",
        items: [
          "De woning moet geschikt zijn als eigen woning volgens de regels van NHG.",
          "Je hypotheek en koopsom moeten binnen de geldende grens vallen.",
          "Aanvullende regels gelden voor energiezuinig bouwen, starters en bijzondere constructies — zie de officiële site.",
        ],
      },
      {
        type: "callout",
        variant: "muted",
        title: "Officiële bron",
        body: "Vóór je tekent, check je altijd de actuele voorwaarden en grenzen op nhg.nl. Je adviseur bevestigt of jouw aanvraag binnen de regeling past.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-nhg",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Is NHG verplicht?",
            a: "Nee. Het is een optie als je en de woning aan de eisen voldoen. Soms kiest een bank een andere route — je adviseur legt uit waarom.",
          },
          {
            q: "Moet ik NHG zelf aanvragen?",
            a: "De aanvraag loopt meestal via je geldverstrekker en adviseur in het hypotheektraject. Jij levert de juiste documenten; zij regelen de administratie richting NHG.",
          },
          {
            q: "Verandert de grens elk jaar?",
            a: "Ja, markt en beleid worden jaarlijks herzien. Het bedrag op deze site is een werkhypothese voor 2026 — valideer het altijd op nhg.nl.",
          },
        ],
      },
    ],
  },
  {
    slug: "kosten-koper-en-eigen-geld",
    title: "Kosten koper en eigen geld",
    description:
      "Waar kosten koper uit bestaan, waarom ze niet ‘in’ je hypotheek voor de koopsom zitten, en hoeveel eigen geld je vaak nodig hebt naast je lening.",
    category: "basis",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/Waar%20kosten%20koper%20uit%20bestaan.png",
    blocks: [
      {
        type: "lead",
        text: "Naast de hypotheek voor de woning zelf heb je te maken met kosten koper: alles wat bij de aankoop komt kijken maar niet automatisch in het leenbedrag voor de koopsom zit. Dat betaal je vrijwel altijd uit eigen geld of andere middelen die niet onderdeel uitmaken van die koophypotheek.",
      },
      {
        type: "h2",
        id: "wat-zijn-kosten-koper",
        text: "Wat hoort bij kosten koper?",
      },
      {
        type: "p",
        text: "Typisch zijn dat onder andere notariskosten voor levering en hypotheek, kadaster, taxatie, en soms overdrachtsbelasting. De exacte posten hangen af van je situatie (bijvoorbeeld starter, bestaande bouw, of nieuwbouw) en de afspraken in je koopcontract.",
      },
      {
        type: "h2",
        id: "eigen-geld",
        text: "Hoeveel eigen geld heb je nodig?",
      },
      {
        type: "p",
        text: "Een gangbare vuistregel is om in te plannen met ongeveer 5 tot 6% van de koopsom aan kosten koper, afhankelijk van de posten die op jou van toepassing zijn. In Nederland mag je de woning zelf vaak tot 100% van de waarde bekostigen met hypotheek, maar die kosten koper komen daarbovenop — dus heb je vaak een buffer op je rekening nodig.",
      },
      {
        type: "ul",
        items: [
          "Scheid in je hoofd: leenbedrag voor de woning versus geld dat je contant of via spaar op tafel legt voor bijkomende kosten.",
          "Startersregelingen of vrijstellingen (bijvoorbeeld overdrachtsbelasting) kunnen de rekening drukken — vraag actuele regels na bij je adviseur of de Belastingdienst.",
        ],
      },
      {
        type: "h2",
        id: "waarom-niet-in-hypotheek",
        text: "Waarom zit dit niet ‘gewoon in de hypotheek’?",
      },
      {
        type: "p",
        text: "De afbakening volgt uit regels rond de maximale financiering van de woning: je leent voor de aankoop van de woning binnen de geldende LTV-grenzen. Kosten koper zijn een aparte pot — tenzij je een andere productafspraak hebt (bijvoorbeeld een afzonderlijke lening of meer eigen middelen), maar dat is situatie-afhankelijk en niet automatisch.",
      },
      {
        type: "callout",
        variant: "accent",
        title: "In je situatieschets",
        body: "Als je invult wat je aan spaargeld hebt en wat je aan kosten koper verwacht, zie je snel of je buffer klopt. Dat maakt het gesprek met een adviseur concreter.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-kosten-koper",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Kan ik kosten koper financeren met een tweede lening?",
            a: "Soms wel via een persoonlijke lening of bouwdepot-achtige constructies, maar dat verhoogt je maandlast en schuldenlast in de toets. Je adviseur rekent uit wat haalbaar is.",
          },
          {
            q: "Zijn kosten koper aftrekbaar?",
            a: "Dat hangt af van type kosten en je situatie. Belastingzaken horen bij een adviseur of belastingadviseur — hier geven we geen individueel oordeel.",
          },
          {
            q: "Waarom noemen jullie een percentage-bandbreedte?",
            a: "Omdat elke transactie anders is. Taxatie, notaris en belasting zijn niet overal hetzelfde — een bandbreedte helpt om te reserveren.",
          },
        ],
      },
    ],
  },
  {
    slug: "hypotheekofferte-lezen",
    title: "Je hypotheekofferte lezen",
    description:
      "Welke onderdelen in een offerte het belangrijkst zijn: rente, looptijd, maandlast en voorwaarden — zodat je weet wat je vergelijkt.",
    category: "voorbereiding",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/Je%20hypotheekofferte%20lezen%20%281%29.png",
    blocks: [
      {
        type: "lead",
        text: "Een hypotheekofferte is het document waarin een geldverstrekker voorstelt hoe ze jouw hypotheek zien: bedrag, rente, looptijd en voorwaarden. Het is geen kleine lettertjes om te skippen — juist hier zie je wat je jarenlang betaalt en welke regels gelden bij verhuizing of vervroegd aflossen.",
      },
      {
        type: "h2",
        id: "kern-offerte",
        text: "Waar kijk je als eerste naar?",
      },
      {
        type: "cards",
        items: [
          {
            title: "Leenbedrag",
            body: "Hoofdsom en eventuele onderdelen (bijvoorbeeld een apart bedrag voor verbouwing). Controleer of het past bij de koopsom en je eigen inbreng.",
          },
          {
            title: "Rente en periode",
            body: "Rentepercentage en hoe lang die vaststaat. Na die periode volgt meestal een nieuwe afspraak — noteer de data.",
          },
          {
            title: "Maandlast",
            body: "Wat je per maand betaalt volgens dit voorstel. Vraag door of dit uitgaat van annuïteit, lineair of een andere constructie.",
          },
        ],
      },
      {
        type: "h2",
        id: "voorwaarden-offerte",
        text: "Voorwaarden die vaak achteraan staan",
      },
      {
        type: "ul",
        items: [
          "Boeterente of vergoeding bij vervroegd aflossen of verbreken van de renteperiode.",
          "Meeverhuizen of oversluiten: wat mag wel en niet zonder boete.",
          "Verplichte verzekeringen of betaalrekening — let op totale kosten per jaar, niet alleen op rente.",
        ],
      },
      {
        type: "h2",
        id: "vergelijken",
        text: "Meerdere offertes naast elkaar",
      },
      {
        type: "p",
        text: "Vergelijk niet alleen het rentepercentage. Twee aanbiedingen met dezelfde rente kunnen verschillen in voorwaarden, servicekosten of flexibiliteit bij verhuizing. Zet per offerte de totale kosten eerste jaar en de belangrijkste risico’s naast elkaar — een adviseur doet dat gestandaardiseerd voor je.",
      },
      {
        type: "callout",
        variant: "muted",
        title: "Nog geen offerte?",
        body: "Gebruik eerst een ruwe indicatie (bijvoorbeeld via een rekenhulp) en je situatieschets met je cijfers. Dan weet je bij het ophalen van offertes beter welke vragen je stelt.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-offerte",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Is een offerte bindend?",
            a: "Een offerte heeft meestal een geldigheidsduur en kan voorwaarden bevatten (‘onder voorbehoud van acceptatie’). Pas na definitieve goedkeuring door de bank en passeren bij de notaris is je hypotheekcontract bindend volgens de akte.",
          },
          {
            q: "Kan de rente nog veranderen vóór acceptatie?",
            a: "Ja, als de bank dat in de offerte zo communiceert — bijvoorbeeld bij verandering van marktrente of als je dossier incompleet is. Vraag altijd tot wanneer het voorstel staat.",
          },
          {
            q: "Moet ik alles zelf begrijpen?",
            a: "Nee. Een erkend adviseur hoort je door de offerte te lezen en te vertalen wat het voor jou betekent. Jij beslist; zij leggen uit.",
          },
        ],
      },
    ],
  },
  {
    slug: "energielabel-en-hypotheek",
    title: "Energielabel en je hypotheek",
    description:
      "Hoe het energielabel van een woning past bij waarde en financiering — en waar je op let bij koop of verbouw.",
    category: "regelingen",
    published: true,
    coverImage:
      "https://iemgpccgdlwpsrsjuumo.supabase.co/storage/v1/object/public/mvr/energie%20label.png",
    blocks: [
      {
        type: "lead",
        text: "Elke woning heeft een energielabel (A tot G) dat inzicht geeft in isolatie en energieverbruik. Voor je hypotheek speelt het label vooral mee in hoe de bank en taxateur de woning waarderen en welke producten of regelingen mogelijk zijn.",
      },
      {
        type: "h2",
        id: "waarom-label-telt",
        text: "Waarom het label telt",
      },
      {
        type: "p",
        text: "Een slechter label betekent vaak hogere energiekosten en soms meer onderhoud — dat kan de marktwaarde drukken. Een beter label kan het omgekeerde doen. Banken modelleren dat indirect via de taxatie en hun eigen risico-inschatting.",
      },
      {
        type: "h2",
        id: "verbouwen-label",
        text: "Verbeteren van het label",
      },
      {
        type: "ul",
        items: [
          "Isolatie, nieuwe kozijnen, warmtepomp: ingrepen kunnen het label verbeteren — maar pas na registratie zichtbaar op het officiële label.",
          "Soms gebruik je een bouwdepot of verhoog je tijdelijk je budget voor renovatie; dat hoort in je gesprek met een adviseur.",
        ],
      },
      {
        type: "h2",
        id: "groene-regelingen",
        text: "Groene leningen en regelingen",
      },
      {
        type: "p",
        text: "Aanbieders hebben soms aparte producten of rentekorting voor energiezuinige woningen of verbouwingen. De voorwaarden verschillen per bank en jaar; je adviseur vergelijkt wat écht bij jouw dossier past.",
      },
      {
        type: "callout",
        variant: "accent",
        title: "Geen productadvies hier",
        body: "Welke groene lening of subsidie voor jou openstaat, verandert snel. Check actuele overheidsinformatie en laat je adviseur de combinatie met je hypotheek uitwerken.",
      },
      {
        type: "h2",
        id: "veelgestelde-vragen-energielabel",
        text: "Veelgestelde vragen",
      },
      {
        type: "faq",
        items: [
          {
            q: "Waar vind ik het label van een woning?",
            a: "In het advertentieportaal van funda staat het vaak vermeld; het officiële register is die van de Rijksoverheid voor energielabels. Bij twijfel vraag je de verkoper om het document.",
          },
          {
            q: "Kan ik een lagere rente krijgen met label A?",
            a: "Dat kan bij sommige aanbieders onder voorwaarden. Het is geen garantie — je bank en het moment van afsluiten bepalen het aanbod.",
          },
          {
            q: "Moet ik verbouwen vóór ik koop?",
            a: "Niet per se. Sommigen kopen eerst en verbeteren daarna met een depot of tweede tranche financiering. De route hangt af van budget, technische staat en wat de bank accepteert.",
          },
        ],
      },
    ],
  },
];

export function getHypotheekGidsBySlug(slug: string): HypotheekGidsMeta | undefined {
  return HYPOTHEEK_GIDSEN.find((g) => g.slug === slug);
}

export function getPublishedHypotheekGidsen(): HypotheekGidsMeta[] {
  return HYPOTHEEK_GIDSEN.filter((g) => g.published);
}
