import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { absoluteUrl, legalRoutes, publicSeoRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-14T00:00:00.000Z");
  const routeLastModified = new Map<string, Date>([
    ["/formules-bac-maths-terminale", new Date("2026-07-29T00:00:00.000Z")],
    ["/redaction-bac-maths-terminale", new Date("2026-07-29T00:00:00.000Z")],
    [
      "/preparer-entree-terminale-specialite-maths",
      new Date("2026-07-29T00:00:00.000Z"),
    ],
    ["/demonstrations-bac-maths-terminale", new Date("2026-08-04T00:00:00.000Z")],
    ["/python-bac-maths-terminale", new Date("2026-08-06T00:00:00.000Z")],
    ["/equations-differentielles-terminale", new Date("2026-08-06T00:00:00.000Z")],
    ["/quiz-maths-terminale-specialite", new Date("2026-08-06T00:00:00.000Z")],
    ["/denombrement-terminale-specialite-maths", new Date("2026-08-07T00:00:00.000Z")],
    ["/primitives-terminale-specialite-maths", new Date("2026-08-07T00:00:00.000Z")],
    ["/programme-maths-terminale", new Date("2026-08-10T00:00:00.000Z")],
    ["/coefficient-specialite-maths-bac-2027", new Date("2026-08-10T00:00:00.000Z")],
    ["/calculatrice-bac-maths-2027", new Date("2026-08-10T00:00:00.000Z")],
    ["/grand-oral-maths-2027", new Date("2026-08-13T00:00:00.000Z")],
    ["/sujets-grand-oral-maths", new Date("2026-08-13T00:00:00.000Z")],
    ["/questions-jury-grand-oral-maths", new Date("2026-08-13T00:00:00.000Z")],
    ["/epreuve-anticipee-maths-premiere", new Date("2026-08-13T00:00:00.000Z")],
    ["/sujets-zero-maths-premiere", new Date("2026-08-13T00:00:00.000Z")],
    ["/automatismes-maths-premiere", new Date("2026-08-13T00:00:00.000Z")],
    ["/formules-maths-premiere-specialite", new Date("2026-08-14T00:00:00.000Z")],
    ["/quiz-maths-premiere-specialite", new Date("2026-08-14T00:00:00.000Z")],
    [
      "/exercices-epreuve-anticipee-maths-premiere",
      new Date("2026-08-14T00:00:00.000Z"),
    ],
    [
      "/methodes-maths-terminale/probabilites-conditionnelles",
      new Date("2026-08-04T00:00:00.000Z"),
    ],
  ]);

  const staticRoutes: MetadataRoute.Sitemap = publicSeoRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: routeLastModified.get(route) ?? lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/bac-maths-2027"
          ? 0.98
          : route === "/planning-revision-bac-maths"
            ? 0.92
            : route.includes("terminale")
              ? 0.9
              : 0.8,
  }));

  const legalSitemapRoutes: MetadataRoute.Sitemap = legalRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  const articleRoutes = articles.map((article) => ({
    url: absoluteUrl(`/articles/${article.slug}`),
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...legalSitemapRoutes, ...articleRoutes];
}
