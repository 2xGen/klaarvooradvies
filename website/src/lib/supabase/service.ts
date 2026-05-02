import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicConfig, getSupabaseServiceKey } from "@/lib/supabase/env";

/**
 * Server-only client with the service role / secret key. Bypasses RLS - use only in Route
 * Handlers, Server Actions, or background jobs. Never import from Client Components.
 */
export function createSupabaseServiceClient() {
  const { url } = getSupabasePublicConfig();
  const serviceRole = getSupabaseServiceKey();
  return createClient(url, serviceRole, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
