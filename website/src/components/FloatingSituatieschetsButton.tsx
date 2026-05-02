"use client";

import { FileText } from "lucide-react";
import Link from "next/link";

export function FloatingSituatieschetsButton() {
  return (
    <Link
      href="/situatieschets"
      className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-deep hover:shadow-xl md:bottom-8 md:right-6"
      aria-label="Start je situatieschets"
    >
      <FileText className="h-4 w-4" aria-hidden />
      Start situatieschets
    </Link>
  );
}
