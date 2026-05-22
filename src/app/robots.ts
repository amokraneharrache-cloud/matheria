import type { MetadataRoute } from "next";
import { absoluteUrl, robotsDisallowPaths } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/diagnostic"],
      disallow: [...robotsDisallowPaths],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
