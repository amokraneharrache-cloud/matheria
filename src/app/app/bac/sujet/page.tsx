import type { Metadata } from "next";
import { Suspense } from "react";
import { sharedNoindexRobots } from "@/lib/site";
import { BacMockExamClient } from "./BacMockExamClient";

export const metadata: Metadata = {
  title: "Sujet type bac — note virtuelle",
  robots: sharedNoindexRobots,
};

export default function BacMockExamPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-slate-500">Chargement du sujet...</div>}>
      <BacMockExamClient />
    </Suspense>
  );
}
