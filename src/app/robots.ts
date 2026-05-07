import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/diagnostic"],
      disallow: ["/app/*", "/admin/*"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
