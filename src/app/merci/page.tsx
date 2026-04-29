"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { activateBetaAccess } from "@/actions/beta";

export default function MerciPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      parentEmail: formData.get("parentEmail") as string,
      studentPseudo: formData.get("studentPseudo") as string,
      examGoal: formData.get("examGoal") as string,
      currentLevel: formData.get("currentLevel") as string,
      accessCode: formData.get("accessCode") as string,
    };

    const result = await activateBetaAccess(data);

    if (result.success && result.betaAccessId) {
      // Store student profile in localStorage
      localStorage.setItem("matheria_student_profile", JSON.stringify({
        ...data,
        betaAccessId: result.betaAccessId,
      }));
      router.push("/app");
    } else {
      setError(result.message || "Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Bienvenue sur Matheria</h1>
          <p className="mt-2 text-gray-600">
            Votre accès bêta est presque prêt. Créez l’espace élève pour commencer les révisions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Parent</label>
            <input 
              type="email" 
              name="parentEmail" 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pseudo Élève</label>
            <input 
              type="text" 
              name="studentPseudo" 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Objectif</label>
            <select 
              name="examGoal" 
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white"
            >
              <option value="">Sélectionner...</option>
              <option value="brevet">Brevet des collèges</option>
              <option value="bac-premiere">Bac de maths (Première)</option>
              <option value="terminale">Terminale (Bêta — chapitres prioritaires)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Niveau ressenti en maths</label>
            <select 
              name="currentLevel" 
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white"
            >
              <option value="">Sélectionner...</option>
              <option value="very_hard">Très en difficulté</option>
              <option value="medium">Moyen</option>
              <option value="good">Plutôt à l'aise</option>
              <option value="very_good">Très à l'aise</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Code d’accès bêta</label>
            <input 
              type="text" 
              name="accessCode" 
              required 
              placeholder="MATHERIA..."
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Création en cours..." : "Créer l’accès élève"}
          </button>
        </form>
      </div>
    </div>
  );
}
