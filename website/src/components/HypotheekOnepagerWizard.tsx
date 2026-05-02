"use client";

import { Info } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  buildHypotheekOnepagerPdf,
  slugifyFilenamePart,
  type OnepagerPdfPayload,
} from "@/lib/hypotheekOnepagerPdf";
import {
  clampNonNeg,
  estimateMaxHypotheek,
  monthlyDebtFromFormFields,
  studyDebtMonthlyImpact,
  type StudyDebtSystem,
} from "@/lib/maxHypotheekIndicatie";

const GREEN = "#1A6B4A";
const AMBER = "#F5A623";
const BG = "#F9F8F5";
const CARD_BORDER = "#E0DDD6";

const INTEREST_RATE = 3.5;

/** Prefill voor opmerkingen bij vrijwillig adviseurscontact */
const DEFAULT_ADVISOR_NOTE =
  "Beste adviseur, dit is mijn situatieschets. Ik wil graag kort sparren over mijn mogelijkheden.";

type AanleidingId = "eerste-huis" | "doorstromen" | "oversluiten" | "tweede-hypotheek";
type AanvragersId = "alleen" | "met-partner";
type DienstverbandId = "vast" | "tijdelijk" | "zzp" | "pensioen" | "uitkering" | "anders";
type IntentieId = "ja" | "nee" | "wordt-geregeld";
type ThreeAware = "niet" | "redelijk" | "goed";

const aanleidingOptions: {
  id: AanleidingId;
  title: string;
  sub: string;
}[] = [
  { id: "eerste-huis", title: "Eerste huis kopen", sub: "Nog geen eigen woning" },
  { id: "doorstromen", title: "Doorstromen", sub: "Huidige woning verkopen of al verkocht" },
  { id: "oversluiten", title: "Oversluiten", sub: "Bestaande hypotheek aanpassen" },
  { id: "tweede-hypotheek", title: "Tweede hypotheek", sub: "Overwaarde of extra lening" },
];

const dienstverbandOptions: { id: DienstverbandId; title: string; sub?: string }[] = [
  { id: "vast", title: "Vast contract" },
  { id: "tijdelijk", title: "Tijdelijk contract" },
  { id: "zzp", title: "ZZP / ondernemer", sub: "Gemiddelde afgelopen 3 jaar" },
  { id: "pensioen", title: "VUT / pensioen" },
  { id: "uitkering", title: "Uitkering" },
  { id: "anders", title: "Anders" },
];

const burgerlijkeStaatOptions = [
  "Ongehuwd",
  "Samenwonend",
  "Geregistreerd partner",
  "Gehuwd",
  "Gescheiden",
] as const;

const tijdlijnOptions = [
  { id: "snel", title: "Zo snel mogelijk" },
  { id: "binnen3", title: "Binnen 3 maanden" },
  { id: "3tot6", title: "3–6 maanden" },
  { id: "onzeker", title: "Nog niet zeker" },
] as const;

type TijdlijnId = (typeof tijdlijnOptions)[number]["id"];

function aanleidingLabel(id: AanleidingId | null) {
  return aanleidingOptions.find((o) => o.id === id)?.title ?? "—";
}

function dienstverbandLabel(id: DienstverbandId | null) {
  return dienstverbandOptions.find((o) => o.id === id)?.title ?? "—";
}

function tijdlijnLabel(id: TijdlijnId | null) {
  return tijdlijnOptions.find((o) => o.id === id)?.title ?? "—";
}

function studySystemLabel(s: StudyDebtSystem) {
  if (s === "new") return "Nieuw stelsel (na sep 2015)";
  if (s === "old") return "Oud stelsel (voor sep 2015)";
  return "Geen studieschuld";
}

