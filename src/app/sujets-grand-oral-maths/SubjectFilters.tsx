"use client";

import { useMemo, useState } from "react";
import type {
  GrandOralChapter,
  GrandOralDifficulty,
  GrandOralSpecialty,
  GrandOralSubject,
} from "@/data/grandOral";

const chapterOptions: GrandOralChapter[] = [
  "Probabilités",
  "Suites",
  "Exponentielle et logarithme",
  "Fonctions",
  "Intégrales",
  "Géométrie",
  "Python",
];

const specialtyOptions: GrandOralSpecialty[] = ["Aucune", "Physique", "SES", "NSI", "SVT"];
const difficultyOptions: GrandOralDifficulty[] = ["Accessible", "Intermédiaire", "Exigeant"];

const subjectGroups = [
  {
    id: "probabilites",
    title: "Sujets de Grand Oral Maths sur les probabilités",
    description:
      "Hasard, conditionnement, espérance, échantillonnage et loi binomiale : chaque sujet part d’une question précise, pas d’un simple exposé de cours.",
    matches: (subject: GrandOralSubject) => subject.chapter === "Probabilités",
  },
  {
    id: "suites",
    title: "Suites et modèles d’évolution",
    matches: (subject: GrandOralSubject) => subject.category === "Suites et modèles d’évolution",
  },
  {
    id: "exponentielle-logarithme",
    title: "Exponentielle et logarithme",
    matches: (subject: GrandOralSubject) => subject.category === "Exponentielle et logarithme",
  },
  {
    id: "derivation-optimisation",
    title: "Dérivation et optimisation",
    matches: (subject: GrandOralSubject) => subject.category === "Dérivation et optimisation",
  },
  {
    id: "integrales",
    title: "Intégrales et quantités cumulées",
    matches: (subject: GrandOralSubject) => subject.category === "Intégrales et quantités cumulées",
  },
  {
    id: "geometrie",
    title: "Géométrie et espace",
    matches: (subject: GrandOralSubject) => subject.category === "Géométrie et espace",
  },
  {
    id: "algorithmique",
    title: "Algorithmique et informatique",
    matches: (subject: GrandOralSubject) => subject.category === "Algorithmique et informatique",
  },
  {
    id: "autres-specialites",
    title: "Mathématiques et autres spécialités",
    matches: (subject: GrandOralSubject) =>
      subject.category === "Mathématiques et autres spécialités" &&
      subject.chapter !== "Probabilités",
  },
] as const;

function difficultyClassName(difficulty: GrandOralDifficulty) {
  if (difficulty === "Accessible") return "bg-emerald-100 text-emerald-900";
  if (difficulty === "Intermédiaire") return "bg-amber-100 text-amber-900";
  return "bg-rose-100 text-rose-900";
}

function isSurveySubject(subject: GrandOralSubject) {
  return subject.question.toLocaleLowerCase("fr").includes("sondage");
}

function SubjectCard({
  subject,
  headingLevel = 3,
}: {
  subject: GrandOralSubject;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    <article
      id={`sujet-grand-oral-${subject.id}`}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm [contain-intrinsic-size:auto_420px] [content-visibility:auto] sm:p-6"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-900">
          Sujet {subject.id}
        </span>
        <span className={`rounded-full px-3 py-1 ${difficultyClassName(subject.difficulty)}`}>
          {subject.difficulty}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
          {subject.specialty === "Aucune" ? "Maths" : `Maths + ${subject.specialty}`}
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold text-blue-900">{subject.category}</p>
      <Heading className="mt-2 text-xl font-bold leading-8 text-slate-950">
        {subject.question}
      </Heading>

      <dl className="mt-5 space-y-4 text-sm leading-6 text-slate-700">
        <div>
          <dt className="font-bold text-slate-950">Notions mobilisées</dt>
          <dd>{subject.notions.join(" · ")}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-950">Pourquoi le sujet fonctionne</dt>
          <dd>{subject.why}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-950">Piste de raisonnement</dt>
          <dd>{subject.approach}</dd>
        </div>
        <div className="rounded-xl bg-amber-50 p-4 text-amber-950">
          <dt className="font-bold">Point de vigilance</dt>
          <dd>{subject.warning}</dd>
        </div>
      </dl>
    </article>
  );
}

