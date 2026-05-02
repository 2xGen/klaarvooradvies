import type { MetadataRoute } from "next";

import { getPublishedHypotheekGidsen } from "@/lib/hypotheekGidsen";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPaths = [
    "",
    "/hypotheek",
    "/situatieschets",
    "/contact",
    "/gids",
    "/verzekeringen",
    "/pensioen",
    "/privacy",
    "/voorwaarden",
    "/cookies",
  ];

  const articles = getPublishedHypotheekGidsen().map((g) => ({
    url: `${siteUrl}/gids/${g.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const main = staticPaths.map((path) => ({
    url: path === "" ? `${siteUrl}/` : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : path === "/situatieschets" || path === "/hypotheek" ? 0.95 : 0.85,
  }));

  return [...main, ...articles];
}
