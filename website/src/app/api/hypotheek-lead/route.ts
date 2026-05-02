import { NextResponse } from "next/server";

import { insertHypotheekLead } from "@/lib/supabase/persist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function phoneDigitsOk(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

function asFiniteNumber(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (typeof body.company === "string" && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const consent = body.advisorContactConsent === true;
    if (!consent) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";

    const nameOk = name.length >= 3;
    const emailOk = email.length > 0 && EMAIL_RE.test(email);
    if (email.length > 0 && !emailOk) {
      return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
    }
    const phoneOk = phoneDigitsOk(phone);

    if (!nameOk || !emailOk || !phoneOk) {
      return NextResponse.json(
        {
          error:
            "Vul voor een adviseurslead je voor- en achternaam, een geldig e-mailadres en een telefoonnummer in (minimaal 9 cijfers).",
        },
        { status: 400 },
      );
    }

    const notesRaw = typeof body.notes === "string" ? body.notes.trim() : "";
    const notes = notesRaw.length > 0 ? notesRaw : null;

    const dbStored = await insertHypotheekLead({
      name,
      email,
      phone,
      notes,
      zoekt_hypotheek_advies:
        typeof body.zoektHypotheekAdvies === "string" ? body.zoektHypotheekAdvies : "",
      estimated_max: asFiniteNumber(body.estimatedMax),
      aanleiding: typeof body.aanleiding === "string" ? body.aanleiding : "",
      tijdlijn: typeof body.tijdlijn === "string" ? body.tijdlijn : "",
      gross_income: asFiniteNumber(body.grossIncome),
      interest_rate: asFiniteNumber(body.interestRate),
      study_monthly: asFiniteNumber(body.studyMonthly),
      has_partner: body.hasPartner === true,
      advisor_contact_consent: consent,
      consent_recorded_at:
        typeof body.consentRecordedAt === "string"
          ? body.consentRecordedAt
          : new Date().toISOString(),
    });

    const webhook = process.env.LEAD_WEBHOOK_URL;
    let webhookOk = false;
    if (webhook) {
      try {
        const whRes = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...body,
            _source: "situatieschets",
            _receivedAt: new Date().toISOString(),
          }),
        });
        webhookOk = whRes.ok;
      } catch {
        webhookOk = false;
      }
    }

    return NextResponse.json({ ok: true, stored: dbStored || webhookOk });
  } catch {
    return NextResponse.json({ error: "Kon verzoek niet verwerken." }, { status: 400 });
  }
}
