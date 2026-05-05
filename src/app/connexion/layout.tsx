import type { Metadata } from "next";
import { sharedNoindexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connexion espace élève",
  robots: sharedNoindexRobots,
};

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

