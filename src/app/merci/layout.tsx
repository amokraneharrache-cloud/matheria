import type { Metadata } from "next";
import { sharedNoindexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Créer son accès",
  robots: sharedNoindexRobots,
};

export default function MerciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

