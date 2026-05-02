import { NextResponse } from "next/server";

import { insertContactSubmission } from "@/lib/supabase/persist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    if (typeof body.company === "string" && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (name.length < 2) {
      return NextResponse.json({ error: "Vul je naam in (minimaal 2 tekens)." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Vul een geldig e-mailadres in." }, { status: 400 });
    }
    if (message.length < 15) {
      return NextResponse.json(
        { error: "Schrijf een korte toelichting (minimaal 15 tekens)." },
        { status: 400 },
      );
    }
    if (message.length > 8000) {
      return NextResponse.json({ error: "Je bericht is te lang." }, { status: 400 });
    }

    const dbStored = await insertContactSubmission({ name, email, message });

    const webhook = process.env.CONTACT_WEBHOOK_URL ?? process.env.LEAD_WEBHOOK_URL;
    let webhookOk = false;
    if (webhook) {
      const payload = {
        _source: "contact",
        name,
        email,
        message,
        _receivedAt: new Date().toISOString(),
      };
      try {
        const whRes = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        webhookOk = whRes.ok;
      } catch {
        webhookOk = false;
      }
    }

    return NextResponse.json({ ok: true, stored: dbStored || webhookOk });
  } catch {
    return NextResponse.json({ error: "Kon het formulier niet verwerken. Probeer het later opnieuw." }, { status: 400 });
  }
}
