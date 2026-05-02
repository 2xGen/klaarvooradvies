"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [stored, setStored] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        stored?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Er ging iets mis. Probeer het later opnieuw.");
        return;
      }
      setStored(Boolean(data.stored));
      setDone(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Geen verbinding. Controleer je internet en probeer opnieuw.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div
        className="mt-8 rounded-2xl border border-primary/25 bg-success-light px-5 py-4 text-left text-sm text-foreground"
        role="status"
      >
        <p className="font-semibold text-primary-deep">Bedankt voor je bericht.</p>
        <p className="mt-2 leading-relaxed text-text-muted">
          {stored
            ? "We lezen het zo snel mogelijk en reageren per e-mail."
            : "Je bericht is ontvangen. Als er iets misging bij het doorsturen, probeer het later nog eens of gebruik de situatieschets voor adviseurscontact."}
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setStored(null);
          }}
          className="mt-4 text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          Nog een bericht sturen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 text-left" noValidate>
      <div className="space-y-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Naam *
          <input
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            className="min-h-[44px] rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          E-mailadres *
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="min-h-[44px] rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Je bericht *
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            minLength={15}
            rows={6}
            maxLength={8000}
            placeholder="Waarmee kunnen we helpen?"
            className="resize-y rounded-xl border border-border-soft bg-surface px-3 py-2.5 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25"
          />
          <span className="text-xs font-normal text-text-muted">{message.length}/8000 tekens</span>
        </label>
      </div>

      <div className="hidden" aria-hidden="true">
        <label>
          Bedrijf
          <input tabIndex={-1} value={company} onChange={(e) => setCompany(e.target.value)} />
        </label>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-deep disabled:opacity-60 sm:w-auto"
      >
        {busy ? "Verzenden..." : "Bericht versturen"}
      </button>
    </form>
  );
}
