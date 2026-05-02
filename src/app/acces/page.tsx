import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <span className="font-bold text-2xl text-blue-900">Matheria</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Accéder à Matheria</h1>
          <p className="mt-4 text-gray-600 text-lg">
            Si vous avez déjà réservé le Pack Révision Express, créez ou rouvrez l’espace élève depuis cette page.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/merci" className="block w-full">
            <Button size="lg" className="w-full text-lg h-14 bg-indigo-600 hover:bg-indigo-700 text-white">
              Créer l’espace élève
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-200 text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Vous n’avez pas encore réservé ?</h2>
          <Link href="/#pricing" className="block w-full">
            <Button variant="outline" size="lg" className="w-full text-lg h-14 border-gray-300 text-gray-700 hover:bg-gray-50">
              Voir le Pack Révision Express
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
