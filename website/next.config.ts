import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const configDir = dirname(fileURLToPath(import.meta.url));
/** Repo root (parent of `website/`). Must match Vercel's outputFileTracingRoot or Turbopack breaks native deps (e.g. lightningcss). */
const monorepoRoot = join(configDir, "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: monorepoRoot,
  turbopack: {
    root: monorepoRoot,
  },
  images: {
    /** Allow `<Image quality={…}>` values used on the site (Next 15.5+ warns otherwise). */
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "soaacpusdhyxwucjhhpy.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "iemgpccgdlwpsrsjuumo.supabase.co",
        pathname: "/storage/v1/object/sign/**",
      },
      {
        protocol: "https",
        hostname: "iemgpccgdlwpsrsjuumo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/hypotheek-onpager", destination: "/situatieschets", permanent: true },
      { source: "/hypotheek-berekenen", destination: "/hypotheek", permanent: true },
      { source: "/whatsapp", destination: "/contact", permanent: false },
      { source: "/werken-in-finance", destination: "/", permanent: false },
      { source: "/financiele-vraag", destination: "/", permanent: false },
      { source: "/hoeveel-hypotheek-kan-ik-krijgen-2026", destination: "/hypotheek", permanent: true },
      { source: "/eerste-huis-kopen-stappenplan", destination: "/", permanent: false },
      { source: "/hypotheek-regels-2026", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
