import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-bold text-2xl text-blue-900">Matheria</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Accéder à Matheria</h1>
          <p className="mt-3 text-gray-600">
            Vous avez réservé le Pack Révision Express ? Choisissez votre situation.
          </p>
        </div>

        {/* Carte 1 — déjà un espace élève */}
        <div className="bg-white rounded-2xl shadow-md border border-indigo-100 p-6 space-y-3">
          <h2 className="text-lg font-bold text-gray-900">
            J&apos;ai déjà créé un espace élève
          </h2>
          <p className="text-sm text-gray-600">
            Reconnectez-vous avec l&apos;email parent et le code d&apos;accès.
          </p>
          <Link href="/connexion" className="block w-full">
            <Button size="lg" className="w-full text-base h-12 bg-indigo-600 hover:bg-indigo-700 text-white">
              Se connecter
            </Button>
          </Link>
        </div>

        {/* Carte 2 — vient de réserver */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-3">
          <h2 className="text-lg font-bold text-gray-900">
            Je viens de réserver le Pack
          </h2>
          <p className="text-sm text-gray-600">
            Créez l&apos;espace élève pour commencer les révisions.
          </p>
          <Link href="/merci" className="block w-full">
            <Button size="lg" variant="outline" className="w-full text-base h-12 border-gray-300 text-gray-700 hover:bg-gray-50">
              Créer l&apos;espace élève
            </Button>
          </Link>
        </div>

        {/* Pas encore réservé */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center space-y-3">
          <h2 className="text-base font-medium text-gray-700">
            Vous n&apos;avez pas encore réservé ?
          </h2>
          <Link href="/#pricing" className="block w-full">
            <Button variant="outline" size="lg" className="w-full text-base h-12 border-gray-300 text-gray-700 hover:bg-gray-50">
              Voir le Pack Révision Express
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
