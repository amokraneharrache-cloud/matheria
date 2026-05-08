import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProgramSeoPage } from "@/components/marketing/ProgramSeoPage";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const pagePath = "/programme-maths-premiere";

const description =
  "Les grands chapitres de maths Première travaillés dans SprintMaths : fonctions, second degré, dérivation, suites, probabilités, statistiques et automatismes.";

export const metadata: Metadata = {
  title: {
    absolute: "Programme maths Première | Chapitres & révision — SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Programme maths Première | Chapitres & révision — SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

export default function ProgrammeMathsPremierePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Bac Première maths", path: "/bac-premiere-maths" },
          { name: "Programme maths Première", path: pagePath },
        ])}
      />
      <ProgramSeoPage
        goal="bac-premiere"
        h1="Programme de maths Première : chapitres à travailler"
        intro="SprintMaths organise les grands chapitres de Première pour aider l'élève à cibler les notions clés et à préparer ses révisions avec méthode."
      />
    </>
  );
}

