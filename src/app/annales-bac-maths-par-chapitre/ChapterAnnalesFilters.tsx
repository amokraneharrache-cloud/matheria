"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, RotateCcw } from "lucide-react";
import { chapterExercises, chapterNames, type AnnaleDifficulty, type ChapterName } from "./data";

const years = ["2024", "2025", "2026"] as const;
const difficulties: readonly AnnaleDifficulty[] = ["Accessible", "Intermédiaire", "Soutenue"];

export function ChapterAnnalesFilters() {
  const [chapter, setChapter] = useStateWithAll<ChapterName>();
  const [year, setYear] = useStateWithAll<(typeof years)[number]>();
  const [difficulty, setDifficulty] = useStateWithAll<AnnaleDifficulty>();

  const filtered = chapterExercises.filter((item) => {
    const matchesChapter = chapter === "Tous" || item.mainChapter === chapter || item.secondaryChapters.includes(chapter);
    return matchesChapter && (year === "Tous" || item.year === year) && (difficulty === "Tous" || item.difficulty === difficulty);
  });

  const reset = () => { setChapter("Tous"); setYear("Tous"); setDifficulty("Tous"); };

  return (
    <div className="space-y-7">
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect label="Chapitre" value={chapter} onChange={(value) => setChapter(value as ChapterName | "Tous")} options={chapterNames} />
        <FilterSelect label="Année" value={year} onChange={(value) => setYear(value as (typeof years)[number] | "Tous")} options={years} />
        <FilterSelect label="Difficulté" value={difficulty} onChange={(value) => setDifficulty(value as AnnaleDifficulty | "Tous")} options={difficulties} />
        <button type="button" onClick={reset} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 font-bold text-slate-800 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900">
          <RotateCcw className="h-4 w-4" aria-hidden="true" /> Réinitialiser
        </button>
      </div>

      <p className="font-semibold text-slate-700" aria-live="polite">{filtered.length} exercice{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""} sur {chapterExercises.length}</p>

      {filtered.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((item) => (
            <article key={item.id} data-annale-card className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-800">Bac {item.year} · {item.center}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">{item.day} · {item.exercise} — {item.title}</h3>
              <dl className="mt-5 space-y-3 text-sm leading-6">
                <div><dt className="inline font-bold text-slate-950">Chapitre principal : </dt><dd className="inline text-slate-700">{item.mainChapter}</dd></div>
                {item.secondaryChapters.length ? <div><dt className="inline font-bold text-slate-950">Secondaires : </dt><dd className="inline text-slate-700">{item.secondaryChapters.join(", ")}</dd></div> : null}
                <div><dt className="inline font-bold text-slate-950">Travaille : </dt><dd className="inline text-slate-700">{item.exactNotions}</dd></div>
                <div><dt className="inline font-bold text-slate-950">Difficulté : </dt><dd className="inline text-slate-700">{item.difficulty} — estimation SprintMaths</dd></div>
              </dl>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <a href={item.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-900 px-4 py-2 font-bold text-white hover:bg-blue-800">Sujet officiel <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
                <Link href={item.correctionHref} className="inline-flex min-h-11 items-center rounded-full border border-blue-900 px-4 py-2 font-bold text-blue-900 hover:bg-blue-50">Corrigé SprintMaths</Link>
                <Link href={item.methodHref} className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-4 py-2 font-bold text-slate-800 hover:bg-slate-50">Revoir la méthode</Link>
              </div>
            </article>
          ))}
        </div>
      ) : <p className="rounded-xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950">Aucun exercice ne combine ces trois critères. Élargis l’année ou la difficulté.</p>}
    </div>
  );
}

function useStateWithAll<T extends string>() {
  return useState<T | "Tous">("Tous");
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly string[] }) {
  return (
    <label className="grid gap-2 font-bold text-slate-900">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 font-normal text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900">
        <option value="Tous">Tous</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
