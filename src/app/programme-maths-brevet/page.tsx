import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProgramSeoPage } from "@/components/marketing/ProgramSeoPage";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const pagePath = "/programme-maths-brevet";

const description =
  "Les grands chapitres de maths du brevet travaillés dans SprintMaths : fractions, équations, fonctions, géométrie, Pythagore, Thalès et probabilités.";

export const metadata: Metadata = {
  title: {
    absolute: "Programme maths Brevet | Chapitres & priorités — SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Programme maths Brevet | Chapitres & priorités — SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

export default function ProgrammeMathsBrevetPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Brevet maths", path: "/brevet-maths" },
          { name: "Programme maths Brevet", path: pagePath },
        ])}
      />
      <ProgramSeoPage
        goal="brevet"
        h1="Programme de maths du brevet : chapitres et priorités"
        intro="SprintMaths présente les grands chapitres de 3e à travailler pour préparer le brevet avec des priorités simples et des sessions courtes."
      />
    </>
  );
}

