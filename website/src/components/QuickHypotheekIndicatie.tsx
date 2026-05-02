"use client";

import { estimateMaxHypotheek } from "@/lib/maxHypotheekIndicatie";
import { ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function formatEuro(n: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function parseNum(v: string): number {
  const n = Number(String(v).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function QuickHypotheekIndicatie() {
  const [incomeStr, setIncomeStr] = useState("60000");
  const [hasPartner, setHasPartner] = useState(false);
  const [partnerStr, setPartnerStr] = useState("0");
  const [studyStr, setStudyStr] = useState("0");
  const [rateStr, setRateStr] = useState("3,5");

  const max = useMemo(() => {
    const annualIncome = parseNum(incomeStr);
    const partnerIncome = hasPartner ? parseNum(partnerStr) : 0;
    const studyDebt = parseNum(studyStr);
    const interestRate = parseNum(rateStr.replace(/,/g, ".")) || 3.5;
    return estimateMaxHypotheek({
      annualIncome,
      hasPartnerIncome: hasPartner,
      partnerIncome,
      monthlyDebt: 0,
      studyDebt,
      studyDebtSystem: studyDebt > 0 ? "new" : "none",
      interestRate: Math.min(8, Math.max(1, interestRate)),
    });
  }, [incomeStr, hasPartner, partnerStr, studyStr, rateStr]);

  return (
    <section
      id="hypotheek-indicatie"
      className="scroll-mt-24 border-b border-border-soft/80 bg-surface-muted/50 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Rekenhulp
            </p>
            <h2 className="font-display mt-1 text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Snel een hypotheekindicatie
            </h2>
            <p className="mt-2 max-w-xl text-base text-text-muted sm:text-lg">
              Ruwe inschatting op basis van je inkomen - zonder account. Geen offerte; voor een volledig
              beeld vul je daarna je situatieschets in.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-10">
          <div className="rounded-2xl border border-border-soft/90 bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2 text-foreground">
              <Calculator className="h-5 w-5 text-primary" aria-hidden />
              <span className="font-semibold">Je gegevens</span>
            </div>

            <label className="mt-5 block text-sm font-medium text-foreground">
              Bruto jaarinkomen (euro)
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={incomeStr}
                onChange={(e) => setIncomeStr(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 text-base text-foreground outline-none ring-primary/0 transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={hasPartner}
                onChange={(e) => setHasPartner(e.target.checked)}
                className="h-4 w-4 rounded border-border-strong text-primary"
              />
              Met partner (tweede inkomen)
            </label>

            {hasPartner && (
              <label className="mt-3 block text-sm font-medium text-foreground">
                Partner bruto jaarinkomen (euro)
                <input
                  type="text"
                  inputMode="decimal"
                  value={partnerStr}
                  onChange={(e) => setPartnerStr(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-foreground">
                Studieschuld (euro, optioneel)
                <input
                  type="text"
                  inputMode="decimal"
                  value={studyStr}
                  onChange={(e) => setStudyStr(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="block text-sm font-medium text-foreground">
                Rente % (indicatie)
                <input
                  type="text"
                  inputMode="decimal"
                  value={rateStr}
                  onChange={(e) => setRateStr(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border-soft bg-background px-3 py-2.5 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-text-muted">
              Andere leningen en lasten horen in je volledige situatieschets; hier houden we het bewust
              simpel.
            </p>
          </div>

          <aside className="flex flex-col rounded-2xl border border-primary/25 bg-gradient-to-br from-primary to-primary-deep p-6 text-white shadow-md">
            <p className="text-sm font-medium text-white/90">Indicatief leenruimte</p>
            <p className="font-display mt-2 text-4xl font-bold tabular-nums sm:text-5xl">
              {formatEuro(max)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/85">
              Gebaseerd op je invoer en een vaste rekenregel - geen aanbod van een bank.
            </p>
            <Link
              href="/situatieschets"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-center text-sm font-semibold text-foreground shadow-md transition hover:bg-accent-deep"
            >
              Vul je volledige situatieschets in
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-white/75">
              Geen hypotheekadvies. Voor bindende keuzes: altijd een erkend adviseur.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
