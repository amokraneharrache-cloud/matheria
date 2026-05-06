import type { Metadata } from "next";
import { sharedNoindexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin codes d'accès",
  robots: sharedNoindexRobots,
};

export default function AdminCodesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

