import type { MetadataRoute } from "next";
import { absoluteUrl, publicSeoRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-28T00:00:00.000Z");

  return publicSeoRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.includes("terminale") ? 0.9 : 0.8,
  }));
}

