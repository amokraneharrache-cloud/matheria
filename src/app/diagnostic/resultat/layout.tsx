import type { Metadata } from "next";
import { sharedNoindexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résultat du diagnostic",
  robots: sharedNoindexRobots,
};

export default function DiagnosticResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

