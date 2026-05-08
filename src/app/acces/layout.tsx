import type { Metadata } from "next";
import { sharedNoindexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accès SprintMaths",
  robots: sharedNoindexRobots,
};

export default function AccesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

