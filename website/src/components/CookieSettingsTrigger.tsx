"use client";

import { KVA_COOKIE_SETTINGS_EVENT } from "@/lib/cookieConsent";

type Props = {
  className?: string;
};

/** Opens the cookie preference bar (same choices as first visit). */
export function CookieSettingsTrigger({ className }: Props) {
  return (
    <button
      type="button"
      className={
        className ??
        "text-left text-foreground/90 underline-offset-4 hover:text-primary hover:underline"
      }
      onClick={() => window.dispatchEvent(new Event(KVA_COOKIE_SETTINGS_EVENT))}
    >
      Cookie-instellingen
    </button>
  );
}
