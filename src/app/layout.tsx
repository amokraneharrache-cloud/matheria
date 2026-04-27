import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matheria | Prépare le brevet ou le bac de maths avec un coach IA",
  description: "Matheria aide votre enfant à identifier ses lacunes, à réviser en sessions courtes et à progresser jusqu’au jour de l’examen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-slate-900 bg-white">
        {children}
      </body>
    </html>
  );
}
