import Image from "next/image";
import { CheckCircle2, Smartphone } from "lucide-react";

const screenshots = [
  {
    src: "/images/screenshots/bac-2026-dashboard.png",
    title: "Tableau de bord",
    alt: "Capture mobile du tableau de bord SprintMaths avec accès au Mode Bac Terminale.",
  },
  {
    src: "/images/screenshots/bac-2026-guided-exercise.png",
    title: "Sujet guidé",
    alt: "Capture mobile d'un sujet type bac guidé étape par étape dans SprintMaths.",
  },
  {
    src: "/images/screenshots/bac-2026-score.png",
    title: "Note indicative /20",
    alt: "Capture mobile de la progression SprintMaths avec une note indicative sur 20.",
  },
  {
    src: "/images/screenshots/bac-2026-methods.png",
    title: "Fiches méthodes",
    alt: "Capture mobile d'une fiche méthode SprintMaths pour les exercices de Terminale.",
  },
];

export function Bac2026ProductDemo() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
            Démo produit
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            Captures mobiles de l&apos;interface
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          Captures générées localement avec un profil de démonstration, sans
          données de vrais utilisateurs.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {screenshots.map((screenshot) => (
          <article key={screenshot.src} className="rounded-2xl bg-slate-950 p-3 shadow-xl">
            <div className="overflow-hidden rounded-xl bg-white">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                width={390}
                height={844}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full object-cover object-top"
              />
            </div>
            <p className="mt-3 flex items-center gap-2 px-1 text-sm font-bold text-white">
              <Smartphone className="h-4 w-4 text-blue-200" />
              {screenshot.title}
            </p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <p className="flex items-center gap-2 font-bold text-slate-900">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          Vidéo démo à ajouter
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Le bloc est prêt à recevoir une courte vidéo mobile du Mode Bac, d&apos;un
          exercice guidé, d&apos;une correction et d&apos;une note indicative /20.
        </p>
      </div>
    </section>
  );
}
