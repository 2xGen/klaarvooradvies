"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCallback, useEffect, useState } from "react";

import { CookieConsentBar } from "@/components/CookieConsentBar";
import { KVA_COOKIE_SETTINGS_EVENT } from "@/lib/cookieConsent";

const STORAGE_KEY = "kva_cookie_consent_v1";

export type StoredConsent = { analytics: boolean; ts: number };

function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as { analytics?: boolean; ts?: number };
    if (typeof p.analytics !== "boolean") return null;
    return { analytics: p.analytics, ts: typeof p.ts === "number" ? p.ts : Date.now() };
  } catch {
    return null;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setAnalyticsEnabled(stored.analytics);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const open = () => setShowBanner(true);
    window.addEventListener(KVA_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(KVA_COOKIE_SETTINGS_EVENT, open);
  }, []);

  const applyConsent = useCallback((analytics: boolean) => {
    const payload: StoredConsent = { analytics, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setAnalyticsEnabled(analytics);
    setShowBanner(false);
  }, []);

  return (
    <>
      {children}
      {analyticsEnabled ? <Analytics /> : null}
      {hydrated && showBanner ? (
        <CookieConsentBar
          onEssentialOnly={() => applyConsent(false)}
          onAcceptAll={() => applyConsent(true)}
        />
      ) : null}
    </>
  );
}