function SubjectGrid({
  subjects,
  headingLevel = 3,
}: {
  subjects: GrandOralSubject[];
  headingLevel?: 3 | 4;
}) {
  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

export function SubjectFilters({ subjects }: { subjects: GrandOralSubject[] }) {
  const [chapter, setChapter] = useState<GrandOralChapter | "Tous">("Tous");
  const [specialty, setSpecialty] = useState<GrandOralSpecialty | "Toutes">("Toutes");
  const [difficulty, setDifficulty] = useState<GrandOralDifficulty | "Toutes">("Toutes");

  const filteredSubjects = useMemo(
    () =>
      subjects.filter(
        (subject) =>
          (chapter === "Tous" || subject.chapter === chapter) &&
          (specialty === "Toutes" || subject.specialty === specialty) &&
          (difficulty === "Toutes" || subject.difficulty === difficulty),
      ),
    [chapter, difficulty, specialty, subjects],
  );

  const groupedSubjects = useMemo(
    () =>
      subjectGroups
        .map((group) => ({ ...group, subjects: filteredSubjects.filter(group.matches) }))
        .filter((group) => group.subjects.length > 0),
    [filteredSubjects],
  );

  function resetFilters() {
    setChapter("Tous");
    setSpecialty("Toutes");
    setDifficulty("Toutes");
  }

  return (
    <section aria-labelledby="subject-explorer-title">
      <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
              Outil local
            </p>
            <h2 id="subject-explorer-title" className="mt-2 text-3xl font-bold text-slate-950">
              Filtrer les 50 problématiques
            </h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-700">
              Tous les sujets sont présents dans la page. Les filtres servent seulement à repérer
              ceux qui correspondent le mieux à tes notions et à ta deuxième spécialité.
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-11 rounded-full border border-blue-900 bg-white px-4 py-2 text-sm font-bold text-blue-950 hover:bg-blue-100"
          >
            Réinitialiser
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 font-bold text-slate-900">
            Chapitre
            <select
              value={chapter}
              onChange={(event) => setChapter(event.target.value as GrandOralChapter | "Tous")}
              className="min-h-12 rounded-xl border border-blue-200 bg-white px-3 font-normal text-slate-900"
            >
              <option value="Tous">Tous les chapitres</option>
              {chapterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 font-bold text-slate-900">
            Deuxième spécialité
            <select
              value={specialty}
              onChange={(event) => setSpecialty(event.target.value as GrandOralSpecialty | "Toutes")}
              className="min-h-12 rounded-xl border border-blue-200 bg-white px-3 font-normal text-slate-900"
            >
              <option value="Toutes">Toutes</option>
              {specialtyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 font-bold text-slate-900">
            Difficulté
            <select
              value={difficulty}
              onChange={(event) =>
                setDifficulty(event.target.value as GrandOralDifficulty | "Toutes")
              }
              className="min-h-12 rounded-xl border border-blue-200 bg-white px-3 font-normal text-slate-900"
            >
              <option value="Toutes">Toutes</option>
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 font-bold text-slate-900" aria-live="polite">
        {filteredSubjects.length} problématique{filteredSubjects.length > 1 ? "s" : ""} affichée
        {filteredSubjects.length > 1 ? "s" : ""}
      </p>

      {filteredSubjects.length > 0 ? (
        <div className="mt-10 space-y-14">
          {groupedSubjects.map((group) => {
            if (group.id === "probabilites") {
              const surveys = group.subjects.filter(isSurveySubject);
              const otherProbabilitySubjects = group.subjects.filter(
                (subject) => !isSurveySubject(subject),
              );

              return (
                <section
                  key={group.id}
                  id={group.id}
                  aria-labelledby={`${group.id}-title`}
                  className="scroll-mt-24"
                >
                  <h2 id={`${group.id}-title`} className="text-3xl font-bold text-slate-950">
                    {group.title}
                  </h2>
                  <p className="mt-3 max-w-4xl leading-7 text-slate-700">{group.description}</p>

                  {surveys.length > 0 ? (
                    <section
                      id="sondages"
                      aria-labelledby="sondages-title"
                      className="mt-9 scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-7"
                    >
                      <h3 id="sondages-title" className="text-2xl font-bold text-slate-950">
                        Grand Oral Maths : sondages et statistiques
                      </h3>
                      <p className="mt-2 max-w-3xl leading-7 text-slate-700">
                        Deux angles pour distinguer l’incertitude aléatoire d’un échantillon des biais
                        de sélection ou de non-réponse.
                      </p>
                      <SubjectGrid subjects={surveys} headingLevel={4} />
                    </section>
                  ) : null}

                  {otherProbabilitySubjects.length > 0 ? (
                    <div className="mt-9">
                      <h3 className="text-2xl font-bold text-slate-950">
                        Autres problématiques de probabilités
                      </h3>
                      <SubjectGrid subjects={otherProbabilitySubjects} headingLevel={4} />
                    </div>
                  ) : null}
                </section>
              );
            }

            return (
              <section
                key={group.id}
                id={group.id}
                aria-labelledby={`${group.id}-title`}
                className="scroll-mt-24"
              >
                <h2 id={`${group.id}-title`} className="text-3xl font-bold text-slate-950">
                  {group.title}
                </h2>
                <SubjectGrid subjects={group.subjects} />
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="font-bold text-slate-950">Aucun sujet ne correspond à ces trois filtres.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 min-h-11 rounded-full bg-blue-900 px-5 py-2 font-bold text-white hover:bg-blue-800"
          >
            Voir les 50 sujets
          </button>
        </div>
      )}
    </section>
  );
}
