export type StudyDebtSystem = "none" | "new" | "old";

export const STUDY_DEBT_WEIGHTS: Record<StudyDebtSystem, number> = {
  none: 0,
  new: 0.0035,
  old: 0.0065,
};

export function clampNonNeg(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function studyDebtMonthlyImpact(studyDebt: number, studyDebtSystem: StudyDebtSystem) {
  return Math.round(clampNonNeg(studyDebt) * STUDY_DEBT_WEIGHTS[studyDebtSystem]);
}

export type MaxHypotheekInput = {
  annualIncome: number;
  hasPartnerIncome: boolean;
  partnerIncome: number;
  /** Maandlasten excl. studieschuld (die wordt apart meegewogen). */
  monthlyDebt: number;
  studyDebt: number;
  studyDebtSystem: StudyDebtSystem;
  interestRate: number;
};

/** Ruwe maandlast uit autolease, alimentatie, 2%‑regel lening/krediet (indicatie). */
export function monthlyDebtFromFormFields(opts: {
  autoLeaseMonthly: number;
  personalLoanOutstanding: number;
  alimentatieMonthly: number;
  creditLimit: number;
}) {
  const lease = clampNonNeg(opts.autoLeaseMonthly);
  const alim = clampNonNeg(opts.alimentatieMonthly);
  const loanShare = clampNonNeg(opts.personalLoanOutstanding) * 0.02;
  const ccShare = clampNonNeg(opts.creditLimit) * 0.02;
  return lease + alim + loanShare + ccShare;
}

export type MaxHypotheekBreakdown = {
  max: number;
  grossIncome: number;
  studyMonthly: number;
  totalMonthlyObligation: number;
  adjustedMultiplier: number;
  incomeBased: number;
  debtImpact: number;
  interestRate: number;
};

export function estimateMaxHypotheekBreakdown(input: MaxHypotheekInput): MaxHypotheekBreakdown {
  const grossIncome =
    clampNonNeg(input.annualIncome) +
    (input.hasPartnerIncome ? clampNonNeg(input.partnerIncome) : 0);
  const studyMonthly = studyDebtMonthlyImpact(input.studyDebt, input.studyDebtSystem);
  const totalMonthlyObligation = clampNonNeg(input.monthlyDebt) + studyMonthly;

  const baseMultiplier = 4.4;
  const ratePenalty = Math.max(0, input.interestRate - 3) * 0.35;
  const rateBonus = Math.max(0, 3 - input.interestRate) * 0.2;
  const adjustedMultiplier = Math.max(3.2, baseMultiplier - ratePenalty + rateBonus);
  const incomeBased = grossIncome * adjustedMultiplier;
  const debtImpact = totalMonthlyObligation * 120;
  const max = Math.max(0, Math.round(incomeBased - debtImpact));

  return {
    max,
    grossIncome,
    studyMonthly,
    totalMonthlyObligation,
    adjustedMultiplier,
    incomeBased,
    debtImpact,
    interestRate: input.interestRate,
  };
}

export function estimateMaxHypotheek(input: MaxHypotheekInput): number {
  return estimateMaxHypotheekBreakdown(input).max;
}
