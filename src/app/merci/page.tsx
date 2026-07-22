"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { activateBetaAccess } from "@/actions/beta";
import { setStorageItem } from "@/lib/storageKeys";
import { trackCompleteRegistration } from "@/lib/tracking";

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
      trackCompleteRegistration({
        exam_goal: data.examGoal,
        level: data.currentLevel,
        source_page: "/merci",
      });

      setStorageItem("studentProfile", JSON.stringify({
        ...data,
        betaAccessId: result.betaAccessId,
      }));
      router.push("/app");
    } else {
      setError(result.message || "Une erreur est survenue. Vérifiez votre code d'accès personnel ou contactez-nous.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Votre accès SprintMaths est prêt</h1>
          <p className="mt-2 text-gray-600">
            Créez maintenant l’espace élève pour commencer les révisions.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          <strong>Vous venez d&apos;acheter le Pack Révision Express.</strong> Après
          paiement, votre code d’accès personnel est envoyé automatiquement par
          email. Collez-le ici pour créer l’espace élève.
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-900">
          Vous venez de payer et vous ne voyez pas l’email ? Vérifiez vos spams
          ou contactez{" "}
          <a href="mailto:contact@sprintmaths.com" className="font-semibold underline">
            contact@sprintmaths.com
          </a>
          .
        </div>

        <p className="text-center text-sm text-gray-500">
          Vous avez déjà créé un espace ?{" "}
          <Link href="/connexion" className="text-indigo-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>

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
              <option value="terminale">Bac Terminale</option>
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
              <option value="good">Plutôt à l&apos;aise</option>
              <option value="very_good">Très à l&apos;aise</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Code d’accès</label>
            <input 
              type="text" 
              name="accessCode" 
              required 
              placeholder="MATH-XXXX"
              autoComplete="off"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 uppercase"
            />
            <p className="mt-2 text-xs text-gray-500">
              Après paiement, votre code d’accès personnel est envoyé automatiquement par email.
            </p>
            <Link href="/connexion" className="mt-2 inline-block text-xs font-medium text-indigo-600 hover:underline">
              J&apos;ai déjà créé mon espace élève
            </Link>
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
