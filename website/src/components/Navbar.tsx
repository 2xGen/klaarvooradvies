"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#hoe-het-werkt", label: "Hoe het werkt" },
  { href: "/gids", label: "Hypotheekgids" },
  { href: "/situatieschets", label: "Situatieschets" },
  { href: "/hypotheek", label: "Rekenhulp" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-soft/80 bg-surface/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="group font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          Klaar<span className="text-primary transition-colors group-hover:text-primary-deep"> voor </span>
          advies
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-foreground/80 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 transition-colors hover:bg-success-light hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/situatieschets"
            className="hidden rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-md sm:inline-flex"
          >
            Situatieschets
          </Link>
          <button
            type="button"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft bg-surface text-foreground transition hover:bg-surface-muted md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border-soft bg-surface px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-0.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-success-light"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/situatieschets"
                className="block rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-foreground shadow-sm"
                onClick={() => setOpen(false)}
              >
                Situatieschets
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
