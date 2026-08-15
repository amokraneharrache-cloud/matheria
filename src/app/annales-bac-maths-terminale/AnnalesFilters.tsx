"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { annaleCenters, annaleTopics, annalesTerminale } from "./annales";

export function AnnalesFilters() {
  const [year, setYear] = useState("Toutes les années");
  const [center, setCenter] = useState("Tous les centres");
  const [topic, setTopic] = useState("Tous les chapitres");

  const visibleAnnales = useMemo(
    () => annalesTerminale.filter((annale) =>
      (year === "Toutes les années" || annale.year === year)
      && (center === "Tous les centres" || annale.center === center)
      && (topic === "Tous les chapitres" || annale.topics.includes(topic))),
    [year, center, topic],
  );

  return (
    <div>
      <div className="grid gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:grid-cols-3">
        <label className="font-bold text-slate-950">
          Année
          <select value={year} onChange={(event) => setYear(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal text-slate-700">
            <option>Toutes les années</option>
            <option>2026</option>
          </select>
        </label>
        <label className="font-bold text-slate-950">
          Centre
          <select value={center} onChange={(event) => setCenter(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal text-slate-700">
            <option>Tous les centres</option>
            {annaleCenters.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
        <label className="font-bold text-slate-950">
          Chapitre
          <select value={topic} onChange={(event) => setTopic(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 font-normal text-slate-700">
            <option>Tous les chapitres</option>
            {annaleTopics.map((value) => <option key={value}>{value}</option>)}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-slate-600" aria-live="polite">
        {visibleAnnales.length} sujet{visibleAnnales.length > 1 ? "s" : ""} affiché{visibleAnnales.length > 1 ? "s" : ""}. Tous les liens ouvrent le PDF publié par le ministère.
      </p>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[980px] border-collapse text-left">
          <caption className="bg-blue-950 px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] text-white">
            Annales officielles de spécialité mathématiques Terminale — session 2026
          </caption>
          <thead className="bg-slate-100">
            <tr>
              {["Année", "Centre", "Jour", "Thèmes vérifiés", "Sujet officiel", "Corrigé SprintMaths"].map((header) => (
                <th key={header} scope="col" className="px-4 py-3 font-bold text-slate-950">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleAnnales.map((annale) => (
              <tr key={annale.id} className="border-t border-slate-200 odd:bg-white even:bg-slate-50/70">
                <td className="px-4 py-4 align-top font-semibold">{annale.year}</td>
                <td className="px-4 py-4 align-top">{annale.center}</td>
                <td className="px-4 py-4 align-top">{annale.day}</td>
                <td className="px-4 py-4 align-top leading-7">{annale.topics.join(" · ")}</td>
                <td className="px-4 py-4 align-top">
                  <a href={annale.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-blue-900 underline underline-offset-4">
                    PDF officiel <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </td>
                <td className="px-4 py-4 align-top">
                  {annale.correctionHref ? (
                    <Link href={annale.correctionHref} className="font-bold text-blue-900 underline underline-offset-4">Correction détaillée</Link>
                  ) : <span className="text-slate-500">Pas encore publiée</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
