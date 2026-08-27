import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, sharedNoindexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Désinscription",
  robots: sharedNoindexRobots,
};

type PageProps = {
  searchParams: Promise<{ etat?: string }>;
};

const MESSAGES = {
  done: {
    title: "C'est fait, tu es désinscrit",
    body: "Tu ne recevras plus d'email de conseils ni d'offres SprintMaths. Cette désinscription est immédiate.",
  },
  invalid: {
    title: "Ce lien n'est plus valide",
    body: "Le lien de désinscription est incorrect ou a expiré. Écris-nous et nous nous en occupons à la main.",
  },
  unavailable: {
    title: "La désinscription n'a pas pu être enregistrée",
    body: "Un incident technique nous empêche de traiter la demande pour le moment. Réessaie dans quelques minutes, ou écris-nous : nous la traiterons manuellement.",
  },
} as const;

export default async function DesinscriptionPage({ searchParams }: PageProps) {
  const { etat } = await searchParams;
  const state = etat === "done" || etat === "invalid" || etat === "unavailable" ? etat : "invalid";
  const message = MESSAGES[state];

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold leading-8 text-slate-950 sm:text-3xl">
          {message.title}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">{message.body}</p>

        {state === "done" && (
          <p className="mt-4 leading-7 text-slate-700">
            Les ressources gratuites du site restent accessibles, sans email et sans
            compte.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/planning-revision-bac-maths"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1e3a8a] px-6 text-sm font-semibold text-white transition hover:bg-[#1e3a8a]/90"
          >
            Revenir aux ressources gratuites
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#1e3a8a] px-6 text-sm font-semibold text-[#1e3a8a] transition hover:bg-slate-50"
          >
            Nous écrire
          </a>
        </div>
      </div>
    </main>
  );
}
