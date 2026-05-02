/** Canonical site origin (no trailing slash). Use www — apex redirects there on Vercel. Set NEXT_PUBLIC_SITE_URL on production. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.klaarvooradvies.nl";
