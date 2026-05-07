import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { absoluteUrl, legalRoutes, publicSeoRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-28T00:00:00.000Z");

  const staticRoutes: MetadataRoute.Sitemap = publicSeoRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.includes("terminale") ? 0.9 : 0.8,
  }));

  const legalSitemapRoutes: MetadataRoute.Sitemap = legalRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  const articleRoutes = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...legalSitemapRoutes, ...articleRoutes];
}
