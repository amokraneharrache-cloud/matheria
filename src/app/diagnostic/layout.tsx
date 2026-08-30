import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini-test de prérequis Terminale spécialité maths",
  description:
    "10 questions de maths avec résultat immédiat, sous-scores, corrections et ressources adaptées pour préparer l'entrée en Terminale spécialité maths.",
  alternates: {
    canonical: "/diagnostic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function DiagnosticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
