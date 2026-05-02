"use client";

import Link from "next/link";

type Props = {
  onEssentialOnly: () => void;
  onAcceptAll: () => void;
};

export function CookieConsentBar({ onEssentialOnly, onAcceptAll }: Props) {
  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border-soft bg-surface px-4 py-3 shadow-[0_-8px_30px_rgba(44,42,38,0.12)] sm:px-6 sm:py-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1 text-sm leading-snug text-text-muted">
          <p id="cookie-consent-title" className="font-display text-base font-semibold text-foreground">
            Cookies
          </p>
          <p id="cookie-consent-desc" className="mt-0.5">
            Functionele cookies zijn nodig voor de site. Met &quot;Accepteren&quot; zet je anonieme
            statistiek aan.{" "}
            <Link href="/cookies" className="font-semibold text-primary underline-offset-2 hover:underline">
              Cookiebeleid
            </Link>
            ,{" "}
            <Link href="/privacy" className="font-semibold text-primary underline-offset-2 hover:underline">
              privacy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onEssentialOnly}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border-strong bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-muted"
          >
            Weiger statistiek
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-deep"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  );
}
