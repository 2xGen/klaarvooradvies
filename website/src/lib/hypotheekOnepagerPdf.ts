import { jsPDF } from "jspdf";

import { derivePdfThinkingInsights } from "@/lib/hypotheekOnepagerPdfInsights";
import type { PdfInsightPayload } from "@/lib/hypotheekOnepagerPdfInsights";
import type { StudyDebtSystem } from "@/lib/maxHypotheekIndicatie";

/** Volledige payload voor de situatieschets-PDF (thinking tool, meerdere pagina's). */
export type OnepagerPdfPayload = {
  generatedAt: string;
  fullName: string;
  voornaam: string;
  achternaam: string;
  email: string;
  phone?: string;
  aanleidingLabel: string;
  aanvragersLabel: string;
  birthDateDisplay: string;
  ageYears: number;
  burgerlijkeStaat: string;
  kinderenDisplay: string;
  rooktDisplay: string;
  annualIncomeApplicant: number;
  dienstverbandApplicant: string;
  variableIncomeApplicantDisplay?: string;
  intentieverklaringDisplay?: string;
  partnerAnnualIncome?: number | null;
  partnerDienstverband?: string | null;
  partnerVariableIncomeDisplay?: string | null;
  partnerIntentieverklaringDisplay?: string | null;
  studyDebt: number;
  studyDebtSystem: StudyDebtSystem;
  studyDebtSystemLabel: string;
  autoLeaseMonthly: number;
  personalLoanOutstanding: number;
  alimentatieMonthly: number;
  creditLimit: number;
  totalMonthlyDebtExStudy: number;
  studyMonthly: number;
  targetPrice: number | null;
  savings: number;
  overwaardeDisplay?: string;
  tijdlijnLabel: string;
  grossIncome: number;
  pensioenAware: string;
  werkloosheidAware: string;
  aoAware: string;
  eerderHypotheek: string;
  financieleKennis: string;
  notes?: string;
  highlightOrientationStep: boolean;
  /** Alleen bij aanvraag met partner; anders null. */
  partnerBirthDateDisplay: string | null;
  partnerAgeYears: number | null;
  /** Context voor kwalitatieve interpretatie (geen leenbedragen). */
  pdfContext: PdfInsightPayload["pdfContext"];
};

const GREEN = { r: 26, g: 107, b: 74 };
const GREEN_LIGHT = { r: 232, g: 245, b: 238 };

/** Ruimte boven de paginanummer-/footerzone (mm vanaf boven). */
const CONTENT_BOTTOM_MM = 22;

const euro = (n: number) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

function addWrapped(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeightMm: number,
): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * lineHeightMm;
}

function drawFooter(doc: jsPDF, pageNum: number, totalPages: number) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;

  doc.setFillColor(GREEN.r, GREEN.g, GREEN.b);
  doc.rect(0, pageH - 9, pageW, 9, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text(
    "Geen financieel advies — voor bindende beslissingen altijd een erkend adviseur raadplegen.",
    margin,
    pageH - 3.5,
  );

  doc.setTextColor(90, 90, 90);
  doc.setFontSize(8);
  doc.text("klaarvooradvies.nl", margin, pageH - 14);
  doc.text(
    `Pagina ${pageNum} van ${totalPages}`,
    pageW - margin - doc.getTextWidth(`Pagina ${pageNum} van ${totalPages}`),
    pageH - 14,
  );
}

function ensureSpace(doc: jsPDF, y: number, neededMm: number, margin: number): number {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + neededMm > pageH - CONTENT_BOTTOM_MM) {
    doc.addPage();
    return margin;
  }
  return y;
}

function drawAantekeningenPage(doc: jsPDF, margin: number, maxW: number): void {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Aantekeningen", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 90);
  y = addWrapped(
    doc,
    "Ruimte voor je eigen notities bij het gesprek met je adviseur — print deze pagina en vul gerust aan.",
    margin,
    y,
    maxW,
    4.2,
  );
  y += 6;

  const lineGap = 8.5;
  const lineEnd = pageW - margin;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.15);
  while (y < pageH - CONTENT_BOTTOM_MM) {
    doc.line(margin, y, lineEnd, y);
    y += lineGap;
  }
}