function parseIsoDate(value: string): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(value + "T12:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Jaarinkomen als geheel getal: strips alle niet-cijfers zodat NL-notatie 55.000 / 55 000 → 55000.
 * (Een native number-input maakt van "55.000" anders 55.)
 */
function parseJaarInkomenInput(raw: string): number | "" {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  const n = Number(digits);
  if (!Number.isFinite(n)) return "";
  return n;
}

function ageFromBirthDate(birth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function effectiveVariableAnnual(amount: number, certainty: "structureel" | "incidenteel") {
  if (!amount || amount <= 0) return 0;
  return certainty === "structureel" ? amount : amount * 0.5;
}

function totalSteps(hasPartner: boolean) {
  return hasPartner ? 9 : 8;
}

function displayStepNumber(internalStep: number, hasPartner: boolean): number {
  if (!hasPartner && internalStep >= 5) return internalStep - 1;
  return internalStep;
}

function nextInternalStep(current: number, hasPartner: boolean): number {
  if (current === 3) return hasPartner ? 4 : 5;
  if (current === 4) return 5;
  return Math.min(9, current + 1);
}

function prevInternalStep(current: number, hasPartner: boolean): number {
  if (current === 9) return 8;
  if (current === 5) return hasPartner ? 4 : 3;
  if (current === 4) return 3;
  return Math.max(1, current - 1);
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function awareLabel(v: ThreeAware | null) {
  if (!v) return "Niet ingevuld";
  if (v === "niet") return "Niet";
  if (v === "redelijk") return "Redelijk";
  return "Goed";
}

const MONTHS_NL = [
  { v: 1, label: "januari" },
  { v: 2, label: "februari" },
  { v: 3, label: "maart" },
  { v: 4, label: "april" },
  { v: 5, label: "mei" },
  { v: 6, label: "juni" },
  { v: 7, label: "juli" },
  { v: 8, label: "augustus" },
  { v: 9, label: "september" },
  { v: 10, label: "oktober" },
  { v: 11, label: "november" },
  { v: 12, label: "december" },
] as const;

function isValidCalendarDate(y: number, mo: number, d: number) {
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return false;
  const dt = new Date(y, mo - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === mo - 1 && dt.getDate() === d;
}

function buildBirthIso(day: string, month: string, year: string): string {
  if (!day || !month || !year) return "";
  const d = Number(day);
  const mo = Number(month);
  const y = Number(year);
  if (!Number.isFinite(d) || !Number.isFinite(mo) || !Number.isFinite(y)) return "";
  if (!isValidCalendarDate(y, mo, d)) return "";
  return `${y}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function birthYearRange() {
  const cy = new Date().getFullYear();
  const out: number[] = [];
  for (let y = cy - 18; y >= cy - 75; y--) out.push(y);
  return out;
}

function InfoHint({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details
      className="rounded-lg border px-3 py-2 text-xs leading-relaxed text-[#6f6b64]"
      style={{ borderColor: CARD_BORDER, background: BG }}
    >
      <summary className="flex cursor-pointer list-none items-center gap-1.5 font-medium text-[#1A6B4A] [&::-webkit-details-marker]:hidden">
        <Info className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
        {title}
      </summary>
      <div className="mt-2 border-t border-[#E0DDD6] pt-2">{children}</div>
    </details>
  );
}

function MaandBrutoNaarJaarHulp({
  value,
  onChange,
  onApply,
}: {
  value: number | "";
  onChange: (v: number | "") => void;
  onApply: () => void;
}) {
  const preview =
    typeof value === "number" && value > 0 && Number.isFinite(value) ? Math.round(value * 12) : null;

  return (
    <details className="mb-3">
      <summary
        className="cursor-pointer list-none text-xs font-semibold underline-offset-2 hover:underline [&::-webkit-details-marker]:hidden"
        style={{ color: GREEN }}
      >
        Liever per maand berekenen?
      </summary>
      <div
        className="mt-2 rounded-lg border border-dashed px-3 py-2.5"
        style={{ borderColor: CARD_BORDER, background: BG }}
      >
        <p className="text-xs text-[#6f6b64]">
          Alleen je <strong className="font-medium text-[#2c2a26]">bruto contractloon per maand</strong>?
          Vul in en reken door naar per jaar.
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end">
          <label className="flex min-w-0 flex-1 flex-col gap-1 text-xs font-medium text-[#2c2a26]">
            Bruto / maand
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6f6b64]">
                €
              </span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                placeholder="bijv. 4.200"
                value={value === "" ? "" : value}
                onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
                className="min-h-[40px] w-full rounded-lg border py-2 pl-7 pr-2 text-sm outline-none focus:ring-2"
                style={{ borderColor: CARD_BORDER }}
              />
            </div>
          </label>
          <button
            type="button"
            onClick={onApply}
            className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-lg px-3.5 text-sm font-semibold text-white"
            style={{ background: GREEN }}
          >
            × 12 → jaar invullen
          </button>
        </div>
        {preview != null && (
          <p className="mt-2 text-xs text-[#6f6b64]">
            = {formatEuro(preview)} bruto per jaar (afgerond)
          </p>
        )}
      </div>
    </details>
  );
}

export function HypotheekOnepagerWizard() {
  const [phase, setPhase] = useState<"form" | "done">("form");
  const [step, setStep] = useState(1);

  const [aanleiding, setAanleiding] = useState<AanleidingId | null>(null);
  const [aanvragers, setAanvragers] = useState<AanvragersId | null>(null);

  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [burgerlijkeStaat, setBurgerlijkeStaat] = useState("");
  const [burgerlijkeStaatError, setBurgerlijkeStaatError] = useState<string | null>(null);
  const [kinderenJaNee, setKinderenJaNee] = useState<"ja" | "nee" | null>(null);
  const [kinderenAantal, setKinderenAantal] = useState(1);
  const [kinderenFieldError, setKinderenFieldError] = useState<string | null>(null);
  const [rookt, setRookt] = useState<"ja" | "nee" | null>(null);

  const [annualIncome, setAnnualIncome] = useState<number | "">("");
  /** Alleen voor maand→jaar rekenhulpje stap 3 */
  const [maandBrutoAanvrager, setMaandBrutoAanvrager] = useState<number | "">("");
  const [dienstverband, setDienstverband] = useState<DienstverbandId | null>(null);
  const [hasVariableIncome, setHasVariableIncome] = useState(false);
  const [variableIncomeAmount, setVariableIncomeAmount] = useState<number | "">("");
  const [variableIncomeCertainty, setVariableIncomeCertainty] = useState<
    "structureel" | "incidenteel"
  >("structureel");
  const [intentieverklaring, setIntentieverklaring] = useState<IntentieId | null>(null);

  const [partnerAnnualIncome, setPartnerAnnualIncome] = useState<number | "">("");
  const [maandBrutoPartner, setMaandBrutoPartner] = useState<number | "">("");
  const [partnerDienstverband, setPartnerDienstverband] = useState<DienstverbandId | null>(null);
  const [partnerHasVariableIncome, setPartnerHasVariableIncome] = useState(false);
  const [partnerVariableIncomeAmount, setPartnerVariableIncomeAmount] = useState<number | "">("");
  const [partnerVariableIncomeCertainty, setPartnerVariableIncomeCertainty] = useState<
    "structureel" | "incidenteel"
  >("structureel");
  const [partnerIntentieverklaring, setPartnerIntentieverklaring] = useState<IntentieId | null>(
    null,
  );

  const [partnerBirthDay, setPartnerBirthDay] = useState("");
  const [partnerBirthMonth, setPartnerBirthMonth] = useState("");
  const [partnerBirthYear, setPartnerBirthYear] = useState("");
  const [partnerBirthDateError, setPartnerBirthDateError] = useState<string | null>(null);

  const [studyDebt, setStudyDebt] = useState<number | "">("");
  const [studyDebtSystem, setStudyDebtSystem] = useState<StudyDebtSystem>("none");
  const [autoLease, setAutoLease] = useState<number | "">("");
  const [personalLoan, setPersonalLoan] = useState<number | "">("");
  const [alimentatieJaNee, setAlimentatieJaNee] = useState<"ja" | "nee" | null>(null);
  const [alimentatieBedrag, setAlimentatieBedrag] = useState<number | "">("");
  const [creditJaNee, setCreditJaNee] = useState<"ja" | "nee" | null>(null);
  const [creditLimiet, setCreditLimiet] = useState<number | "">("");

  const [koopsom, setKoopsom] = useState<number | "">("");
  const [eigenGeld, setEigenGeld] = useState<number | "">("");
  const [overwaardeKeuze, setOverwaardeKeuze] = useState<"nee" | "ja" | "weet-niet" | null>(null);
  const [overwaardeBedrag, setOverwaardeBedrag] = useState<number | "">("");
  const [tijdlijn, setTijdlijn] = useState<TijdlijnId | null>(null);

  const [pensioenAware, setPensioenAware] = useState<ThreeAware | null>(null);
  const [werkloosheidAware, setWerkloosheidAware] = useState<ThreeAware | null>(null);
  const [aoAware, setAoAware] = useState<ThreeAware | null>(null);
  const [eerderHypotheek, setEerderHypotheek] = useState<"ja" | "nee" | null>(null);
  const [financieleKennis, setFinancieleKennis] = useState<
    "laag" | "redelijk" | "goed" | "zeer-goed" | null
  >(null);

  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  /** Stap “contact”: zoek je een adviseur? */
  const [zoektHypotheekAdvies, setZoektHypotheekAdvies] = useState<"ja" | "nee" | null>(null);
  const [company, setCompany] = useState("");
  const [downloadBusy, setDownloadBusy] = useState(false);
  const [leadMessage, setLeadMessage] = useState<string | null>(null);

  const hasPartner = aanvragers === "met-partner";
  const ts = totalSteps(hasPartner);
  const displayStep = displayStepNumber(step, hasPartner);

  useEffect(() => {
    if (!hasPartner) {
      setPartnerBirthDay("");
      setPartnerBirthMonth("");
      setPartnerBirthYear("");
      setPartnerBirthDateError(null);
    }
  }, [hasPartner]);

  useEffect(() => {
    const sd = typeof studyDebt === "number" ? studyDebt : 0;
    if (sd <= 0 && studyDebtSystem !== "none") setStudyDebtSystem("none");
    else if (sd > 0 && studyDebtSystem === "none") setStudyDebtSystem("new");
  }, [studyDebt, studyDebtSystem]);

  /** Subtiele prefilling na keuze „ja” — alleen als het veld nog leeg is */
  useEffect(() => {
    if (zoektHypotheekAdvies !== "ja") return;
    setNotes((prev) => (prev.trim() === "" ? DEFAULT_ADVISOR_NOTE : prev));
  }, [zoektHypotheekAdvies]);

  /** Verwijder standaardtekst als iemand teruggaat naar alleen-PDF */
  useEffect(() => {
    if (zoektHypotheekAdvies !== "nee") return;
    setNotes((prev) =>
      prev.trim() === DEFAULT_ADVISOR_NOTE.trim() ? "" : prev,
    );
  }, [zoektHypotheekAdvies]);

  const birthIso = useMemo(
    () => buildBirthIso(birthDay, birthMonth, birthYear),
    [birthDay, birthMonth, birthYear],
  );
  const birthParsed = useMemo(() => parseIsoDate(birthIso), [birthIso]);
  const ageYears = birthParsed ? ageFromBirthDate(birthParsed) : null;

  const partnerBirthIso = useMemo(
    () => buildBirthIso(partnerBirthDay, partnerBirthMonth, partnerBirthYear),
    [partnerBirthDay, partnerBirthMonth, partnerBirthYear],
  );
  const partnerBirthParsed = useMemo(() => parseIsoDate(partnerBirthIso), [partnerBirthIso]);
  const partnerAgeYears = partnerBirthParsed ? ageFromBirthDate(partnerBirthParsed) : null;

  const incomeApplicantNum =
    typeof annualIncome === "number" ? clampNonNeg(annualIncome) : 0;
  const incomePartnerNum =
    typeof partnerAnnualIncome === "number" ? clampNonNeg(partnerAnnualIncome) : 0;

  const varApplicant = effectiveVariableAnnual(
    typeof variableIncomeAmount === "number" ? variableIncomeAmount : 0,
    variableIncomeCertainty,
  );
  const varPartner = effectiveVariableAnnual(
    typeof partnerVariableIncomeAmount === "number" ? partnerVariableIncomeAmount : 0,
    partnerVariableIncomeCertainty,
  );

  const effectiveAnnualApplicant =
    incomeApplicantNum + (hasVariableIncome ? varApplicant : 0);
  const effectiveAnnualPartner =
    hasPartner ? incomePartnerNum + (partnerHasVariableIncome ? varPartner : 0) : 0;

  const grossIncome = effectiveAnnualApplicant + effectiveAnnualPartner;

  const monthlyExtras = monthlyDebtFromFormFields({
    autoLeaseMonthly: typeof autoLease === "number" ? autoLease : 0,
    personalLoanOutstanding: typeof personalLoan === "number" ? personalLoan : 0,
    alimentatieMonthly:
      alimentatieJaNee === "ja" && typeof alimentatieBedrag === "number"
        ? alimentatieBedrag
        : 0,
    creditLimit:
      creditJaNee === "ja" && typeof creditLimiet === "number" ? creditLimiet : 0,
  });

  const studyDebtNum = typeof studyDebt === "number" ? studyDebt : 0;
  const resolvedStudySystem: StudyDebtSystem =
    studyDebtNum <= 0 ? "none" : studyDebtSystem === "none" ? "new" : studyDebtSystem;

  const studyMonthly = studyDebtMonthlyImpact(studyDebtNum, resolvedStudySystem);

  const estimatedMax = useMemo(
    () =>
      estimateMaxHypotheek({
        annualIncome: effectiveAnnualApplicant,
        hasPartnerIncome: hasPartner,
        partnerIncome: hasPartner ? effectiveAnnualPartner : 0,
        monthlyDebt: monthlyExtras,
        studyDebt: studyDebtNum,
        studyDebtSystem: resolvedStudySystem,
        interestRate: INTEREST_RATE,
      }),
    [
      effectiveAnnualApplicant,
      effectiveAnnualPartner,
      hasPartner,
      monthlyExtras,
      studyDebtNum,
      resolvedStudySystem,
    ],
  );

  function validateBirthForNextStep(): boolean {
    if (!birthDay || !birthMonth || !birthYear) {
      setBirthDateError("Vul je geboortedatum volledig in (dag, maand en jaar).");
      return false;
    }
    if (!birthIso) {
      setBirthDateError("Deze datum bestaat niet. Controleer dag en maand.");
      return false;
    }
    const d = parseIsoDate(birthIso);
    if (!d) {
      setBirthDateError("Vul een geldige geboortedatum in.");
      return false;
    }
    const age = ageFromBirthDate(d);
    if (age < 18 || age > 75) {
      setBirthDateError(
        "We gebruiken hier een leeftijd tussen 18 en 75 jaar. Controleer je geboortejaar — niet vandaag of in de toekomst.",
      );
      return false;
    }
    setBirthDateError(null);
    return true;
  }

  function validateStep2ForNext(): boolean {
    let ok = true;
    if (!burgerlijkeStaat.trim()) {
      setBurgerlijkeStaatError("Maak een keuze.");
      ok = false;
    } else {
      setBurgerlijkeStaatError(null);
    }
    if (!validateBirthForNextStep()) ok = false;
    if (
      kinderenJaNee === "ja" &&
      (kinderenAantal < 1 || kinderenAantal > 6 || Number.isNaN(kinderenAantal))
    ) {
      setKinderenFieldError("Vul een aantal tussen 1 en 6 in.");
      ok = false;
    } else {
      setKinderenFieldError(null);
    }
    return ok;
  }

  function validateBirthFields() {
    const anyFilled = Boolean(birthDay || birthMonth || birthYear);
    const allFilled = Boolean(birthDay && birthMonth && birthYear);
    if (!anyFilled) {
      setBirthDateError(null);
      return;
    }
    if (!allFilled) {
      setBirthDateError(null);
      return;
    }
    if (!birthIso) {
      setBirthDateError("Deze datum bestaat niet. Controleer dag en maand.");
      return;
    }
    const d = parseIsoDate(birthIso);
    if (!d) {
      setBirthDateError("Vul een geldige geboortedatum in.");
      return;
    }
    const age = ageFromBirthDate(d);
    if (age < 18 || age > 75) {
      setBirthDateError(
        "Voor deze stap gebruiken we een leeftijd tussen 18 en 75 jaar. Klopt je geboortedatum?",
      );
      return;
    }
    setBirthDateError(null);
  }

  function validatePartnerBirthForNextStep(): boolean {
    if (!hasPartner) return true;
    if (!partnerBirthDay || !partnerBirthMonth || !partnerBirthYear) {
      setPartnerBirthDateError("Vul de geboortedatum van je partner volledig in (dag, maand en jaar).");
      return false;
    }
    if (!partnerBirthIso) {
      setPartnerBirthDateError("Deze datum bestaat niet. Controleer dag en maand.");
      return false;
    }
    const d = parseIsoDate(partnerBirthIso);
    if (!d) {
      setPartnerBirthDateError("Vul een geldige geboortedatum in.");
      return false;
    }
    const age = ageFromBirthDate(d);
    if (age < 18 || age > 75) {
      setPartnerBirthDateError(
        "We gebruiken hier een leeftijd tussen 18 en 75 jaar. Controleer het geboortejaar van je partner.",
      );
      return false;
    }
    setPartnerBirthDateError(null);
    return true;
  }

  function validatePartnerBirthFields() {
    if (!hasPartner) {
      setPartnerBirthDateError(null);
      return;
    }
    const anyFilled = Boolean(partnerBirthDay || partnerBirthMonth || partnerBirthYear);
    const allFilled = Boolean(partnerBirthDay && partnerBirthMonth && partnerBirthYear);
    if (!anyFilled) {
      setPartnerBirthDateError(null);
      return;
    }
    if (!allFilled) {
      setPartnerBirthDateError(null);
      return;
    }
    if (!partnerBirthIso) {
      setPartnerBirthDateError("Deze datum bestaat niet. Controleer dag en maand.");
      return;
    }
    const d = parseIsoDate(partnerBirthIso);
    if (!d) {
      setPartnerBirthDateError("Vul een geldige geboortedatum in.");
      return;
    }
    const age = ageFromBirthDate(d);
    if (age < 18 || age > 75) {
      setPartnerBirthDateError(
        "Voor deze stap gebruiken we een leeftijd tussen 18 en 75 jaar. Klopt de geboortedatum van je partner?",
      );
      return;
    }
    setPartnerBirthDateError(null);
  }

  function validateStep4ForNext(): boolean {
    return validatePartnerBirthForNextStep();
  }

  function validateEmailBlur() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!email.trim()) {
      setEmailError(null);
      return;
    }
    setEmailError(ok ? null : "Vul een geldig e-mailadres in.");
  }

  function step2Ok() {
    const d = birthParsed;
    const ageOk = d
      ? (() => {
          const a = ageFromBirthDate(d);
          return a >= 18 && a <= 75;
        })()
      : false;
    const kinderenOk =
      kinderenJaNee == null ||
      kinderenJaNee === "nee" ||
      (kinderenAantal >= 1 && kinderenAantal <= 6);
    return ageOk && burgerlijkeStaat.trim().length > 0 && kinderenOk;
  }

  /** Korte uitleg waarom stap 2 nog niet verder kan (knop staat uit tot dit klopt). */
  function step2PendingHints(): string | null {
    const parts: string[] = [];
    if (!birthDay || !birthMonth || !birthYear) {
      parts.push("geboortedatum (dag, maand en jaar)");
    } else if (!birthParsed || ageYears == null || ageYears < 18 || ageYears > 75) {
      parts.push("geldige geboortedatum (leeftijd 18–75 jaar)");
    }
    if (!burgerlijkeStaat.trim()) parts.push("burgerlijke staat");
    if (
      kinderenJaNee === "ja" &&
      (kinderenAantal < 1 || kinderenAantal > 6 || Number.isNaN(kinderenAantal))
    ) {
      parts.push("aantal kinderen tussen 1 en 6");
    }
    return parts.length > 0 ? `Nog nodig: ${parts.join(" · ")}.` : null;
  }

  function step3Ok() {
    const inc = typeof annualIncome === "number" ? annualIncome : 0;
    const incomeOk = inc >= 15000 && inc <= 500000;
    const base = incomeOk && dienstverband != null;
    const variableOk =
      !hasVariableIncome ||
      (typeof variableIncomeAmount === "number" &&
        variableIncomeAmount > 0 &&
        variableIncomeCertainty != null);
    const intentOk =
      dienstverband !== "tijdelijk" ||
      intentieverklaring != null;
    return base && variableOk && intentOk;
  }

  function step4Ok() {
    if (!hasPartner) return true;
    const birthOk =
      partnerBirthParsed != null &&
      (() => {
        const a = ageFromBirthDate(partnerBirthParsed);
        return a >= 18 && a <= 75;
      })();
    if (!birthOk) return false;
    const inc = typeof partnerAnnualIncome === "number" ? partnerAnnualIncome : 0;
    const incomeOk = inc >= 15000 && inc <= 500000;
    const base = incomeOk && partnerDienstverband != null;
    const variableOk =
      !partnerHasVariableIncome ||
      (typeof partnerVariableIncomeAmount === "number" &&
        partnerVariableIncomeAmount > 0 &&
        partnerVariableIncomeCertainty != null);
    const intentOk =
      partnerDienstverband !== "tijdelijk" ||
      partnerIntentieverklaring != null;
    return base && variableOk && intentOk;
  }

  function step5Ok() {
    const studyOk =
      studyDebtNum <= 0 ||
      (studyDebtSystem === "new" || studyDebtSystem === "old");
    const alimOk =
      alimentatieJaNee != null &&
      (alimentatieJaNee === "nee" ||
        (typeof alimentatieBedrag === "number" && alimentatieBedrag >= 0));
    const credOk =
      creditJaNee != null &&
      (creditJaNee === "nee" ||
        (typeof creditLimiet === "number" && creditLimiet >= 0));
    return studyOk && alimOk && credOk;
  }

  function step6Ok() {
    const eg = typeof eigenGeld === "number" ? eigenGeld : null;
    const eigenOk = eg !== null && eg >= 0;
    const tijdOk = tijdlijn != null;
    const doorstromen = aanleiding === "doorstromen";
    const owOk =
      !doorstromen ||
      overwaardeKeuze != null &&
        (overwaardeKeuze !== "ja" ||
          (typeof overwaardeBedrag === "number" && overwaardeBedrag >= 0));
    return eigenOk && tijdOk && owOk;
  }

  function step8Ok() {
    return zoektHypotheekAdvies !== null;
  }

  /** Contactpagina na keuze „Ja”; velden optioneel voor PDF, lead pas bij complete invoer */
  function step9Ok() {
    return true;
  }

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return aanleiding != null && aanvragers != null;
      case 2:
        return step2Ok();
      case 3:
        return step3Ok();
      case 4:
        return step4Ok();
      case 5:
        return step5Ok();
      case 6:
        return step6Ok();
      case 7:
        return true;
      case 8:
        return step8Ok();
      case 9:
        return step9Ok();
      default:
        return false;
    }
  }

  const variableApplicantDisplay =
    hasVariableIncome && typeof variableIncomeAmount === "number" && variableIncomeAmount > 0
      ? `${formatEuro(variableIncomeAmount)} per jaar (${variableIncomeCertainty === "structureel" ? "structureel" : "incidenteel (50% meegewogen)"})`
      : undefined;

  const variablePartnerDisplay =
    partnerHasVariableIncome &&
    typeof partnerVariableIncomeAmount === "number" &&
    partnerVariableIncomeAmount > 0
      ? `${formatEuro(partnerVariableIncomeAmount)} per jaar (${partnerVariableIncomeCertainty === "structureel" ? "structureel" : "incidenteel (50% meegewogen)"})`
      : undefined;

  const intentLabel = (i: IntentieId | null) =>
    i === "ja" ? "Ja" : i === "nee" ? "Nee" : i === "wordt-geregeld" ? "Wordt geregeld" : undefined;

  const kinderenDisplay =
    kinderenJaNee == null
      ? "Niet ingevuld"
      : kinderenJaNee === "nee"
        ? "Geen"
        : `Ja, ${kinderenAantal}`;

  const overwaardeDisplay =
    aanleiding === "doorstromen"
      ? overwaardeKeuze === "ja" && typeof overwaardeBedrag === "number"
        ? formatEuro(overwaardeBedrag)
        : overwaardeKeuze === "nee"
          ? "Nee"
          : overwaardeKeuze === "weet-niet"
            ? "Weet ik nog niet"
            : "—"
      : undefined;

  const financieleKennisLabel =
    financieleKennis === "laag"
      ? "Laag"
      : financieleKennis === "redelijk"
        ? "Redelijk"
        : financieleKennis === "goed"
          ? "Goed"
          : financieleKennis === "zeer-goed"
            ? "Zeer goed"
            : "Niet ingevuld";

  const pdfPayload: OnepagerPdfPayload = useMemo(
    () => ({
      generatedAt: new Intl.DateTimeFormat("nl-NL", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date()),
      fullName: `${voornaam.trim()} ${achternaam.trim()}`.trim(),
      voornaam: voornaam.trim(),
      achternaam: achternaam.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      aanleidingLabel: aanleidingLabel(aanleiding),
      aanvragersLabel: hasPartner ? "Met partner" : "Alleen aanvrager",
      birthDateDisplay: birthParsed
        ? new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(birthParsed)
        : "",
      ageYears: ageYears ?? 0,
      burgerlijkeStaat: burgerlijkeStaat || "—",
      kinderenDisplay,
      rooktDisplay:
        rookt === "ja" ? "Ja" : rookt === "nee" ? "Nee" : "Niet ingevuld",
      annualIncomeApplicant: incomeApplicantNum,
      dienstverbandApplicant: dienstverbandLabel(dienstverband),
      variableIncomeApplicantDisplay: variableApplicantDisplay,
      intentieverklaringDisplay:
        dienstverband === "tijdelijk" ? intentLabel(intentieverklaring) : undefined,
      partnerAnnualIncome: hasPartner ? incomePartnerNum : null,
      partnerDienstverband: hasPartner ? dienstverbandLabel(partnerDienstverband) : null,
      partnerVariableIncomeDisplay: hasPartner ? variablePartnerDisplay : undefined,
      partnerIntentieverklaringDisplay:
        hasPartner && partnerDienstverband === "tijdelijk"
          ? intentLabel(partnerIntentieverklaring)
          : undefined,
      partnerBirthDateDisplay:
        hasPartner && partnerBirthParsed
          ? new Intl.DateTimeFormat("nl-NL", { dateStyle: "long" }).format(partnerBirthParsed)
          : null,
      partnerAgeYears: hasPartner ? partnerAgeYears : null,
      studyDebt: studyDebtNum,
      studyDebtSystem: resolvedStudySystem,
      studyDebtSystemLabel: studySystemLabel(resolvedStudySystem),
      autoLeaseMonthly: typeof autoLease === "number" ? autoLease : 0,
      personalLoanOutstanding: typeof personalLoan === "number" ? personalLoan : 0,
      alimentatieMonthly:
        alimentatieJaNee === "ja" && typeof alimentatieBedrag === "number"
          ? alimentatieBedrag
          : 0,
      creditLimit:
        creditJaNee === "ja" && typeof creditLimiet === "number" ? creditLimiet : 0,
      totalMonthlyDebtExStudy: monthlyExtras,
      studyMonthly,
      targetPrice: typeof koopsom === "number" && koopsom > 0 ? koopsom : null,
      savings: typeof eigenGeld === "number" ? eigenGeld : 0,
      overwaardeDisplay,
      tijdlijnLabel: tijdlijnLabel(tijdlijn),
      grossIncome,
      pensioenAware: awareLabel(pensioenAware),
      werkloosheidAware: awareLabel(werkloosheidAware),
      aoAware: awareLabel(aoAware),
      eerderHypotheek:
        eerderHypotheek === "ja" ? "Ja" : eerderHypotheek === "nee" ? "Nee" : "Niet ingevuld",
      financieleKennis: financieleKennisLabel,
      notes: notes.trim() || undefined,
      highlightOrientationStep: tijdlijn === "snel",
      pdfContext: {
        metPartner: hasPartner,
        variableIncomeApplicant:
          hasVariableIncome &&
          typeof variableIncomeAmount === "number" &&
          variableIncomeAmount > 0,
        variableIncomePartner:
          hasPartner &&
          partnerHasVariableIncome &&
          typeof partnerVariableIncomeAmount === "number" &&
          partnerVariableIncomeAmount > 0,
        aanvragerDienstverband: dienstverband,
        partnerDienstverband: hasPartner ? partnerDienstverband : null,
      },
    }),
    [
      voornaam,
      achternaam,
      email,
      phone,
      aanleiding,
      hasPartner,
      birthParsed,
      birthIso,
      ageYears,
      burgerlijkeStaat,
      kinderenDisplay,
      rookt,
      incomeApplicantNum,
      dienstverband,
      variableApplicantDisplay,
      intentieverklaring,
      incomePartnerNum,
      partnerDienstverband,
      variablePartnerDisplay,
      partnerIntentieverklaring,
      partnerBirthParsed,
      partnerAgeYears,
      studyDebtNum,
      resolvedStudySystem,
      autoLease,
      personalLoan,
      alimentatieJaNee,
      alimentatieBedrag,
      creditJaNee,
      creditLimiet,
      monthlyExtras,
      studyMonthly,
      koopsom,
      eigenGeld,
      overwaardeDisplay,
      tijdlijn,
      estimatedMax,
      grossIncome,
      pensioenAware,
      werkloosheidAware,
      aoAware,
      eerderHypotheek,
      financieleKennisLabel,
      notes,
      hasVariableIncome,
      variableIncomeAmount,
      partnerHasVariableIncome,
      partnerVariableIncomeAmount,
    ],
  );

  async function handleDownloadPdf() {
    setDownloadBusy(true);
    setLeadMessage(null);
    try {
      const blob = buildHypotheekOnepagerPdf(pdfPayload);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const namePart = [voornaam, achternaam].map((s) => s.trim()).filter(Boolean).join("-");
      const fn = namePart ? slugifyFilenamePart(namePart) : "situatieschets";
      a.download = `hypotheek-situatieschets-${fn}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      const sendLead =
        zoektHypotheekAdvies === "ja" &&
        voornaam.trim().length >= 2 &&
        achternaam.trim().length >= 1 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
        (() => {
          const phoneDigits = phone.replace(/\D/g, "");
          return phoneDigits.length >= 9 && phoneDigits.length <= 15;
        })();

      void fetch("/api/situatieschets-pdf-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hasPartner,
          advisorOptIn: zoektHypotheekAdvies === "ja",
          leadEligible: sendLead,
        }),
      }).catch(() => {});

      if (sendLead) {
        const res = await fetch("/api/hypotheek-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company,
            advisorContactConsent: true,
            zoektHypotheekAdvies,
            email: email.trim(),
            name: pdfPayload.fullName.trim(),
            phone: phone.trim(),
            notes: notes.trim() || undefined,
            estimatedMax,
            aanleiding,
            tijdlijn,
            grossIncome,
            interestRate: INTEREST_RATE,
            studyMonthly,
            hasPartner,
            consentRecordedAt: new Date().toISOString(),
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; stored?: boolean };
        if (res.ok && data.ok && data.stored) {
          setLeadMessage(
            "Bedankt — we nemen contact op voor een vrijblijvend gesprek. Je PDF staat in je downloads.",
          );
        } else if (res.ok) {
          setLeadMessage("Je PDF staat in je downloads. Vragen? Zie de contactpagina.");
        } else {
          setLeadMessage("Je PDF staat in je downloads.");
        }
      } else {
        setLeadMessage(null);
      }
    } finally {
      setDownloadBusy(false);
    }
  }

  function handleSubmitForm() {
    validateEmailBlur();
    if (step === 8 && !step8Ok()) return;
    if (step === 9 && !step9Ok()) return;
    setPhase("done");
  }

  const cardBtn =
    "min-h-[44px] rounded-xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  if (phase === "done") {
    return (
      <div className="mx-auto max-w-lg px-1">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes situ-check-pop {
            0% { transform: scale(0); opacity: 0; }
            70% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          .situ-check-animate { animation: situ-check-pop 0.55s ease-out forwards; }
        `,
        }}
        />
        <div
          className="rounded-[12px] border bg-white p-8 shadow-sm"
          style={{ borderColor: CARD_BORDER, background: "#fff" }}
        >
          <div
            className="situ-check-animate mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: `${GREEN}18` }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" aria-hidden style={{ color: GREEN }}>
              <path
                fill="currentColor"
                d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
              />
            </svg>
          </div>
          <h2 className="font-display text-center text-2xl font-normal text-[#2c2a26]">
            Je situatieschets is klaar.
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-[#6f6b64]">
            Download je PDF en neem hem mee naar je adviseur.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => void handleDownloadPdf()}
              disabled={downloadBusy}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl px-5 text-base font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-60"
              style={{ background: GREEN }}
            >
              {downloadBusy ? "Bezig…" : "↓ Download mijn situatieschets (PDF)"}
            </button>
          </div>

          {leadMessage && (
            <p className="mt-4 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: CARD_BORDER, background: "#E8F5EE", color: "#2c2a26" }}>
              {leadMessage}
            </p>
          )}

          <div
            className="mt-6 rounded-xl px-4 py-3 text-sm leading-relaxed"
            style={{ background: "#E8F5EE", color: "#2c2a26" }}
          >
            Bewaar je PDF goed — dit is jouw voorbereiding voor het adviseursgesprek. Een erkend
            adviseur beoordeelt jouw situatie definitief.
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-[#6f6b64]">
            Geen financieel advies. KlaarVoorAdvies is een voorbereidingstool. Raadpleeg altijd een
            erkend financieel adviseur voor bindende beslissingen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl" style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>
      <div className="mb-4">
        <p className="text-sm font-semibold text-[#2c2a26]">
          Stap {displayStep} van {ts}
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ background: "#E0DDD6" }}>
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${(displayStep / ts) * 100}%`,
              background: GREEN,
            }}
          />
        </div>
      </div>

      <div
        className="rounded-[12px] border bg-white p-5 shadow-sm sm:p-8"
        style={{ borderColor: CARD_BORDER, background: "#fff" }}
      >
        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Wat is jouw situatie?
            </h2>

            <p className="mt-6 text-sm font-semibold text-[#2c2a26]">Waar ben je mee bezig?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {aanleidingOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAanleiding(opt.id)}
                  className={cardBtn}
                  style={{
                    borderColor: aanleiding === opt.id ? AMBER : CARD_BORDER,
                    background: aanleiding === opt.id ? `${AMBER}14` : BG,
                  }}
                >
                  <span style={{ color: GREEN }}>{opt.title}</span>
                  <span className="mt-1 block text-xs font-normal text-[#6f6b64]">{opt.sub}</span>
                </button>
              ))}
            </div>

            <p className="mt-8 text-sm font-semibold text-[#2c2a26]">Wie vraagt de hypotheek aan?</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(
                [
                  { id: "alleen" as const, label: "Alleen" },
                  { id: "met-partner" as const, label: "Met partner" },
                ]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAanvragers(opt.id)}
                  className={cardBtn + " text-center"}
                  style={{
                    borderColor: aanvragers === opt.id ? AMBER : CARD_BORDER,
                    background: aanvragers === opt.id ? `${AMBER}14` : BG,
                    color: GREEN,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Even jezelf voorstellen
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Alleen wat relevant is voor je situatieschets.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <span className="text-sm font-medium text-[#2c2a26]">Geboortedatum</span>
                <p className="mt-1 text-xs text-[#6f6b64]">
                  Kies dag, maand en jaar — zo voorkom je verwarring met een kalender (zoals
                  dag/maand omgedraaid).
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <label className="flex flex-col gap-1 text-xs font-medium text-[#6f6b64]">
                    Dag
                    <select
                      value={birthDay}
                      onChange={(e) => {
                        setBirthDay(e.target.value);
                      }}
                      onBlur={validateBirthFields}
                      className="min-h-[44px] rounded-xl border bg-white px-2 py-2.5 text-sm text-[#2c2a26] outline-none focus:ring-2"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <option value="">—</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-medium text-[#6f6b64]">
                    Maand
                    <select
                      value={birthMonth}
                      onChange={(e) => {
                        setBirthMonth(e.target.value);
                      }}
                      onBlur={validateBirthFields}
                      className="min-h-[44px] rounded-xl border bg-white px-2 py-2.5 text-sm text-[#2c2a26] outline-none focus:ring-2"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <option value="">—</option>
                      {MONTHS_NL.map((m) => (
                        <option key={m.v} value={String(m.v)}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-medium text-[#6f6b64]">
                    Jaar
                    <select
                      value={birthYear}
                      onChange={(e) => {
                        setBirthYear(e.target.value);
                      }}
                      onBlur={validateBirthFields}
                      className="min-h-[44px] rounded-xl border bg-white px-2 py-2.5 text-sm text-[#2c2a26] outline-none focus:ring-2"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <option value="">—</option>
                      {birthYearRange().map((y) => (
                        <option key={y} value={String(y)}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {birthDateError && (
                  <span className="mt-2 block text-xs font-normal text-red-600">{birthDateError}</span>
                )}
                <div className="mt-3">
                  <InfoHint title="Waarom je geboortedatum?">
                    Je leeftijd staat op je situatieschets zodat een adviseur snel ziet of je binnen
                    een gebruikelijke bandbreedte valt voor een hypotheek — dit is géén
                    doorslaggevende toets, wel handig voor het eerste gesprek.
                  </InfoHint>
                </div>
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-[#2c2a26]">
                Burgerlijke staat
                <select
                  value={burgerlijkeStaat}
                  onChange={(e) => {
                    setBurgerlijkeStaat(e.target.value);
                    setBurgerlijkeStaatError(null);
                  }}
                  className="min-h-[44px] rounded-xl border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2"
                  style={{ borderColor: CARD_BORDER }}
                >
                  <option value="">Kies…</option>
                  {burgerlijkeStaatOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                {burgerlijkeStaatError && (
                  <span className="text-xs font-normal text-red-600">{burgerlijkeStaatError}</span>
                )}
              </label>

              <fieldset className="border-0 p-0">
                <legend className="text-sm font-medium text-[#2c2a26]">
                  Kinderen <span className="font-normal text-[#6f6b64]">(optioneel)</span>
                </legend>
                <div className="mt-2 flex gap-2">
                  {(["nee", "ja"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setKinderenJaNee(v);
                        setKinderenFieldError(null);
                      }}
                      className={
                        cardBtn +
                        " flex-1 text-center " +
                        (kinderenJaNee === v ? "" : "font-normal text-[#6f6b64]")
                      }
                      style={{
                        borderColor: kinderenJaNee === v ? AMBER : CARD_BORDER,
                        background: kinderenJaNee === v ? `${AMBER}14` : BG,
                        color: GREEN,
                      }}
                    >
                      {v === "ja" ? "Ja" : "Nee"}
                    </button>
                  ))}
                </div>
                {kinderenJaNee === "ja" && (
                  <label className="mt-3 flex flex-col gap-1 text-sm text-[#2c2a26]">
                    Hoeveel?
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={6}
                      value={kinderenAantal}
                      onChange={(e) => {
                        setKinderenAantal(Number(e.target.value));
                        setKinderenFieldError(null);
                      }}
                      className="min-h-[44px] rounded-xl border px-3 py-2"
                      style={{ borderColor: CARD_BORDER }}
                    />
                  </label>
                )}
                {kinderenFieldError && (
                  <span className="mt-2 block text-xs text-red-600">{kinderenFieldError}</span>
                )}
                <div className="mt-3">
                  <InfoHint title="Waarom vragen we dit?">
                    Het aantal kinderen kan meespelen bij onder andere kindgebonden budget en
                    toeslagen — je adviseur kan je situatie zo completer in beeld krijgen.
                  </InfoHint>
                </div>
              </fieldset>

              <fieldset className="border-0 p-0">
                <legend className="text-sm font-medium text-[#2c2a26]">
                  Rookt u? <span className="font-normal text-[#6f6b64]">(optioneel)</span>
                </legend>
                <div className="mt-2 flex gap-2">
                  {(["nee", "ja"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setRookt(v)}
                      className={cardBtn + " flex-1 text-center"}
                      style={{
                        borderColor: rookt === v ? AMBER : CARD_BORDER,
                        background: rookt === v ? `${AMBER}14` : BG,
                        color: GREEN,
                      }}
                    >
                      {v === "ja" ? "Ja" : "Nee"}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <InfoHint title="Waarom vragen we dit?">
                    Bij een overlijdensrisicoverzekering kan roken invloed hebben op premie en
                    acceptatie. Als je dit nu niet invult, bespreek het gewoon met je adviseur.
                  </InfoHint>
                </div>
              </fieldset>

              {(kinderenJaNee !== null || rookt !== null) && (
                <button
                  type="button"
                  onClick={() => {
                    setKinderenJaNee(null);
                    setRookt(null);
                    setKinderenFieldError(null);
                  }}
                  className="text-left text-xs font-medium underline-offset-2 hover:underline"
                  style={{ color: GREEN }}
                >
                  Optionele antwoorden wissen
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Jouw inkomen
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Bruto per jaar, vóór belasting. Dat is waar geldverstrekkers naar kijken.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <label className="flex flex-col gap-1.5 text-sm font-medium text-[#2c2a26]">
                Bruto jaarinkomen vast
                <MaandBrutoNaarJaarHulp
                  value={maandBrutoAanvrager}
                  onChange={setMaandBrutoAanvrager}
                  onApply={() => {
                    const m = typeof maandBrutoAanvrager === "number" ? maandBrutoAanvrager : 0;
                    if (!(m > 0)) return;
                    setAnnualIncome(Math.round(m * 12));
                  }}
                />
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6f6b64]">
                    €
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="bijv. 55000 of 55.000"
                    value={annualIncome === "" ? "" : String(annualIncome)}
                    onChange={(e) => setAnnualIncome(parseJaarInkomenInput(e.target.value))}
                    className="min-h-[44px] w-full rounded-xl border py-2.5 pl-7 pr-3 text-sm outline-none focus:ring-2"
                    style={{ borderColor: CARD_BORDER }}
                  />
                </div>
              </label>

              <div>
                <p className="text-sm font-medium text-[#2c2a26]">Dienstverband</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {dienstverbandOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDienstverband(opt.id)}
                      className={cardBtn}
                      style={{
                        borderColor: dienstverband === opt.id ? AMBER : CARD_BORDER,
                        background: dienstverband === opt.id ? `${AMBER}14` : BG,
                      }}
                    >
                      <span style={{ color: GREEN }}>{opt.title}</span>
                      {opt.sub && (
                        <span className="mt-1 block text-xs font-normal text-[#6f6b64]">
                          {opt.sub}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border p-4" style={{ borderColor: CARD_BORDER, background: BG }}>
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#2c2a26]">
                  <input
                    type="checkbox"
                    checked={hasVariableIncome}
                    onChange={(e) => setHasVariableIncome(e.target.checked)}
                    className="h-5 w-5 accent-[#1A6B4A]"
                  />
                  Ontvang je ook variabel inkomen of bonus?
                </label>
                {hasVariableIncome && (
                  <div className="mt-4 grid gap-3">
                    <label className="flex flex-col gap-1 text-sm text-[#2c2a26]">
                      Gemiddeld per jaar (bruto)
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                          €
                        </span>
                        <input
                          type="number"
                          value={variableIncomeAmount === "" ? "" : variableIncomeAmount}
                          onChange={(e) =>
                            setVariableIncomeAmount(
                              e.target.value === "" ? "" : Number(e.target.value),
                            )
                          }
                          className="min-h-[44px] w-full rounded-xl border py-2 pl-7 pr-2"
                          style={{ borderColor: CARD_BORDER }}
                        />
                      </div>
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-[#2c2a26]">
                      Hoe zeker is dit inkomen?
                      <select
                        value={variableIncomeCertainty}
                        onChange={(e) =>
                          setVariableIncomeCertainty(
                            e.target.value as "structureel" | "incidenteel",
                          )
                        }
                        className="min-h-[44px] rounded-xl border px-2"
                        style={{ borderColor: CARD_BORDER }}
                      >
                        <option value="structureel">Structureel</option>
                        <option value="incidenteel">Incidenteel</option>
                      </select>
                    </label>
                  </div>
                )}
              </div>

              {dienstverband === "tijdelijk" && (
                <fieldset>
                  <legend className="text-sm font-medium text-[#2c2a26]">
                    Intentieverklaring werkgever beschikbaar?
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      [
                        { id: "ja" as const, label: "Ja" },
                        { id: "nee" as const, label: "Nee" },
                        { id: "wordt-geregeld" as const, label: "Wordt geregeld" },
                      ]
                    ).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setIntentieverklaring(o.id)}
                        className={cardBtn + " flex-1 min-w-[100px] text-center"}
                        style={{
                          borderColor: intentieverklaring === o.id ? AMBER : CARD_BORDER,
                          background: intentieverklaring === o.id ? `${AMBER}14` : BG,
                          color: GREEN,
                        }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          </div>
        )}

        {/* Step 4 partner */}
        {step === 4 && hasPartner && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Gegevens van je partner
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Geboortedatum en inkomen — beide horen in je overzicht voor de adviseur.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <span className="text-sm font-medium text-[#2c2a26]">Geboortedatum partner</span>
                <p className="mt-1 text-xs text-[#6f6b64]">
                  Zelfde opzet als bij jou: dag, maand en jaar — zo blijft de PDF duidelijk voor je
                  adviseur.
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <label className="flex flex-col gap-1 text-xs font-medium text-[#6f6b64]">
                    Dag
                    <select
                      value={partnerBirthDay}
                      onChange={(e) => {
                        setPartnerBirthDay(e.target.value);
                      }}
                      onBlur={validatePartnerBirthFields}
                      className="min-h-[44px] rounded-xl border bg-white px-2 py-2.5 text-sm text-[#2c2a26] outline-none focus:ring-2"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <option value="">—</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-medium text-[#6f6b64]">
                    Maand
                    <select
                      value={partnerBirthMonth}
                      onChange={(e) => {
                        setPartnerBirthMonth(e.target.value);
                      }}
                      onBlur={validatePartnerBirthFields}
                      className="min-h-[44px] rounded-xl border bg-white px-2 py-2.5 text-sm text-[#2c2a26] outline-none focus:ring-2"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <option value="">—</option>
                      {MONTHS_NL.map((m) => (
                        <option key={m.v} value={String(m.v)}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-xs font-medium text-[#6f6b64]">
                    Jaar
                    <select
                      value={partnerBirthYear}
                      onChange={(e) => {
                        setPartnerBirthYear(e.target.value);
                      }}
                      onBlur={validatePartnerBirthFields}
                      className="min-h-[44px] rounded-xl border bg-white px-2 py-2.5 text-sm text-[#2c2a26] outline-none focus:ring-2"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <option value="">—</option>
                      {birthYearRange().map((y) => (
                        <option key={y} value={String(y)}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {partnerBirthDateError && (
                  <span className="mt-2 block text-xs font-normal text-red-600">
                    {partnerBirthDateError}
                  </span>
                )}
                <div className="mt-3">
                  <InfoHint title="Waarom de geboortedatum van je partner?">
                    Net als bij jou staat de leeftijd op de situatieschets zodat een adviseur in één
                    oogopslag ziet of jullie beide binnen een gebruikelijke bandbreedte vallen — handig
                    voor het eerste gesprek, geen definitieve toets.
                  </InfoHint>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#2c2a26]">Inkomen van je partner</p>

              <label className="flex flex-col gap-1.5 text-sm font-medium text-[#2c2a26]">
                Bruto jaarinkomen vast partner
                <MaandBrutoNaarJaarHulp
                  value={maandBrutoPartner}
                  onChange={setMaandBrutoPartner}
                  onApply={() => {
                    const m = typeof maandBrutoPartner === "number" ? maandBrutoPartner : 0;
                    if (!(m > 0)) return;
                    setPartnerAnnualIncome(Math.round(m * 12));
                  }}
                />
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    €
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="bijv. 55000 of 55.000"
                    value={partnerAnnualIncome === "" ? "" : String(partnerAnnualIncome)}
                    onChange={(e) => setPartnerAnnualIncome(parseJaarInkomenInput(e.target.value))}
                    className="min-h-[44px] w-full rounded-xl border py-2 pl-7"
                    style={{ borderColor: CARD_BORDER }}
                  />
                </div>
              </label>

              <div>
                <p className="text-sm font-medium text-[#2c2a26]">Dienstverband partner</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {dienstverbandOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPartnerDienstverband(opt.id)}
                      className={cardBtn}
                      style={{
                        borderColor: partnerDienstverband === opt.id ? AMBER : CARD_BORDER,
                        background: partnerDienstverband === opt.id ? `${AMBER}14` : BG,
                      }}
                    >
                      <span style={{ color: GREEN }}>{opt.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border p-4" style={{ borderColor: CARD_BORDER, background: BG }}>
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={partnerHasVariableIncome}
                    onChange={(e) => setPartnerHasVariableIncome(e.target.checked)}
                    className="h-5 w-5"
                    style={{ accentColor: GREEN }}
                  />
                  Partner: variabel inkomen of bonus?
                </label>
                {partnerHasVariableIncome && (
                  <div className="mt-4 grid gap-3">
                    <label className="flex flex-col gap-1 text-sm">
                      Gemiddeld per jaar (bruto)
                      <input
                        type="number"
                        value={partnerVariableIncomeAmount === "" ? "" : partnerVariableIncomeAmount}
                        onChange={(e) =>
                          setPartnerVariableIncomeAmount(
                            e.target.value === "" ? "" : Number(e.target.value),
                          )
                        }
                        className="min-h-[44px] rounded-xl border px-2"
                        style={{ borderColor: CARD_BORDER }}
                      />
                    </label>
                    <select
                      value={partnerVariableIncomeCertainty}
                      onChange={(e) =>
                        setPartnerVariableIncomeCertainty(
                          e.target.value as "structureel" | "incidenteel",
                        )
                      }
                      className="min-h-[44px] rounded-xl border px-2"
                      style={{ borderColor: CARD_BORDER }}
                    >
                      <option value="structureel">Structureel</option>
                      <option value="incidenteel">Incidenteel</option>
                    </select>
                  </div>
                )}
              </div>

              {partnerDienstverband === "tijdelijk" && (
                <fieldset>
                  <legend className="text-sm font-medium">Intentieverklaring werkgever?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      [
                        { id: "ja" as const, label: "Ja" },
                        { id: "nee" as const, label: "Nee" },
                        { id: "wordt-geregeld" as const, label: "Wordt geregeld" },
                      ]
                    ).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setPartnerIntentieverklaring(o.id)}
                        className={cardBtn + " flex-1 text-center"}
                        style={{
                          borderColor: partnerIntentieverklaring === o.id ? AMBER : CARD_BORDER,
                          background: partnerIntentieverklaring === o.id ? `${AMBER}14` : BG,
                          color: GREEN,
                        }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Lopende leningen en lasten
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Geen schulden? Gewoon leeg laten. Dit verlaagt je maximale hypotheek.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Studieschuld — oorspronkelijk geleend bedrag
                <input
                  type="number"
                  value={studyDebt === "" ? "" : studyDebt}
                  onChange={(e) => setStudyDebt(e.target.value === "" ? "" : Number(e.target.value))}
                  className="min-h-[44px] rounded-xl border px-3"
                  style={{ borderColor: CARD_BORDER }}
                />
                <span className="text-xs font-normal text-[#6f6b64]">
                  DUO-schulden vóór 2015 wegen zwaarder. Een adviseur berekent dit exact.
                </span>
              </label>

              {studyDebtNum > 0 && (
                <fieldset>
                  <legend className="text-sm font-medium">Stelsel studieschuld</legend>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: "new" as const, label: "Na sep 2015" },
                        { id: "old" as const, label: "Voor sep 2015" },
                      ]
                    ).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setStudyDebtSystem(o.id)}
                        className={cardBtn + " text-center text-xs"}
                        style={{
                          borderColor: studyDebtSystem === o.id ? AMBER : CARD_BORDER,
                          background: studyDebtSystem === o.id ? `${AMBER}14` : BG,
                          color: GREEN,
                        }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <label className="flex flex-col gap-1 text-sm font-medium">
                Autolease — huidige maandbedrag
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">€</span>
                  <input
                    type="number"
                    value={autoLease === "" ? "" : autoLease}
                    onChange={(e) =>
                      setAutoLease(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="min-h-[44px] w-full rounded-xl border py-2 pl-7"
                    style={{ borderColor: CARD_BORDER }}
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium">
                Persoonlijke lening — totaal openstaand
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">€</span>
                  <input
                    type="number"
                    value={personalLoan === "" ? "" : personalLoan}
                    onChange={(e) =>
                      setPersonalLoan(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="min-h-[44px] w-full rounded-xl border py-2 pl-7"
                    style={{ borderColor: CARD_BORDER }}
                  />
                </div>
              </label>

              <fieldset>
                <legend className="text-sm font-medium">Betaalt u alimentatie?</legend>
                <div className="mt-2 flex gap-2">
                  {(["nee", "ja"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAlimentatieJaNee(v)}
                      className={cardBtn + " flex-1"}
                      style={{
                        borderColor: alimentatieJaNee === v ? AMBER : CARD_BORDER,
                        background: alimentatieJaNee === v ? `${AMBER}14` : BG,
                        color: GREEN,
                      }}
                    >
                      {v === "ja" ? "Ja" : "Nee"}
                    </button>
                  ))}
                </div>
                {alimentatieJaNee === "ja" && (
                  <label className="mt-3 flex flex-col gap-1 text-sm">
                    Maandbedrag
                    <input
                      type="number"
                      value={alimentatieBedrag === "" ? "" : alimentatieBedrag}
                      onChange={(e) =>
                        setAlimentatieBedrag(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      className="min-h-[44px] rounded-xl border px-3"
                      style={{ borderColor: CARD_BORDER }}
                    />
                  </label>
                )}
              </fieldset>

              <fieldset>
                <legend className="text-sm font-medium">
                  Heeft u een creditcard of doorlopend krediet?
                </legend>
                <div className="mt-2 flex gap-2">
                  {(["nee", "ja"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setCreditJaNee(v)}
                      className={cardBtn + " flex-1"}
                      style={{
                        borderColor: creditJaNee === v ? AMBER : CARD_BORDER,
                        background: creditJaNee === v ? `${AMBER}14` : BG,
                        color: GREEN,
                      }}
                    >
                      {v === "ja" ? "Ja" : "Nee"}
                    </button>
                  ))}
                </div>
                {creditJaNee === "ja" && (
                  <label className="mt-3 flex flex-col gap-1 text-sm">
                    Limiet bedrag
                    <span className="text-xs font-normal text-[#6f6b64]">
                      Kredietlimiet telt mee, niet het openstaande saldo.
                    </span>
                    <input
                      type="number"
                      value={creditLimiet === "" ? "" : creditLimiet}
                      onChange={(e) =>
                        setCreditLimiet(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      className="min-h-[44px] rounded-xl border px-3"
                      style={{ borderColor: CARD_BORDER }}
                    />
                  </label>
                )}
              </fieldset>
            </div>
          </div>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              De woning
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Nog geen woning op het oog? Vul dan je streefbedrag in.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <label className="flex flex-col gap-1 text-sm font-medium">
                Koopsom / streefbedrag
                <input
                  type="number"
                  placeholder="bijv. 350.000"
                  value={koopsom === "" ? "" : koopsom}
                  onChange={(e) => setKoopsom(e.target.value === "" ? "" : Number(e.target.value))}
                  className="min-h-[44px] rounded-xl border px-3"
                  style={{ borderColor: CARD_BORDER }}
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium">
                Eigen geld beschikbaar *
                <span className="text-xs font-normal text-[#6f6b64]">
                  Kosten koper zijn ongeveer 5–6% van de koopsom. Een adviseur berekent het exact.
                </span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">€</span>
                  <input
                    type="number"
                    placeholder="bijv. 35.000"
                    value={eigenGeld === "" ? "" : eigenGeld}
                    onChange={(e) =>
                      setEigenGeld(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="min-h-[44px] w-full rounded-xl border py-2 pl-7"
                    style={{ borderColor: CARD_BORDER }}
                  />
                </div>
              </label>

              {aanleiding === "doorstromen" && (
                <fieldset>
                  <legend className="text-sm font-medium">Overwaarde huidige woning?</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      [
                        { id: "nee" as const, label: "Nee" },
                        { id: "ja" as const, label: "Ja" },
                        { id: "weet-niet" as const, label: "Weet ik nog niet" },
                      ]
                    ).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setOverwaardeKeuze(o.id)}
                        className={cardBtn + " flex-1 text-xs sm:text-sm"}
                        style={{
                          borderColor: overwaardeKeuze === o.id ? AMBER : CARD_BORDER,
                          background: overwaardeKeuze === o.id ? `${AMBER}14` : BG,
                          color: GREEN,
                        }}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {overwaardeKeuze === "ja" && (
                    <label className="mt-3 flex flex-col gap-1 text-sm">
                      Geschatte overwaarde
                      <input
                        type="number"
                        value={overwaardeBedrag === "" ? "" : overwaardeBedrag}
                        onChange={(e) =>
                          setOverwaardeBedrag(e.target.value === "" ? "" : Number(e.target.value))
                        }
                        className="min-h-[44px] rounded-xl border px-3"
                        style={{ borderColor: CARD_BORDER }}
                      />
                    </label>
                  )}
                </fieldset>
              )}

              <div>
                <p className="text-sm font-medium">Gewenste tijdlijn</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {tijdlijnOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTijdlijn(opt.id)}
                      className={cardBtn}
                      style={{
                        borderColor: tijdlijn === opt.id ? AMBER : CARD_BORDER,
                        background: tijdlijn === opt.id ? `${AMBER}14` : BG,
                        color: GREEN,
                      }}
                    >
                      {opt.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7 */}
        {step === 7 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Een paar korte vragen
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Helpt de adviseur om het gesprek goed af te stemmen. Mag je overslaan.
            </p>

            <div className="mt-6 flex flex-col gap-6">
              {(
                [
                  {
                    label: "Weet u wat uw inkomen wordt als u met pensioen gaat?",
                    val: pensioenAware,
                    set: setPensioenAware,
                  },
                  {
                    label: "Weet u wat er gebeurt met uw inkomen bij werkloosheid?",
                    val: werkloosheidAware,
                    set: setWerkloosheidAware,
                  },
                  {
                    label: "Weet u wat er gebeurt bij arbeidsongeschiktheid?",
                    val: aoAware,
                    set: setAoAware,
                  },
                ] as const
              ).map((row) => (
                <fieldset key={row.label}>
                  <legend className="text-sm font-medium text-[#2c2a26]">{row.label}</legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["niet", "redelijk", "goed"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => row.set(v)}
                        className={cardBtn + " text-xs"}
                        style={{
                          borderColor: row.val === v ? AMBER : CARD_BORDER,
                          background: row.val === v ? `${AMBER}14` : BG,
                          color: GREEN,
                        }}
                      >
                        {v === "niet" ? "Niet" : v === "redelijk" ? "Redelijk" : "Goed"}
                      </button>
                    ))}
                  </div>
                </fieldset>
              ))}

              <fieldset>
                <legend className="text-sm font-medium">Heeft u eerder een hypotheek afgesloten?</legend>
                <div className="mt-2 flex gap-2">
                  {(["nee", "ja"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setEerderHypotheek(v)}
                      className={cardBtn + " flex-1"}
                      style={{
                        borderColor: eerderHypotheek === v ? AMBER : CARD_BORDER,
                        background: eerderHypotheek === v ? `${AMBER}14` : BG,
                        color: GREEN,
                      }}
                    >
                      {v === "ja" ? "Ja" : "Nee"}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <p className="text-sm font-medium">Hoe beoordeelt u uw eigen financiële kennis?</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {(
                    [
                      { id: "laag" as const, label: "Laag" },
                      { id: "redelijk" as const, label: "Redelijk" },
                      { id: "goed" as const, label: "Goed" },
                      { id: "zeer-goed" as const, label: "Zeer goed" },
                    ]
                  ).map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setFinancieleKennis(o.id)}
                      className={cardBtn}
                      style={{
                        borderColor: financieleKennis === o.id ? AMBER : CARD_BORDER,
                        background: financieleKennis === o.id ? `${AMBER}14` : BG,
                        color: GREEN,
                      }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 8 — PDF lokaal; adviseur als aanbevolen optie */}
        {step === 8 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Laatste stap
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Je PDF wordt direct op je apparaat gedownload.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5c5852]">
              Veel mensen laten hun situatieschets <strong className="font-medium text-[#2c2a26]">kort checken</strong>{" "}
              — zo voorkom je dat je iets mist.
            </p>

            <div className="mt-6 border-t pt-6" style={{ borderColor: CARD_BORDER }}>
              <p className="text-base font-semibold text-[#2c2a26]">
                Laat je situatieschets kort checken{" "}
                <span className="font-display text-primary">(aanrader)</span>
              </p>
              <p className="mt-1 text-xs leading-snug text-[#6f6b64]">
                Kleine verschillen in je situatieschets kunnen later duizenden euro&apos;s schelen — een korte blik helpt
                vaak om dat te voorkomen.
              </p>

              <div className="mt-5 flex flex-col gap-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/90">
                    Aanrader · meest gekozen
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setZoektHypotheekAdvies("ja");
                      setStep(9);
                    }}
                    className={
                      cardBtn +
                      " mt-2 flex min-h-[auto] w-full flex-col gap-1 py-4 text-left sm:min-h-[112px] sm:justify-center"
                    }
                    style={{
                      borderColor: zoektHypotheekAdvies === "ja" ? AMBER : CARD_BORDER,
                      background: zoektHypotheekAdvies === "ja" ? `${AMBER}22` : BG,
                      boxShadow:
                        zoektHypotheekAdvies === "ja" ? `0 0 0 1px ${AMBER}55 inset` : undefined,
                    }}
                  >
                    <span style={{ color: GREEN }}>Ja, laat een adviseur meekijken (gratis)</span>
                    <span className="text-xs font-normal leading-snug text-[#6f6b64]">
                      Check op gemiste ruimte, risico&apos;s en je volgende stap
                    </span>
                  </button>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6f6b64]">
                    Of regel het zelf
                  </p>
                  <button
                    type="button"
                    onClick={() => setZoektHypotheekAdvies("nee")}
                    className={
                      cardBtn +
                      " mt-2 flex min-h-[auto] w-full flex-col gap-1 py-4 text-left sm:min-h-[112px] sm:justify-center"
                    }
                    style={{
                      borderColor: zoektHypotheekAdvies === "nee" ? AMBER : CARD_BORDER,
                      background: zoektHypotheekAdvies === "nee" ? `${AMBER}14` : BG,
                    }}
                  >
                    <span style={{ color: GREEN }}>Alleen mijn PDF downloaden</span>
                    <span className="text-xs font-normal leading-snug text-[#6f6b64]">
                      Ga zelf verder met je voorbereiding
                    </span>
                    <span className="text-[11px] font-normal leading-snug text-[#8a8580]">
                      Zonder extra check
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden" aria-hidden="true">
              <label>
                Bedrijf
                <input tabIndex={-1} value={company} onChange={(e) => setCompany(e.target.value)} />
              </label>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[#6f6b64]">
              Je situatieschets wordt op je apparaat gegenereerd. Kies hierboven of je alleen de PDF wilt,
              of ook contact met een adviseur — bij dat laatste vul je op de volgende stap je gegevens in.{" "}
              <Link href="/privacy" className="font-semibold underline" style={{ color: GREEN }}>
                Privacy &amp; voorwaarden
              </Link>
              .
            </p>
          </div>
        )}

        {/* Stap 9 — alleen na „Ja“; contact + juridische toelichting (geen apart vinkje) */}
        {step === 9 && (
          <div>
            <h2 className="font-display text-xl font-normal sm:text-2xl" style={{ color: GREEN }}>
              Contact voor adviseur
            </h2>
            <p className="mt-2 text-sm text-[#6f6b64]">
              Je PDF maak je zo meteen — vul hieronder in hoe we je kunnen bereiken voor een korte meekijk.
            </p>

            <div className="mt-6 flex flex-col gap-5 border-t pt-6" style={{ borderColor: CARD_BORDER }}>
              <div>
                <p className="text-sm font-semibold text-[#2c2a26]">Hoe wil je bereikbaar zijn?</p>
                <p className="mt-1 text-xs leading-relaxed text-[#6f6b64]">
                  Vul je naam en contact in — zo kan een adviseur je terugmailen of bellen.
                </p>
                <p className="mt-2 text-xs font-medium text-[#4a4844]">
                  Binnen 1 werkdag reactie. Geen verplichtingen.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Voornaam *
                  <input
                    value={voornaam}
                    onChange={(e) => setVoornaam(e.target.value)}
                    className="min-h-[44px] rounded-xl border px-3"
                    style={{ borderColor: CARD_BORDER }}
                    autoComplete="given-name"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Achternaam *
                  <input
                    value={achternaam}
                    onChange={(e) => setAchternaam(e.target.value)}
                    className="min-h-[44px] rounded-xl border px-3"
                    style={{ borderColor: CARD_BORDER }}
                    autoComplete="family-name"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  E-mailadres *
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmailBlur}
                    className="min-h-[44px] rounded-xl border px-3"
                    style={{ borderColor: CARD_BORDER }}
                    autoComplete="email"
                  />
                  {emailError && <span className="text-xs text-red-600">{emailError}</span>}
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Telefoonnummer *
                  <input
                    type="tel"
                    placeholder="06 –"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="min-h-[44px] rounded-xl border px-3"
                    style={{ borderColor: CARD_BORDER }}
                    autoComplete="tel"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium">
                  Opmerkingen <span className="font-normal text-[#6f6b64]">(optioneel)</span>
                  <textarea
                    value={notes}
                    maxLength={300}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Bijv. voorkeur voor contactmoment…"
                    className="rounded-xl border px-3 py-2 text-sm"
                    style={{ borderColor: CARD_BORDER }}
                  />
                  <span className="text-xs text-[#6f6b64]">{notes.length}/300</span>
                </label>
              </div>

              <div
                className="rounded-xl border px-3 py-3 text-xs leading-relaxed text-[#5c5852] sm:px-4 sm:py-3.5"
                style={{ borderColor: CARD_BORDER, background: BG }}
              >
                <p>
                  Door te kiezen voor &quot;Ja, laat een adviseur meekijken&quot; op de vorige stap én het
                  hierboven invullen van je contactgegevens, ga je ermee akkoord dat een{" "}
                  <strong className="font-semibold text-[#2c2a26]">AFM-erkende hypotheekadviseur</strong>{" "}
                  je mag bellen of mailen over deze situatieschets. Alleen voor dit verzoek, vrijblijvend —
                  niet voor andere marketing.{" "}
                  <Link href="/privacy" className="font-semibold underline" style={{ color: GREEN }}>
                    Meer over privacy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && !step2Ok()
          ? (() => {
              const t = step2PendingHints();
              return t ? (
                <p className="mt-6 text-xs leading-relaxed text-[#7a756c]" role="status">
                  {t}
                </p>
              ) : null;
            })()
          : null}
        {step === 3 && !step3Ok() && (
          <p className="mt-6 text-xs leading-relaxed text-[#7a756c]" role="status">
            Kies je dienstverband en vul een realistisch bruto jaarinkomen in (tussen € 15.000 en €
            500.000). Je mag €-notatie gebruiken: <strong className="font-medium text-[#5c5852]">55.000</strong>{" "}
            wordt automatisch gelezen als 55&nbsp;000.
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-between" style={{ borderColor: CARD_BORDER }}>
          <button
            type="button"
            onClick={() => setStep((s) => prevInternalStep(s, hasPartner))}
            disabled={step === 1}
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl border px-5 text-sm font-semibold transition disabled:opacity-40"
            style={{ borderColor: CARD_BORDER, color: GREEN, background: "#fff" }}
          >
            Vorige
          </button>
          {step === 2 ? (
            <button
              type="button"
              onClick={() => {
                if (!validateStep2ForNext()) return;
                setStep((s) => nextInternalStep(s, hasPartner));
              }}
              disabled={!step2Ok()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-md transition disabled:opacity-50"
              style={{ background: GREEN }}
            >
              Volgende
            </button>
          ) : step < 8 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 4 && hasPartner && !validateStep4ForNext()) return;
                if (!canProceed()) return;
                setStep((s) => nextInternalStep(s, hasPartner));
              }}
              disabled={!canProceed()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-md transition disabled:opacity-50"
              style={{ background: GREEN }}
            >
              Volgende
            </button>
          ) : step === 8 ? (
            zoektHypotheekAdvies === "nee" ? (
              <button
                type="button"
                onClick={handleSubmitForm}
                disabled={!step8Ok()}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-md transition disabled:opacity-50"
                style={{ background: GREEN }}
              >
                Maak mijn situatieschets
              </button>
            ) : zoektHypotheekAdvies === "ja" ? (
              <button
                type="button"
                onClick={() => setStep(9)}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-md transition"
                style={{ background: GREEN }}
              >
                Contact invullen →
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex min-h-[44px] cursor-not-allowed items-center justify-center rounded-xl px-6 text-sm font-semibold text-white opacity-45 shadow-md"
                style={{ background: GREEN }}
              >
                Maak mijn situatieschets
              </button>
            )
          ) : step === 9 ? (
            <button
              type="button"
              onClick={handleSubmitForm}
              disabled={!step9Ok()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl px-6 text-sm font-semibold text-white shadow-md disabled:opacity-50"
              style={{ background: GREEN }}
            >
              Maak mijn situatieschets
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-[#6f6b64]">
        <Link href="/hypotheek" className="font-semibold underline-offset-2 hover:underline" style={{ color: GREEN }}>
          Alleen rekenen?
        </Link>
      </p>
    </div>
  );
}
