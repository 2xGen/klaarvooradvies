"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  clampNonNeg,
  estimateMaxHypotheek,
  studyDebtMonthlyImpact,
  type StudyDebtSystem,
} from "@/lib/maxHypotheekIndicatie";

export function MaxHypotheekCalculator() {
  const [annualIncome, setAnnualIncome] = useState(52000);
  const [hasPartnerIncome, setHasPartnerIncome] = useState(false);
  const [partnerIncome, setPartnerIncome] = useState(35000);
  const [monthlyDebt, setMonthlyDebt] = useState(0);
  const [studyDebt, setStudyDebt] = useState(0);
  const [studyDebtSystem, setStudyDebtSystem] = useState<StudyDebtSystem>("none");
  const [interestRate, setInterestRate] = useState(3.5);

  const studyMonthlyImpact = useMemo(
    () => studyDebtMonthlyImpact(studyDebt, studyDebtSystem),
    [studyDebt, studyDebtSystem],
  );

  const estimatedMax = useMemo(
    () =>
      estimateMaxHypotheek({
        annualIncome,
        hasPartnerIncome,
        partnerIncome,
        monthlyDebt,
        studyDebt,
        studyDebtSystem,
        interestRate,
      }),
    [
      annualIncome,
      hasPartnerIncome,
      partnerIncome,
      monthlyDebt,
      studyDebt,
      studyDebtSystem,
      interestRate,
    ],
  );

  const formatEuro = (value: number) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  // Progress-bar relative to a soft ceiling of 600k for visual effect
  const progressPct = Math.min(100, Math.round((estimatedMax / 600000) * 100));

  const grossAnnual = annualIncome + (hasPartnerIncome ? partnerIncome : 0);
  const hasEnteredDebts =
    monthlyDebt > 0 || (studyDebtSystem !== "none" && studyDebt > 0);

  const incomePhrase = hasPartnerIncome
    ? `een gezamenlijk bruto inkomen van ${formatEuro(grossAnnual)}`
    : `een bruto inkomen van ${formatEuro(grossAnnual)}`;
  const debtPhrase = hasEnteredDebts
    ? "met de door jou ingevoerde maandlasten en/of studieschuld"
    : "en geen andere schulden";
  const resultLead = `Bij ${incomePhrase} ${debtPhrase} kom je op basis van gangbare 2026-normen uit rond ${formatEuro(estimatedMax)}.`;

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border-soft bg-surface shadow-[0_16px_40px_rgba(11,31,58,0.1)]"
      aria-label="Maximale hypotheek rekenhulp"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full border border-accent/25"
      />

      <div className="relative grid gap-0 lg:grid-cols-[1fr_minmax(0,320px)]">
        {/* Inputs */}
        <div className="p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-medium text-primary">
              Bruto jaarinkomen
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                  €
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  placeholder="0"
                  value={annualIncome === 0 ? "" : annualIncome}
                  onChange={(e) =>
                    setAnnualIncome(e.target.value === "" ? 0 : clampNonNeg(Number(e.target.value)))
                  }
                  className="w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 pl-7 text-sm font-semibold text-foreground outline-none transition-colors focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </label>

            <fieldset className="flex flex-col gap-1.5 text-sm font-medium text-primary">
              <legend>Met partnerinkomen?</legend>
              <div className="mt-0.5 flex gap-2">
                {[
                  { id: false, label: "Nee" },
                  { id: true, label: "Ja" },
                ].map((opt) => (
                  <button
                    key={String(opt.id)}
                    type="button"
                    onClick={() => setHasPartnerIncome(opt.id)}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                      hasPartnerIncome === opt.id
                        ? "border-accent bg-accent text-foreground shadow-md"
                        : "border-border-soft bg-background text-text-muted hover:border-border-strong"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {hasPartnerIncome && (
              <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-primary">
                Bruto partnerinkomen
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                    €
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={1000}
                    placeholder="0"
                    value={partnerIncome === 0 ? "" : partnerIncome}
                    onChange={(e) =>
                      setPartnerIncome(
                        e.target.value === "" ? 0 : clampNonNeg(Number(e.target.value)),
                      )
                    }
                    className="w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 pl-7 text-sm font-semibold text-foreground outline-none transition-colors focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/20"
                  />
                </div>
              </label>
            )}

            <fieldset className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-primary">
              <legend>Studieschuld DUO</legend>
              <div className="mt-0.5 grid grid-cols-3 gap-2">
                {[
                  { id: "none" as const, label: "Geen" },
                  { id: "new" as const, label: "Na sep 2015" },
                  { id: "old" as const, label: "Voor sep 2015" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setStudyDebtSystem(opt.id)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                      studyDebtSystem === opt.id
                        ? "border-accent bg-accent text-foreground shadow-md"
                        : "border-border-soft bg-background text-text-muted hover:border-border-strong"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {studyDebtSystem !== "none" && (
              <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-primary">
                Oorspronkelijke studieschuld
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                    €
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    step={500}
                    placeholder="0"
                    value={studyDebt === 0 ? "" : studyDebt}
                    onChange={(e) =>
                      setStudyDebt(e.target.value === "" ? 0 : clampNonNeg(Number(e.target.value)))
                    }
                    className="w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 pl-7 text-sm font-semibold text-foreground outline-none transition-colors focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <p className="text-xs leading-5 text-text-muted">
                  Banken rekenen met de oorspronkelijke schuld × weegfactor (
                  {studyDebtSystem === "new" ? "0,35%" : "0,65%"}/m). Bij jou: ongeveer{" "}
                  <span className="font-semibold text-primary">
                    {formatEuro(studyMonthlyImpact)}
                  </span>{" "}
                  per maand.
                </p>
              </label>
            )}

            <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-primary">
              Andere maandelijkse verplichtingen
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                  €
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={50}
                  placeholder="0"
                  value={monthlyDebt === 0 ? "" : monthlyDebt}
                  onChange={(e) =>
                    setMonthlyDebt(e.target.value === "" ? 0 : clampNonNeg(Number(e.target.value)))
                  }
                  className="w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 pl-7 text-sm font-semibold text-foreground outline-none transition-colors focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <p className="text-xs leading-5 text-text-muted">
                Lease, persoonlijke lening, creditcardlimiet, alimentatie. Studieschuld hierboven
                invullen.
              </p>
            </label>

            <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-primary">
              Hypotheekrente (indicatie)
              <div className="rounded-xl border border-border-soft bg-background px-3 py-3 transition-colors focus-within:border-accent focus-within:bg-surface">
                <div className="mb-2 flex items-center justify-between text-xs text-text-muted">
                  <span>2,0%</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-sm font-semibold text-accent-deep">
                    {interestRate.toFixed(2).replace(".", ",")}%
                  </span>
                  <span>6,0%</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={6}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            </label>
          </div>
        </div>

        {/* Result panel */}
        <div className="relative overflow-hidden bg-primary p-6 text-white sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid-light opacity-30" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/15" />

          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
              Indicatie
            </p>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
              {formatEuro(estimatedMax)}
            </p>

            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <ul className="mt-6 space-y-2 text-xs leading-6 text-white/75">
              <li className="flex justify-between gap-3">
                <span>Bruto inkomen</span>
                <span className="font-medium text-white tabular-nums">
                  {formatEuro(annualIncome + (hasPartnerIncome ? partnerIncome : 0))}
                </span>
              </li>
              {studyMonthlyImpact > 0 && (
                <li className="flex justify-between gap-3">
                  <span>Studieschuld /m</span>
                  <span className="font-medium text-white tabular-nums">
                    {formatEuro(studyMonthlyImpact)}
                  </span>
                </li>
              )}
              <li className="flex justify-between gap-3">
                <span>Andere lasten /m</span>
                <span className="font-medium text-white tabular-nums">{formatEuro(monthlyDebt)}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Rente-indicatie</span>
                <span className="font-medium text-white tabular-nums">
                  {interestRate.toFixed(2).replace(".", ",")}%
                </span>
              </li>
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-white/90">{resultLead}</p>
            <p className="mt-3 text-xs leading-6 text-white/75">
              Dit is een richting — geen offerte. Een erkend adviseur berekent het exact.
            </p>
            <Link
              href="/situatieschets"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-400"
            >
              Zet je situatie op papier
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
