/** Shape nodig voor kwalitatieve interpretatie - los van het volle payload-type (vermijdt import-cycli). */
export type PdfInsightPayload = {
  studyDebt: number;
  totalMonthlyDebtExStudy: number;
  autoLeaseMonthly: number;
  personalLoanOutstanding: number;
  creditLimit: number;
  alimentatieMonthly: number;
  targetPrice: number | null;
  savings: number;
  pdfContext: {
    metPartner: boolean;
    variableIncomeApplicant: boolean;
    variableIncomePartner: boolean;
    aanvragerDienstverband: "vast" | "tijdelijk" | "zzp" | "pensioen" | "uitkering" | "anders" | null;
    partnerDienstverband: "vast" | "tijdelijk" | "zzp" | "pensioen" | "uitkering" | "anders" | null;
  };
};

export type ThinkingInsights = {
  schuldenLabel: string;
  complexity: "eenvoudig" | "gemiddeld" | "complex";
  valtOp: string[];
  betekenisSamenvatting: string;
  gesprekFocus: string;
  aandachtItems: { tag: "[!]" | "[+]" | "[i]"; title: string; body: string }[];
  gesprekVragen: string[];
};

/**
 * Kwalitatieve interpretatie van invoer - geen hypotheekadvies, geen leenbedragen.
 * Doel: structuur en gesprekswaarde voor de adviseur.
 */
