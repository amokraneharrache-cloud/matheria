"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Check, ArrowRight, Loader2 } from "lucide-react";
import { saveLead } from "../actions";

const EXAMS = [
  { id: "brevet", label: "Brevet" },
  { id: "bac-premiere", label: "Bac de maths en Première" },
  { id: "terminale", label: "Terminale (Bêta — chapitres prioritaires)" },
];

const LEVELS = [
  { id: "difficulte", label: "Très en difficulté" },
  { id: "moyen", label: "Moyen" },
  { id: "aise", label: "Plutôt à l'aise" },
  { id: "tres_aise", label: "Très à l'aise" },
];

const DIFFICULTIES = [
  { id: "calcul", label: "Calcul" },
  { id: "fractions", label: "Fractions" },
  { id: "equations", label: "Équations" },
  { id: "fonctions", label: "Fonctions" },
  { id: "geometrie", label: "Géométrie" },
  { id: "probas", label: "Probabilités / statistiques" },
  { id: "methode", label: "Manque de méthode" },
  { id: "confiance", label: "Manque de confiance" },
  { id: "nsp", label: "Je ne sais pas" },
];

export default function DiagnosticPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [exam, setExam] = useState("");
  const [level, setLevel] = useState("");
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const toggleDifficulty = (id: string) => {
    if (id === "nsp") {
      setDifficulties(["nsp"]);
      return;
    }
    setDifficulties((prev) => {
      const filtered = prev.filter((d) => d !== "nsp");
      if (filtered.includes(id)) {
        return filtered.filter((d) => d !== id);
      }
      return [...filtered, id];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("L'email est requis pour recevoir les résultats.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    const data = {
      exam_goal: exam,
      current_level: level,
      difficulties: difficulties,
      parent_email: email,
      student_pseudo: pseudo,
      source: "diagnostic_funnel",
    };

    try {
      const result = await saveLead(data);
      if (!result.success) {
        console.error("Erreur:", result.error);
        // We proceed anyway to not block the user if DB fails
      }
      
      const query = new URLSearchParams({
        exam,
        diff: difficulties.join(","),
        level,
        pseudo
      });
      router.push(`/diagnostic/resultat?${query.toString()}`);
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b px-4 py-4 sticky top-0 z-10 flex items-center">
        {step > 1 && (
          <button onClick={handlePrev} className="mr-4 text-slate-500 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-full hover:bg-slate-100">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex-1 flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-900 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <span className="font-bold text-slate-900">Matheria</span>
        </div>
        <div className="text-sm font-medium text-slate-500">
          Étape {step}/4
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-lg p-4 py-8 flex flex-col">
        {/* Progress bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {step === 1 && (
          <div className="flex-1 animate-in slide-in-from-right-4 fade-in duration-300">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Votre enfant prépare quel examen ?</h1>
            <div className="space-y-4">
              {EXAMS.map((item) => (
                <Card 
                  key={item.id}
                  className={`cursor-pointer transition-all hover:border-blue-300 ${exam === item.id ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' : 'border-slate-200'}`}
                  onClick={() => { setExam(item.id); setTimeout(handleNext, 300); }}
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <span className="text-lg font-medium text-slate-900">{item.label}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${exam === item.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                      {exam === item.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 animate-in slide-in-from-right-4 fade-in duration-300">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Quel est son niveau actuel en maths ?</h1>
            <div className="space-y-3">
              {LEVELS.map((item) => (
                <Card 
                  key={item.id}
                  className={`cursor-pointer transition-all hover:border-blue-300 ${level === item.id ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' : 'border-slate-200'}`}
                  onClick={() => { setLevel(item.id); setTimeout(handleNext, 300); }}
                >
                  <CardContent className="p-5 flex items-center justify-between">
                    <span className="text-lg font-medium text-slate-900">{item.label}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${level === item.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                      {level === item.id && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 animate-in slide-in-from-right-4 fade-in duration-300">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Quelles sont ses plus grandes difficultés ?</h1>
            <p className="text-slate-500 mb-6">Plusieurs choix possibles.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {DIFFICULTIES.map((item) => {
                const isSelected = difficulties.includes(item.id);
                return (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all hover:border-blue-300 ${isSelected ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600' : 'border-slate-200'}`}
                    onClick={() => toggleDifficulty(item.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <span className="font-medium text-slate-900">{item.label}</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="sticky bottom-4">
              <Button 
                size="lg" 
                className="w-full text-lg h-14 shadow-lg" 
                onClick={handleNext}
                disabled={difficulties.length === 0}
              >
                Continuer <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex-1 animate-in slide-in-from-right-4 fade-in duration-300">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Dernière étape !</h1>
            <p className="text-slate-500 mb-8">Où devons-nous envoyer le bilan de départ de {pseudo || "votre enfant"} ?</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="pseudo" className="text-sm font-semibold text-slate-700">
                  Prénom ou pseudo de l'élève (Optionnel)
                </label>
                <input
                  id="pseudo"
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Ex: Léo"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email du parent <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="votre@email.com"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg h-14 mt-4"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  "Voir le résultat du diagnostic"
                )}
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
