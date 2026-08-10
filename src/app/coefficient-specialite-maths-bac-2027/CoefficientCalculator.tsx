"use client";

import { useState } from "react";

const SPECIALITY_COEFFICIENT = 16;
const numberFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 2,
});

function parseNote(value: string) {
  if (value.trim() === "") {
    return null;
  }

  const parsedValue = Number(value.replace(",", "."));
  return Number.isFinite(parsedValue) && parsedValue >= 0 && parsedValue <= 20
    ? parsedValue
    : null;
}

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

export function CoefficientCalculator() {
  const [noteInput, setNoteInput] = useState("12");
  const note = parseNote(noteInput);
  const weightedPoints = note === null ? null : note * SPECIALITY_COEFFICIENT;

  return (
    <section className="rounded-2xl border-2 border-blue-300 bg-blue-50 p-6 sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
        Calculateur local
      </p>
      <h2 className="mt-3 text-3xl font-bold text-slate-950">
        Combien de points me rapporte ma note en spécialité maths ?
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-700">
        Saisis une note sur 20. Le calcul reste dans ton navigateur : aucune donnée
        n&apos;est envoyée ni enregistrée.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,260px)_1fr] lg:items-end">
        <div>
          <label htmlFor="speciality-note" className="block font-bold text-slate-950">
            Note obtenue sur 20
          </label>
          <input
            id="speciality-note"
            type="text"
            inputMode="decimal"
            value={noteInput}
            onChange={(event) => setNoteInput(event.target.value)}
            aria-invalid={note === null}
            aria-describedby="speciality-note-help"
            className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-lg font-semibold text-slate-950 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
          />
          <p id="speciality-note-help" className="mt-2 text-sm text-slate-600">
            Valeur comprise entre 0 et 20 ; le point ou la virgule sont acceptés.
          </p>
        </div>

        <output
          aria-live="polite"
          className="grid gap-3 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-3"
        >
          <span>
            <span className="block text-sm font-semibold text-slate-500">Note obtenue</span>
            <strong className="mt-1 block text-2xl text-slate-950">
              {note === null ? "—" : `${formatNumber(note)}/20`}
            </strong>
          </span>
          <span>
            <span className="block text-sm font-semibold text-slate-500">Coefficient</span>
            <strong className="mt-1 block text-2xl text-slate-950">16</strong>
          </span>
          <span>
            <span className="block text-sm font-semibold text-slate-500">Points pondérés</span>
            <strong className="mt-1 block text-2xl text-blue-950">
              {weightedPoints === null ? "Note invalide" : formatNumber(weightedPoints)}
            </strong>
          </span>
        </output>
      </div>
    </section>
  );
}
