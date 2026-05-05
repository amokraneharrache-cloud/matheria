import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { absoluteUrl, siteUrl, SITE_NAME } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Matheria | Réviser le brevet et le bac de maths",
    template: "%s | Matheria",
  },
  description:
    "Matheria aide les élèves à réviser les maths avec des exercices ciblés, un programme par chapitre, un plan de révision et un suivi de progression.",
  applicationName: SITE_NAME,
  openGraph: {
    title: "Matheria | Réviser le brevet et le bac de maths",
    description:
      "Exercices ciblés, plan de révision, programme par chapitre et progression pour préparer le brevet, le bac de Première et le bac Terminale.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matheria | Réviser le brevet et le bac de maths",
    description:
      "Une web app mobile-first pour réviser les maths avec exercices, méthodes, plan de révision et progression.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-white">
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
