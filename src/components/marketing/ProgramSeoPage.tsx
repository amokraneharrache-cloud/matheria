import Link from "next/link";
import { BookOpen, Flag, Target } from "lucide-react";
import { getProgram, ProgramGoal } from "@/data/programs";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoCta } from "@/components/marketing/SeoCta";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";

const priorityLabels = {
  high: "Priorité forte",
  medium: "Priorité moyenne",
  low: "À revoir ensuite",
} as const;

const levelPages: Record<ProgramGoal, string> = {
  terminale: "/bac-terminale-maths",
  "bac-premiere": "/bac-premiere-maths",
  brevet: "/brevet-maths",
};

const pagePaths: Record<ProgramGoal, string> = {
  terminale: "/programme-maths-terminale",
  "bac-premiere": "/programme-maths-premiere",
  brevet: "/programme-maths-brevet",
};

type ProgramSeoPageProps = {
  goal: ProgramGoal;
  h1: string;
  intro: string;
};

export function ProgramSeoPage({ goal, h1, intro }: ProgramSeoPageProps) {
  const program = getProgram(goal);

  if (!program) {
    return null;
  }

  return (
    <SeoPageLayout urgencySourcePage={pagePaths[goal]}>
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
            Les grands chapitres travaillés dans SprintMaths
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            {h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/diagnostic"
              className="rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white hover:bg-blue-800"
            >
              Faire le diagnostic gratuit
            </Link>
            <Link
              href={levelPages[goal]}
              className="rounded-full border border-blue-900 px-6 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
            >
              Voir la page niveau
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">{program.title}</h2>
            <p className="mt-3 text-slate-700">{program.subtitle}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {program.topics.map((topic, index) => (
              <article
                key={topic.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-400">
                      Chapitre {(index + 1).toString().padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-slate-950">
                      {topic.label}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      topic.priority === "high"
                        ? "bg-red-50 text-red-700"
                        : topic.priority === "medium"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {priorityLabels[topic.priority]}
                  </span>
                </div>
                <p className="mt-3 text-slate-700">{topic.description}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Réviser dans l'ordre",
                text: "Les chapitres sont présentés pour aider l'élève à visualiser ce qui doit être travaillé.",
              },
              {
                icon: Target,
                title: "Prioriser les efforts",
                text: "Les priorités signalent les notions à consolider en premier quand le temps manque.",
              },
              {
                icon: Flag,
                title: "Construire un plan",
                text: "Le diagnostic et le plan de révision aident à transformer la liste des chapitres en actions concrètes.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl bg-slate-50 p-5">
                <item.icon className="h-6 w-6 text-blue-800" />
                <h3 className="mt-3 font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>

          <SeoCta
            title="Transformer ce programme en plan de révision"
            description="Le diagnostic gratuit aide à choisir les chapitres à travailler en priorité selon l'objectif et le niveau ressenti."
          />
          <InternalLinks currentPath={pagePaths[goal]} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
