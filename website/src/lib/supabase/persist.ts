import { createSupabaseServiceClient } from "@/lib/supabase/service";

function safeServiceInsert(): ReturnType<typeof createSupabaseServiceClient> | null {
  try {
    return createSupabaseServiceClient();
  } catch {
    return null;
  }
}

export async function insertContactSubmission(row: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const sb = safeServiceInsert();
  if (!sb) return false;
  const { error } = await sb.from("contact_submissions").insert(row);
  if (error) {
    console.error("[supabase] contact_submissions insert:", error.message);
    return false;
  }
  return true;
}

export async function insertHypotheekLead(row: {
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  zoekt_hypotheek_advies: string;
  estimated_max: number;
  aanleiding: string;
  tijdlijn: string;
  gross_income: number;
  interest_rate: number;
  study_monthly: number;
  has_partner: boolean;
  advisor_contact_consent: boolean;
  consent_recorded_at: string;
}): Promise<boolean> {
  const sb = safeServiceInsert();
  if (!sb) return false;
  const { error } = await sb.from("hypotheek_leads").insert(row);
  if (error) {
    console.error("[supabase] hypotheek_leads insert:", error.message);
    return false;
  }
  return true;
}

export async function insertPdfEvent(row: {
  has_partner: boolean | null;
  advisor_opt_in: boolean;
  lead_eligible: boolean;
}): Promise<boolean> {
  const sb = safeServiceInsert();
  if (!sb) return false;
  const { error } = await sb.from("situatieschets_pdf_events").insert(row);
  if (error) {
    console.error("[supabase] situatieschets_pdf_events insert:", error.message);
    return false;
  }
  return true;
}