export function derivePdfThinkingInsights(p: PdfInsightPayload): ThinkingInsights {
  const ctx = p.pdfContext;
  const metPartner = ctx.metPartner;
  const study = p.studyDebt > 0;
  const otherDebt =
    p.totalMonthlyDebtExStudy > 0 ||
    p.autoLeaseMonthly > 0 ||
    p.personalLoanOutstanding > 0 ||
    p.creditLimit > 0 ||
    p.alimentatieMonthly > 0;

  let schuldenLabel = "nee (in dit overzicht)";
  if (study && otherDebt) schuldenLabel = "ja - studieschuld en overige posten";
  else if (study) schuldenLabel = "ja - studieschuld";
  else if (otherDebt) schuldenLabel = "ja - overige leningen/lasten";

  let score = 0;
  if (study) score += 1;
  if (otherDebt) score += 1;
  if (p.studyDebt > 25_000) score += 1;
  if (ctx.variableIncomeApplicant || ctx.variableIncomePartner) score += 1;
  const az = ctx.aanvragerDienstverband;
  const pz = ctx.partnerDienstverband;
  if (az === "tijdelijk" || az === "zzp") score += 1;
  if (metPartner && (pz === "tijdelijk" || pz === "zzp")) score += 1;
  if (p.targetPrice != null && p.targetPrice > 0) {
    if (p.savings < p.targetPrice * 0.05) score += 2;
    else if (p.savings < p.targetPrice * 0.08) score += 1;
  }
  if (p.targetPrice == null || p.targetPrice <= 0) score += 1;

  const complexity: ThinkingInsights["complexity"] =
    score <= 2 ? "eenvoudig" : score <= 5 ? "gemiddeld" : "complex";

  const valtOp: string[] = [];
  if (!study && !otherDebt) {
    valtOp.push(
      "[+] Geen studieschuld of andere schulden ingevuld in dit overzicht - klopt dat met je werkelijkheid? Zo ja, scheelt dat meestal uitleg in je dossier.",
    );
  }
  if (study) {
    valtOp.push(
      "[i] Studieschuld staat op je overzicht - je adviseur legt uit hoe die in de toets en maandlast meeweegt.",
    );
  }
  if (otherDebt && !study) {
    valtOp.push(
      "[i] Er staan posten als lease, lening of krediet ingevuld - bespreek hoe dit je ruimte beinvloedt.",
    );
  }
  if (p.targetPrice != null && p.targetPrice > 0 && p.savings < p.targetPrice * 0.05) {
    valtOp.push(
      "[!] Spaargeld lijkt krap t.o.v. een gangbare richtlijn voor kosten koper (vaak rond 5% van de koopsom; kan per situatie verschillen).",
    );
  }
  if (ctx.variableIncomeApplicant || ctx.variableIncomePartner) {
    valtOp.push(
      "[!] Variabel inkomen ingevuld - banken wegen dit niet allemaal gelijk; neem onderbouwing mee.",
    );
  }
  if (az === "tijdelijk" || az === "zzp" || (metPartner && (pz === "tijdelijk" || pz === "zzp"))) {
    valtOp.push(
      "[!] Tijdelijk contract of ZZP kan extra vragen en documenten vragen - plan dit mee in je gesprek.",
    );
  }
  while (valtOp.length > 4) valtOp.pop();

  let betekenisSamenvatting =
    "Je inkomen en je ingevulde posten bepalen vooral waar het gesprek over gaat.";
  if (p.targetPrice != null && p.targetPrice > 0 && p.savings < p.targetPrice * 0.05) {
    betekenisSamenvatting =
      "Je grootste aandachtspunt lijkt eigen geld t.o.v. je streef-koopsom - vraag wat je minimaal nodig hebt.";
  } else if (study && p.studyDebt > 15_000) {
    betekenisSamenvatting =
      "Je grootste aandachtspunt lijkt hoe je studieschuld in de toets en maandlast meeweegt.";
  } else if (ctx.variableIncomeApplicant || ctx.variableIncomePartner) {
    betekenisSamenvatting =
      "Je grootste aandachtspunt lijkt hoe je (variabel) inkomen wordt meegewogen.";
  }

  let gesprekFocus =
    "Vooral inkomen, schulden/posten, eigen geld en wat je aan koopsom voor ogen hebt.";
  if (study) {
    gesprekFocus =
      "Naast inkomen: vooral studieschuld, maandlast-hypotheekruimte en eigen geld - je adviseur maakt het definitief.";
  }
  if (metPartner && (ctx.variableIncomePartner || pz === "tijdelijk" || pz === "zzp")) {
    gesprekFocus +=
      " Met partner: ook hoe jullie inkomens en contracten samen worden beoordeeld.";
  }

  const aandachtItems: ThinkingInsights["aandachtItems"] = [];

  if (!study && !otherDebt) {
    aandachtItems.push({
      tag: "[+]",
      title: "Geen schulden in dit overzicht",
      body: "Als dit klopt met DUO/BKR en je werkelijkheid, werkt dat meestal beeldend in je voorbereiding - check het bij je adviseur.",
    });
  }

  if (p.targetPrice != null && p.targetPrice > 0 && p.savings < p.targetPrice * 0.05) {
    aandachtItems.push({
      tag: "[!]",
      title: "Spaargeld t.o.v. koopsom",
      body: "Je spaargeld ligt onder een gangbare bandbreedte voor kosten koper (vaak rond 5%; niet overal hetzelfde). Bespreek wat jij nodig hebt in jouw situatie.",
    });
  }

  if (ctx.variableIncomeApplicant || ctx.variableIncomePartner) {
    aandachtItems.push({
      tag: "[!]",
      title: "Variabel inkomen",
      body: "Variabele componenten worden per aanbieder verschillend behandeld. Jaaroverzichten en uitleg van je werkgever helpen.",
    });
  }

  if (az === "zzp" || (metPartner && pz === "zzp")) {
    aandachtItems.push({
      tag: "[i]",
      title: "ZZP / zelfstandigheid",
      body: "Toetsing en benodigde stukken verschillen sterk; je adviseur vertelt wat hij nodig heeft voor jouw situatie.",
    });
  } else if (az === "tijdelijk" || (metPartner && pz === "tijdelijk")) {
    aandachtItems.push({
      tag: "[i]",
      title: "Tijdelijk contract",
      body: "Vraag welke documenten (intentieverklaring e.d.) je het beste meeneemt en hoe dit impact kan hebben op acceptatie.",
    });
  }

  if (study) {
    aandachtItems.push({
      tag: "[i]",
      title: "Studieschuld",
      body: "Het oorspronkelijke bedrag en stelsel staan op je overzicht; je adviseur koppelt dit aan de actuele regels en toets.",
    });
  }

  if (aandachtItems.length < 2 && otherDebt) {
    aandachtItems.push({
      tag: "[i]",
      title: "Overige leningen en lasten",
      body: "Lease, lening, krediet en alimentatie kunnen allemaal meetellen. Loop het door met je adviseur zodat niets onverwacht blijft.",
    });
  }

  const gesprekVragen: string[] = [
    "Hoe beoordeel je mijn inkomen (en dat van mijn partner) in mijn situatie?",
    "Hoeveel eigen geld heb ik ongeveer nodig naast de hypotheek - wat hoort bij mijn koopsom?",
    "Welke documenten wil jij van mij voor een volledige aanvraag of een volgende stap?",
  ];

  if (study) {
    gesprekVragen.push(
      "Hoe telt mijn studieschuld precies mee in de toets en in de maandlast - ook als ik een ander stelsel heb?",
    );
  }
  if (az === "tijdelijk" || az === "zzp" || (metPartner && (pz === "tijdelijk" || pz === "zzp"))) {
    gesprekVragen.push(
      "Wat betekent mijn contractvorm voor acceptatie en voor de hoogte van de hypotheek?",
    );
  }
  if (ctx.variableIncomeApplicant || ctx.variableIncomePartner) {
    gesprekVragen.push(
      "Hoe rekenen jullie variabel inkomen of bonus mee - welke bewijsstukken wil je zien?",
    );
  }
  gesprekVragen.push(
    "Wat is voor mij een verstandige maandlast om op te plannen - los van productkeuze?",
  );

  while (gesprekVragen.length > 7) gesprekVragen.pop();

  return {
    schuldenLabel,
    complexity,
    valtOp,
    betekenisSamenvatting,
    gesprekFocus,
    aandachtItems: aandachtItems.slice(0, 5),
    gesprekVragen,
  };
}
