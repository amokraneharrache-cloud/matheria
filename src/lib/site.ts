export const BRAND_NAME = "SprintMaths";

export const SITE_NAME = BRAND_NAME;
export const ORGANIZATION_NAME = BRAND_NAME;
export const CONTACT_EMAIL = "contact@sprintmaths.com";
export const DEFAULT_TITLE = `${SITE_NAME} | Réviser le brevet et le bac de maths`;
export const DEFAULT_DESCRIPTION =
  "Des exercices guidés, un plan clair et une progression visible pour réviser efficacement les maths du Brevet au Bac.";
export const SITE_TAGLINE = "Le programme de révision maths du Brevet au Bac";
export const TERMINALE_CONVERSION_TAGLINE = "Réviser le bac de maths sans s'éparpiller";

export const DEFAULT_SITE_URL = "https://www.sprintmaths.com";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
).replace(/\/$/, "");

export const siteConfig = {
  brandName: BRAND_NAME,
  siteName: SITE_NAME,
  organizationName: ORGANIZATION_NAME,
  defaultTitle: DEFAULT_TITLE,
  defaultDescription: DEFAULT_DESCRIPTION,
  contactEmail: CONTACT_EMAIL,
  siteUrl,
} as const;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export const publicSeoRoutes = [
  "/",
  "/planning-revision-bac-maths",
  "/bac-maths-2027",
  "/exercices-type-bac-maths-terminale",
  "/bac-maths-terminale-2026",
  "/bac-terminale-maths",
  "/bac-premiere-maths",
  "/brevet-maths",
  "/programme-maths-terminale",
  "/programme-maths-premiere",
  "/programme-maths-brevet",
  "/methodes-maths-terminale",
  "/exercices-maths-terminale",
  "/articles",
] as const;

export type PublicSeoRoute = (typeof publicSeoRoutes)[number];

export const legalRoutes = [
  "/mentions-legales",
  "/cgv",
  "/politique-confidentialite",
  "/preferences-confidentialite",
  "/remboursement",
] as const;

export const privateNoindexPaths = [
  "/app",
  "/app/",
  "/app/*",
  "/merci",
  "/connexion",
  "/acces",
  "/diagnostic/resultat",
] as const;

export const robotsDisallowPaths = [
  "/app",
  "/app/*",
  "/admin",
  "/admin/*",
  "/api",
  "/api/*",
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
