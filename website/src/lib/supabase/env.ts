/**
 * Public URL + key for browser and server (anon or new publishable key).
 * @see https://supabase.com/docs/guides/api/creating-a-client
 */
export function getSupabasePublicConfig(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const key =
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()) ??
    "";
  if (!url || !key) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL and either NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (new) or NEXT_PUBLIC_SUPABASE_ANON_KEY (legacy JWT) in .env.local. See .env.example.",
    );
  }
  return { url, key };
}

/**
 * Service role (legacy) or secret key (new). Server-only; never expose to the client.
 */
export function getSupabaseServiceKey(): string {
  const key =
    (process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
      process.env.SUPABASE_SECRET_KEY?.trim()) ??
    "";
  if (!key) {
    throw new Error(
      "Set SUPABASE_SERVICE_ROLE_KEY (legacy) or SUPABASE_SECRET_KEY (new) for server admin access.",
    );
  }
  return key;
}
