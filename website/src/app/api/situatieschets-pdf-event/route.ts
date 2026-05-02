import { NextResponse } from "next/server";

import { insertPdfEvent } from "@/lib/supabase/persist";

/**
 * Fires once per situatieschets PDF download (client-side generated PDF).
 * Used for aggregate counts; no PII stored.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const hasPartner = typeof body.hasPartner === "boolean" ? body.hasPartner : null;
    const advisorOptIn = body.advisorOptIn === true;
    const leadEligible = body.leadEligible === true;

    const stored = await insertPdfEvent({
      has_partner: hasPartner,
      advisor_opt_in: advisorOptIn,
      lead_eligible: leadEligible,
    });

    return NextResponse.json({ ok: true, stored });
  } catch {
    return NextResponse.json({ ok: false, stored: false }, { status: 400 });
  }
}
