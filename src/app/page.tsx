import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BrainCircuit, Target, TrendingUp, ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-bold text-xl text-blue-900">Matheria</span>
          </div>
          <Link href="/diagnostic">
            <Button size="sm" className="hidden sm:flex">
              Faire le diagnostic gratuit
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-900 mb-6">
              Brevet, bac de maths de Première et Bac Terminale.
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Prépare le brevet ou le bac de maths avec un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-violet-600">coach IA personnalisé</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Plan de révision, exercices ciblés et progression par chapitre. À quelques semaines de l'examen, Matheria aide votre enfant à savoir quoi réviser, à s'entraîner en sessions courtes et à progresser sans conflit à la maison.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/diagnostic" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">
                  Faire le diagnostic gratuit
                </Button>
              </Link>
              {process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ? (
                <a href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Réserver le Pack — 39 €
                  </Button>
                </a>
              ) : (
                <Link href="#pricing" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Réserver le Pack — 39 €
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-4 py-20 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi les maths bloquent votre enfant ?</h2>
              <p className="text-slate-600 text-lg">Les méthodes classiques ne sont pas toujours adaptées à leur rythme.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              <Card className="bg-slate-50 border-none shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Lacunes invisibles</h3>
                  <p className="text-slate-600">Difficile de savoir exactement ce qui bloque sans une analyse précise des erreurs passées.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Manque de méthode</h3>
                  <p className="text-slate-600">Comprendre le cours c'est bien, savoir l'appliquer face à un exercice d'examen c'est mieux.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Perte de motivation</h3>
                  <p className="text-slate-600">Des révisions trop longues et non ciblées finissent par décourager l'élève.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 py-20 bg-blue-900 text-white rounded-3xl mx-2 sm:mx-8 my-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-12">La méthode Matheria en 3 étapes</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Diagnostic rapide</h3>
                <p className="text-blue-200">L’élève indique son objectif, son niveau ressenti et ses principales difficultés pour démarrer sur les bonnes priorités.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Sessions courtes</h3>
                <p className="text-blue-200">Des sessions courtes de 10 minutes pour garder le rythme sans décourager l’élève.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Progression visible</h3>
                <p className="text-blue-200">L'élève voit son niveau monter jusqu'au jour de l'examen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="px-4 py-20 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Conçu pour l'attention des élèves</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-lg">Format mobile-first adapté à leurs usages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-lg">Corrections expliquées pas-à-pas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-lg">Zéro distraction, focus total sur la réussite</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full max-w-xs mx-auto">
                <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                  <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white flex flex-col pt-8 px-4">
                    <div className="w-full bg-blue-50 rounded-xl p-4 mb-4">
                      <div className="font-bold text-blue-900 mb-1">Session du jour</div>
                      <div className="text-sm text-blue-700">Fractions & Équations</div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-full h-24 bg-slate-100 rounded-xl flex items-center justify-center">
                        <span className="text-slate-400 font-medium">Question 1/5</span>
                      </div>
                      <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
                      <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
                      <div className="w-full h-12 bg-blue-600 rounded-xl mt-4 flex items-center justify-center">
                        <span className="text-white font-bold">Valider</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-4 py-20 bg-slate-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Un investissement simple et transparent</h2>
            <p className="text-lg text-slate-600 mb-12">Le prix d'une seule heure de cours particulier, pour un accompagnement jusqu'au jour J.</p>
            
            <Card className="max-w-md mx-auto border-2 border-blue-900 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                OFFRE DE LANCEMENT
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pack Révision Express</h3>
                <div className="flex items-baseline justify-center gap-2 mb-6">
                  <span className="text-5xl font-extrabold text-slate-900">39€</span>
                </div>
                <p className="text-slate-600 mb-6 font-medium">Paiement unique. Accès complet jusqu’à l’examen. Pas d’abonnement caché.</p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Bilan de départ personnalisé</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Sessions de révision incluses jusqu'à l'examen</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Corrections détaillées et expliquées</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Accessible sur téléphone, tablette et PC</span>
                  </li>
                </ul>
                {process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ? (
                  <div className="space-y-2 w-full">
                    <a href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Button size="lg" className="w-full text-lg h-14">
                        Réserver le Pack — 39 €
                      </Button>
                    </a>
                    <p className="text-xs text-center text-slate-500 font-medium">
                      Paiement sécurisé par Stripe. Paiement unique, sans abonnement.
                    </p>
                  </div>
                ) : (
                  <Link href="/diagnostic" className="w-full block">
                    <Button size="lg" className="w-full text-lg h-14">
                      Commencer avec le diagnostic
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Questions fréquentes</h2>
            <div className="space-y-6">
              {[
                { q: "Mon enfant est très en difficulté, est-ce adapté ?", a: "Oui, notre diagnostic initial permet de repérer précisément les bases manquantes pour proposer des exercices adaptés, sans le décourager." },
                { q: "Dois-je payer un abonnement tous les mois ?", a: "Non. Le Pack Révision Express à 39€ est un paiement unique qui donne un accès complet jusqu'à la date de l'examen." },
                { q: "Sur quels supports ça fonctionne ?", a: "Matheria est une application web accessible directement depuis le navigateur de n'importe quel smartphone, tablette ou ordinateur." }
              ].map((faq, i) => (
                <Card key={i} className="border border-slate-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex justify-between items-center">
                      {faq.q}
                    </h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 bg-blue-900 text-white text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Prêt à aider votre enfant à progresser avant l’examen ?</h2>
            <p className="text-xl text-blue-200 mb-10">Commencez dès aujourd'hui par une évaluation gratuite de son niveau.</p>
            <Link href="/diagnostic">
              <Button size="lg" variant="secondary" className="text-lg px-10 h-14">
                Faire le diagnostic gratuit
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-slate-700 rounded text-xs flex items-center justify-center text-white font-bold">M</div>
            <span className="font-bold text-white">Matheria</span>
          </div>
          <p className="mb-4">© {new Date().getFullYear()} Matheria. Tous droits réservés.</p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white transition-colors">CGV</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
