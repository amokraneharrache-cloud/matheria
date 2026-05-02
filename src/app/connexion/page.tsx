"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { restoreBetaAccess } from "@/actions/beta";

export default function ConnexionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await restoreBetaAccess({
      parentEmail: formData.get("parentEmail") as string,
      accessCode: formData.get("accessCode") as string,
    });

    if (result.success) {
      localStorage.setItem(
        "matheria_student_profile",
        JSON.stringify({
          betaAccessId: result.profile.betaAccessId,
          parentEmail: result.profile.parentEmail,
          studentPseudo: result.profile.studentPseudo,
          examGoal: result.profile.examGoal,
          currentLevel: result.profile.currentLevel,
          accessCode: formData.get("accessCode") as string,
        })
      );
      router.push("/app");
    } else {
      setError(result.message || "Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-bold text-2xl text-blue-900">Matheria</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Connexion à l&apos;espace élève
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Retrouvez l&apos;espace de révision créé après la réservation du Pack Révision Express.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email parent
            </label>
            <input
              type="email"
              name="parentEmail"
              required
              autoComplete="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Code d&apos;accès
            </label>
            <input
              type="text"
              name="accessCode"
              required
              placeholder="MATHERIA..."
              autoComplete="off"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 uppercase"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Le code d&apos;accès est indiqué dans l&apos;email de confirmation.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
              {error}
              <div className="mt-2 flex flex-col gap-1 text-sm">
                <Link href="/merci" className="text-indigo-600 hover:underline font-medium">
                  → Créer un espace élève
                </Link>
                <Link href="/acces" className="text-gray-500 hover:underline">
                  → Besoin d&apos;aide pour accéder ?
                </Link>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Connexion en cours..." : "Accéder à mon espace"}
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Pas encore d&apos;espace élève ?{" "}
            <Link href="/merci" className="text-indigo-600 hover:underline font-medium">
              Créer l&apos;espace après réservation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
