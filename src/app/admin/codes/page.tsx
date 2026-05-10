"use client";

import { useState } from "react";
import {
  generateAccessCode,
  listAccessCodes,
  revokeAccessCode,
  type AdminAccessCodeRow,
} from "@/actions/adminCodes";

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

const statusLabels: Record<AdminAccessCodeRow["status"], string> = {
  unused: "Disponible",
  used: "Utilisé",
  revoked: "Révoqué",
};

const sourceLabels: Record<AdminAccessCodeRow["source"], string> = {
  manual: "manual",
  stripe: "stripe",
};

export default function AdminCodesPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [codes, setCodes] = useState<AdminAccessCodeRow[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCodes = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    const result = await listAccessCodes({ adminPassword });
    if (result.success) {
      setCodes(result.codes);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setGeneratedCode("");

    const result = await generateAccessCode({
      adminPassword,
      parentEmail,
    });

    if (result.success) {
      setGeneratedCode(result.code);
      setMessage("Code généré.");
      const listResult = await listAccessCodes({ adminPassword });
      if (listResult.success) {
        setCodes(listResult.codes);
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    if (!generatedCode) return;
    await navigator.clipboard.writeText(generatedCode);
    setMessage("Code copié.");
  };

  const handleCopyClientCode = async (row: AdminAccessCodeRow) => {
    const value = row.parentEmail ? `${row.parentEmail} — ${row.code}` : row.code;
    await navigator.clipboard.writeText(value);
    setMessage("Email client + code copiés.");
  };

  const handleRevoke = async (code: string) => {
    setLoading(true);
    setError("");
    setMessage("");

    const result = await revokeAccessCode({ adminPassword, code });
    if (result.success) {
      setMessage(`Code ${code} révoqué.`);
      const listResult = await listAccessCodes({ adminPassword });
      if (listResult.success) {
        setCodes(listResult.codes);
      }
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <p className="text-sm font-bold uppercase tracking-wide text-indigo-300">
            Administration SprintMaths
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">Codes d&apos;accès uniques</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Génère un code manuel si besoin, dépanne un client et vérifie les
            codes créés automatiquement par Stripe.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <form onSubmit={handleGenerate} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <label className="text-sm font-semibold text-slate-200">
                Mot de passe admin
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-200">
                Email client optionnel
              </label>
              <input
                type="email"
                value={parentEmail}
                onChange={(event) => setParentEmail(event.target.value)}
                placeholder="parent@email.fr"
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-slate-100 outline-none focus:border-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-500 px-5 py-3 font-bold text-white hover:bg-indigo-400 disabled:opacity-50"
            >
              {loading ? "Traitement..." : "Générer un code"}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={loadCodes}
              disabled={loading || !adminPassword}
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-bold text-slate-100 hover:bg-slate-800 disabled:opacity-50"
            >
              Charger les 50 derniers codes
            </button>
            {generatedCode && (
              <div className="flex flex-1 flex-col gap-3 rounded-xl bg-emerald-950/60 p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-xl font-bold text-emerald-200">
                  {generatedCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-bold text-emerald-950 hover:bg-emerald-300"
                >
                  Copier
                </button>
              </div>
            )}
          </div>

          {message && (
            <p className="mt-4 rounded-xl border border-emerald-800 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-200">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 rounded-xl border border-red-800 bg-red-950/60 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <div className="border-b border-slate-800 p-5">
            <h2 className="text-xl font-bold">50 derniers codes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-950 text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Créé</th>
                  <th className="px-4 py-3">Utilisé</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {codes.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      Aucun code chargé.
                    </td>
                  </tr>
                ) : (
                  codes.map((row) => (
                    <tr key={row.code}>
                      <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-slate-100">
                        {row.code}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                        {sourceLabels[row.source]}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                        {row.parentEmail || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            row.status === "unused"
                              ? "bg-emerald-950 text-emerald-200"
                              : row.status === "used"
                                ? "bg-blue-950 text-blue-200"
                                : "bg-red-950 text-red-200"
                          }`}
                        >
                          {statusLabels[row.status]}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                        {formatDate(row.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                        {formatDate(row.usedAt)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyClientCode(row)}
                            className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800"
                          >
                            Copier
                          </button>
                          {row.status === "unused" ? (
                            <button
                              type="button"
                              onClick={() => handleRevoke(row.code)}
                              disabled={loading}
                              className="rounded-lg border border-red-800 px-3 py-2 text-xs font-bold text-red-200 hover:bg-red-950 disabled:opacity-50"
                            >
                              Révoquer
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
