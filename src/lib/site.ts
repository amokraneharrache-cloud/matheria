export const SITE_NAME = "Matheria";

export const DEFAULT_SITE_URL = "https://matheria.fr";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export const publicSeoRoutes = [
  "/",
  "/bac-terminale-maths",
  "/bac-premiere-maths",
  "/brevet-maths",
  "/programme-maths-terminale",
  "/programme-maths-premiere",
  "/programme-maths-brevet",
  "/methodes-maths-terminale",
  "/exercices-maths-terminale",
] as const;

export type PublicSeoRoute = (typeof publicSeoRoutes)[number];

export const privateNoindexPaths = [
  "/app",
  "/app/",
  "/app/*",
  "/merci",
  "/connexion",
  "/acces",
  "/diagnostic/resultat",
] as const;

export const sharedNoindexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
} as const;

