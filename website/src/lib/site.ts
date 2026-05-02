/** Canonical site origin (no trailing slash). Set NEXT_PUBLIC_SITE_URL on production (e.g. Vercel). */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://klaarvooradvies.nl";
