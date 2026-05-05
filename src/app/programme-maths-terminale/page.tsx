import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProgramSeoPage } from "@/components/marketing/ProgramSeoPage";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const pagePath = "/programme-maths-terminale";

const description =
  "Découvre les grands chapitres de maths Terminale travaillés dans Matheria : suites, limites, dérivation, logarithme, exponentielle, probabilités et intégrales.";

export const metadata: Metadata = {
  title: {
    absolute: "Programme maths Terminale | Chapitres & priorités — Matheria",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Programme maths Terminale | Chapitres & priorités — Matheria",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

export default function ProgrammeMathsTerminalePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Bac Terminale maths", path: "/bac-terminale-maths" },
          { name: "Programme maths Terminale", path: pagePath },
        ])}
      />
      <ProgramSeoPage
        goal="terminale"
        h1="Programme de maths Terminale : chapitres et priorités de révision"
        intro="Retrouve les grands chapitres travaillés dans Matheria pour organiser les révisions de Terminale, repérer les priorités et relier le programme aux exercices."
      />
    </>
  );
}