export function buildHypotheekOnepagerPdf(payload: OnepagerPdfPayload): Blob {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 18;
  const maxW = pageW - margin * 2;

  const insightIn: PdfInsightPayload = {
    studyDebt: payload.studyDebt,
    totalMonthlyDebtExStudy: payload.totalMonthlyDebtExStudy,
    autoLeaseMonthly: payload.autoLeaseMonthly,
    personalLoanOutstanding: payload.personalLoanOutstanding,
    creditLimit: payload.creditLimit,
    alimentatieMonthly: payload.alimentatieMonthly,
    targetPrice: payload.targetPrice,
    savings: payload.savings,
    pdfContext: payload.pdfContext,
  };
  const ins = derivePdfThinkingInsights(insightIn);

  const schuldenKort = ins.schuldenLabel.startsWith("nee")
    ? "nee (volgens deze invoer)"
    : `ja — ${ins.schuldenLabel}`;

  let y = margin;

  /* --- Page 1: Snapshot --- */
  doc.setFillColor(GREEN.r, GREEN.g, GREEN.b);
  doc.rect(0, 0, pageW, 36, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.text("Jouw hypotheekoverzicht — voorbereiding op je gesprek", margin, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text("KlaarVoorAdvies · klaarvooradvies.nl · geen financieel advies", margin, 21);
  doc.setFontSize(8.5);
  doc.text(`Aangemaakt: ${payload.generatedAt}`, margin, 28);
  doc.setTextColor(0, 0, 0);
  y = 42;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(55, 55, 55);
  const namePart = [payload.voornaam.trim(), payload.achternaam.trim()].filter(Boolean).join(" ");
  const emailPart = payload.email.trim();
  const phonePart = payload.phone?.trim() ?? "";
  const contactSummary =
    namePart || emailPart || phonePart
      ? `${namePart || "—"} · ${emailPart || "—"}${phonePart ? ` · ${phonePart}` : ""}`
      : "Geen naam of contact op deze PDF — bewust niet ingevuld. Alleen voor eigen gebruik.";
  y = addWrapped(doc, contactSummary, margin, y, maxW, 4.3);
  y += 6;

  function blockTitle(title: string) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
    doc.text(title, margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    doc.setTextColor(35, 35, 35);
  }

  blockTitle("Jouw situatie in 10 seconden");
  const snapRows = [
    `Inkomen (totaal ingevuld): ${euro(payload.grossIncome)}`,
    `Partner: ${payload.pdfContext.metPartner ? "ja" : "nee"}`,
    `Schulden / leningen in dit overzicht: ${schuldenKort}`,
    `Spaargeld: ${euro(payload.savings)}`,
    `Doel: ${payload.aanleidingLabel}`,
  ];
  for (const row of snapRows) {
    y = ensureSpace(doc, y, 7, margin);
    y = addWrapped(doc, `• ${row}`, margin + 2, y, maxW - 2, 4.5);
    y += 1;
  }
  y += 5;

  blockTitle("Wat valt direct op");
  for (const line of ins.valtOp) {
    y = ensureSpace(doc, y, 14, margin);
    y = addWrapped(doc, line, margin + 2, y, maxW - 2, 4.5);
    y += 2;
  }
  if (ins.valtOp.length === 0) {
    y = addWrapped(
      doc,
      "Geen opvallende punten op basis van deze invoer — je adviseur bevestigt je dossier.",
      margin + 2,
      y,
      maxW - 2,
      4.5,
    );
    y += 4;
  }
  y += 4;

  blockTitle("Wat betekent dit in het kort");
  const kort = [
    `Je situatie lijkt ${ins.complexity} — eerste indruk op basis van je invoer, geen oordeel van de bank.`,
    `Je grootste aandachtspunt lijkt: ${ins.betekenisSamenvatting}`,
    `Je gesprek zal vooral gaan over: ${ins.gesprekFocus}`,
  ];
  for (const line of kort) {
    y = ensureSpace(doc, y, 12, margin);
    y = addWrapped(doc, line, margin + 2, y, maxW - 2, 4.5);
    y += 2;
  }

  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  y = addWrapped(
    doc,
    "Disclaimer: dit document structureert jouw invoer en helpt je voorbereiden. Geen hypotheekofferte, geen productadvies en geen exact leenbedrag.",
    margin,
    y,
    maxW,
    3.8,
  );

  /* --- Page 2: compact gegevens --- */
  doc.addPage();
  y = margin;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Jouw gegevens (compact)", margin, y);
  y += 9;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.2);
  doc.setTextColor(35, 35, 35);

  const inkomenCompact = [
    `Aanvrager — bruto jaarinkomen: ${euro(payload.annualIncomeApplicant)} · dienstverband: ${payload.dienstverbandApplicant}`,
  ];
  if (payload.variableIncomeApplicantDisplay) {
    inkomenCompact.push(`Aanvrager - variabel: ${payload.variableIncomeApplicantDisplay}`);
  }
  if (payload.intentieverklaringDisplay) {
    inkomenCompact.push(`Intentieverklaring werkgever (aanvrager): ${payload.intentieverklaringDisplay}`);
  }
  if (payload.partnerAnnualIncome != null && payload.partnerAnnualIncome > 0) {
    inkomenCompact.push(
      `Partner — bruto jaarinkomen: ${euro(payload.partnerAnnualIncome)} · dienstverband: ${payload.partnerDienstverband ?? "—"}`,
    );
    if (payload.partnerVariableIncomeDisplay) {
      inkomenCompact.push(`Partner - variabel: ${payload.partnerVariableIncomeDisplay}`);
    }
    if (payload.partnerIntentieverklaringDisplay) {
      inkomenCompact.push(`Intentieverklaring werkgever (partner): ${payload.partnerIntentieverklaringDisplay}`);
    }
  }
  inkomenCompact.push(`Totaal bruto (zoals ingevuld): ${euro(payload.grossIncome)}`);

  for (const line of inkomenCompact) {
    y = ensureSpace(doc, y, 8, margin);
    y = addWrapped(doc, line, margin, y, maxW, 4.4);
    y += 1.5;
  }
  y += 4;

  y = ensureSpace(doc, y, 40, margin);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Schulden, studieschuld en lasten", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.2);
  const schuldLines = [
    `Studieschuld (oorspronkelijk bedrag): ${payload.studyDebt > 0 ? euro(payload.studyDebt) : "geen"} — stelsel: ${payload.studyDebtSystemLabel}`,
    `Studieschuld maandlast (regel-indicator): ~${euro(payload.studyMonthly)}/maand`,
    `Autolease: ${payload.autoLeaseMonthly > 0 ? `${euro(payload.autoLeaseMonthly)}/maand` : "geen"}`,
    `Persoonlijke lening openstaand: ${payload.personalLoanOutstanding > 0 ? euro(payload.personalLoanOutstanding) : "geen"}`,
    `Alimentatie: ${payload.alimentatieMonthly > 0 ? `${euro(payload.alimentatieMonthly)}/maand` : "geen"}`,
    `Kredietlimiet: ${payload.creditLimit > 0 ? euro(payload.creditLimit) : "geen"}`,
    `Som overige maandlasten (excl. studieschuld-regel): ${euro(payload.totalMonthlyDebtExStudy)}/maand`,
  ];
  for (const line of schuldLines) {
    y = ensureSpace(doc, y, 7, margin);
    y = addWrapped(doc, line, margin, y, maxW, 4.2);
    y += 1;
  }
  y += 4;

  y = ensureSpace(doc, y, 20, margin);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Woning en eigen geld", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.2);
  const woningLines = [
    payload.targetPrice != null && payload.targetPrice > 0
      ? `Koopsom / streefbedrag: ${euro(payload.targetPrice)}`
      : "Koopsom / streefbedrag: niet ingevuld",
    `Spaargeld: ${euro(payload.savings)}`,
  ];
  if (payload.overwaardeDisplay) {
    woningLines.push(`Overwaarde: ${payload.overwaardeDisplay}`);
  }
  for (const line of woningLines) {
    y = ensureSpace(doc, y, 7, margin);
    y = addWrapped(doc, line, margin, y, maxW, 4.2);
    y += 1;
  }

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Persoonlijk kader", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.2);
  const persLines = [
    `Leeftijd aanvrager: ${payload.ageYears} jaar (geboren ${payload.birthDateDisplay || "—"})`,
  ];
  if (payload.partnerBirthDateDisplay && payload.partnerAgeYears != null) {
    persLines.push(
      `Leeftijd partner: ${payload.partnerAgeYears} jaar (geboren ${payload.partnerBirthDateDisplay})`,
    );
  }
  persLines.push(
    `Burgerlijke staat: ${payload.burgerlijkeStaat}`,
    `Kinderen: ${payload.kinderenDisplay}`,
    `Roken: ${payload.rooktDisplay}`,
    `Tijdlijn: ${payload.tijdlijnLabel}`,
    `Financiële kennis (zelfrapportage): ${payload.financieleKennis}`,
  );
  for (const line of persLines) {
    y = ensureSpace(doc, y, 7, margin);
    y = addWrapped(doc, line, margin, y, maxW, 4.2);
    y += 1;
  }

  if (payload.notes?.trim()) {
    y += 3;
    y = ensureSpace(doc, y, 14, margin);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
    doc.text("Eigen opmerkingen (uit de wizard)", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y = addWrapped(doc, payload.notes.trim(), margin, y, maxW, 4.2);
  }

  y += 8;
  /** Geen Unicode-pijl (→): core Helvetica in jsPDF rendert die als verkeerd teken en splitTextToSize meet breedte fout → overflow. */
  const meaningTitle = "Wat doet dit ongeveer met je mogelijkheden?";
  const meaningBody = [
    "Inkomen - bepaalt (samen met regels van de geldverstrekker) je basisruimte in de toets.",
    "Schulden en lasten - kunnen je leencapaciteit drukken; je adviseur koppelt dit aan de actuele toets.",
    "Spaargeld - nodig voor kosten koper en eigen bijdrage; de hoogte hangt af van je koopsom en situatie.",
  ];
  const innerPad = 4;
  const innerW = maxW - innerPad * 2;
  const padTop = 7;
  const padBottom = 6;
  const gapAfterTitle = 4;
  const gapBetweenBullets = 2;
  const titleLineMm = 4.5;
  const bulletLineMm = 4.2;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  const titleLines = doc.splitTextToSize(meaningTitle, innerW);
  const titleBlockH = titleLines.length * titleLineMm;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  let bulletsH = 0;
  for (const b of meaningBody) {
    const bulletLines = doc.splitTextToSize(`• ${b}`, innerW);
    bulletsH += bulletLines.length * bulletLineMm + gapBetweenBullets;
  }
  bulletsH -= meaningBody.length ? gapBetweenBullets : 0;

  const meaningBlockH = padTop + titleBlockH + gapAfterTitle + bulletsH + padBottom;

  const boxTop = ensureSpace(doc, y, meaningBlockH + 6, margin);
  doc.setFillColor(GREEN_LIGHT.r, GREEN_LIGHT.g, GREEN_LIGHT.b);
  doc.setDrawColor(210, 228, 218);
  doc.roundedRect(margin, boxTop, maxW, meaningBlockH, 2, 2, "FD");
  let ty = boxTop + padTop;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  ty = addWrapped(doc, meaningTitle, margin + innerPad, ty, innerW, titleLineMm);
  ty += gapAfterTitle;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  for (let i = 0; i < meaningBody.length; i++) {
    ty = addWrapped(doc, `• ${meaningBody[i]}`, margin + innerPad, ty, innerW, bulletLineMm);
    if (i < meaningBody.length - 1) ty += gapBetweenBullets;
  }
  y = boxTop + meaningBlockH + 6;

  /* --- Page 3: aandachtspunten --- */
  doc.addPage();
  y = margin;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Belangrijk voor jouw situatie", margin, y);
  y += 10;
  for (const item of ins.aandachtItems) {
    const tagLabel =
      item.tag === "[+]" ? "Positief" : item.tag === "[!]" ? "Let op" : "Tip";
    const cardLines = doc.splitTextToSize(item.body, maxW - 12);
    const cardH = 16 + cardLines.length * 4.3;
    y = ensureSpace(doc, y, cardH + 6, margin);
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, maxW, cardH, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
    doc.text(`${tagLabel}: ${item.title}`, margin + 4, y + 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(45, 45, 45);
    doc.text(cardLines, margin + 4, y + 13);
    y += cardH + 5;
  }
  if (ins.aandachtItems.length === 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.2);
    doc.setTextColor(60, 60, 60);
    y = addWrapped(
      doc,
      "Geen extra aandachtspunten automatisch afgeleid — bespreek je situatie toch ruim met je adviseur.",
      margin,
      y,
      maxW,
      4.5,
    );
  }

  /* --- Page 4: gesprek --- */
  doc.addPage();
  y = margin;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Voorbereid op je gesprek", margin, y);
  y += 9;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.text("Dit wil je bespreken", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.3);
  doc.setTextColor(35, 35, 35);
  const fixedQ = [
    "Wat kan ik realistisch lenen in mijn situatie? (laat je adviseur uitleggen hoe zij dit bepalen)",
    "Hoe wordt mijn inkomen (en dat van mijn partner) beoordeeld?",
    "Hoeveel eigen geld heb ik nodig naast de hypotheek voor deze koopsom?",
  ];
  for (const q of fixedQ) {
    y = ensureSpace(doc, y, 10, margin);
    y = addWrapped(doc, `• ${q}`, margin + 2, y, maxW - 2, 4.5);
    y += 3;
  }
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Gerichte vragen op basis van jouw invoer", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.3);
  for (const q of ins.gesprekVragen) {
    y = ensureSpace(doc, y, 12, margin);
    y = addWrapped(doc, `• ${q}`, margin + 2, y, maxW - 2, 4.5);
    y += 2;
  }

  /* --- Page 5: acties --- */
  doc.addPage();
  y = margin;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Wat kun je nu doen?", margin, y);
  y += 10;
  const stappen = [
    {
      n: "Stap 1",
      t: "Check of je spaargeld voldoende lijkt voor kosten koper en eigen bijdrage (bespreek de bandbreedte met je adviseur).",
    },
    {
      n: "Stap 2",
      t: "Bepaal een richtprijs voor de woning die bij je voorbereiding past — scherp of bijstellen mag.",
    },
    {
      n: "Stap 3",
      t: "Plan een gesprek met een erkend hypotheekadviseur en neem dit document mee.",
    },
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(35, 35, 35);
  for (const s of stappen) {
    y = ensureSpace(doc, y, 18, margin);
    doc.setFont("helvetica", "bold");
    doc.text(s.n, margin, y);
    doc.setFont("helvetica", "normal");
    y = addWrapped(doc, s.t, margin + 2, y + 4, maxW - 2, 4.5);
    y += 8;
  }

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(GREEN.r, GREEN.g, GREEN.b);
  doc.text("Documenten die vaak van pas komen", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const docs = [
    "Identiteitsbewijs · recente loonstroken · werkgeversverklaring waar nodig",
    "DUO-overzicht bij studieschuld · overzicht leningen (BKR)",
    "Spaaroverzicht · eventueel concept koopovereenkomst / taxatie",
  ];
  for (const d of docs) {
    y = ensureSpace(doc, y, 8, margin);
    y = addWrapped(doc, `• ${d}`, margin + 2, y, maxW - 2, 4.3);
    y += 2;
  }

  /* --- Page 6: aantekeningen --- */
  doc.addPage();
  drawAantekeningenPage(doc, margin, maxW);

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawFooter(doc, i, totalPages);
  }

  return doc.output("blob");
}

export function slugifyFilenamePart(name: string) {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 40) || "document"
  );
}
