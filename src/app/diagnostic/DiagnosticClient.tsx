"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Mail,
  RotateCcw,
  Target,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { MARKETING_CONSENT_LABEL } from "@/lib/email/consentText";
import {
  DIAGNOSTIC_DOMAINS,
  DIAGNOSTIC_QUESTIONS,
  getDiagnosticDomain,
  scoreDiagnostic,
  type DiagnosticAnswers,
  type DiagnosticScore,
} from "@/lib/diagnostic";
import {
  trackDiagnosticCompleted,
  trackDiagnosticEmailRequest,
  trackDiagnosticResourceClick,
  trackDiagnosticResultView,
  trackDiagnosticStarted,
  trackEvent,
} from "@/lib/tracking";
import { getStoredUtmEventParams } from "@/lib/utm";

type Phase = "intro" | "test" | "result";
type EmailStatus = "idle" | "loading" | "success" | "error";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function statusClass(status: "solid" | "consolidate" | "priority") {
  if (status === "solid") return "border-emerald-200 bg-emerald-50 text-emerald-900";
  if (status === "consolidate") return "border-amber-200 bg-amber-50 text-amber-950";
  return "border-rose-200 bg-rose-50 text-rose-950";
}

export function DiagnosticClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [result, setResult] = useState<DiagnosticScore | null>(null);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailMessage, setEmailMessage] = useState("");
  const emailSubmittingRef = useRef(false);

  const question = DIAGNOSTIC_QUESTIONS[questionIndex];
  const selectedAnswer = question ? answers[question.id] : undefined;

  function startDiagnostic() {
    setPhase("test");
    setQuestionIndex(0);
    trackDiagnosticStarted({
      exam_goal: "terminale",
      source_page: "/diagnostic",
      cta_location: "diagnostic_intro",
    });
    scrollToTop();
  }

  function selectAnswer(optionIndex: number) {
    setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
  }

  function previousQuestion() {
    setQuestionIndex((current) => Math.max(0, current - 1));
    scrollToTop();
  }

  function nextQuestion() {
    if (selectedAnswer === undefined) return;

    if (questionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setQuestionIndex((current) => current + 1);
      scrollToTop();
      return;
    }

    const nextResult = scoreDiagnostic(answers);
    setResult(nextResult);
    setPhase("result");
    const trackingParams = {
      exam_goal: "terminale",
      level: nextResult.level,
      source_page: "/diagnostic",
    };
    trackDiagnosticCompleted(trackingParams);
    trackDiagnosticResultView(trackingParams);
    scrollToTop();
  }

  function restartDiagnostic() {
    setAnswers({});
    setResult(null);
    setQuestionIndex(0);
    setPhase("intro");
    setEmailStatus("idle");
    setEmailMessage("");
    scrollToTop();
  }

  async function requestEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || emailSubmittingRef.current) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailStatus("error");
      setEmailMessage("Entre une adresse email valide.");
      return;
    }

    emailSubmittingRef.current = true;
    setEmailStatus("loading");
    setEmailMessage("");
    trackDiagnosticEmailRequest({
      exam_goal: "terminale",
      level: result.level,
      source_page: "/diagnostic",
      marketing_consent: marketingConsent ? "true" : "false",
    });

    try {
      const response = await fetch("/api/leads/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          website,
          score: result.correct,
          weakDomains: result.priorityDomains.map((domain) => domain.id),
          marketingConsent,
          utmSource: getStoredUtmEventParams().utm_source,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { success?: boolean; emailSent?: boolean; message?: string }
        | null;

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.message || "Impossible d’envoyer le bilan.");
      }

      trackEvent("email_optin", {
        exam_goal: "terminale",
        level: result.level,
        source_page: "/diagnostic",
        marketing_consent: marketingConsent ? "true" : "false",
        cta_location: "diagnostic_result_email",
      });
      setEmailStatus("success");
      setEmailMessage(
        payload.emailSent
          ? "Ton bilan et ton planning sont envoyés. Vérifie aussi le dossier spam."
          : "Ta demande est enregistrée. Le planning reste accessible ci-dessous.",
      );
      setEmail("");
      setWebsite("");
      setMarketingConsent(false);
    } catch (error) {
      setEmailStatus("error");
      setEmailMessage(
        error instanceof Error ? error.message : "Impossible d’envoyer le bilan.",
      );
    } finally {
      emailSubmittingRef.current = false;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" aria-label="Accueil SprintMaths">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-950 text-lg font-black text-white">
              S
            </span>
            <span className="text-lg font-bold">SprintMaths</span>
          </Link>
          {phase === "test" ? (
            <span className="text-sm font-semibold text-slate-600">
              Question {questionIndex + 1}/{DIAGNOSTIC_QUESTIONS.length}
            </span>
          ) : (
            <span className="text-sm font-medium text-slate-500">Mini-test gratuit</span>
          )}
        </div>
      </header>

      {phase === "intro" ? (
        <main>
          <section className="px-4 py-14 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-950">
                10 questions · résultat immédiat · sans email
              </span>
              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
                Teste tes prérequis pour la Terminale spécialité maths
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Repère rapidement les points à consolider avec 10 vraies questions de
                maths. À la fin, tu vois ton score, tes résultats par domaine et toutes
                les corrections.
              </p>
              <Button onClick={startDiagnostic} size="lg" className="mt-8 h-14 px-8 text-lg">
                Commencer le mini-test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-4 text-sm text-slate-500">
                Aucun compte, aucun paiement et aucun email requis.
              </p>
            </div>
          </section>

          <section className="border-y bg-white px-4 py-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-center text-2xl font-bold">Ce que le test vérifie</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {DIAGNOSTIC_DOMAINS.map((domain) => (
                  <div key={domain.id} className="rounded-2xl border bg-slate-50 p-4 text-center font-semibold">
                    {domain.label}
                  </div>
                ))}
              </div>
              <p className="mx-auto mt-7 max-w-3xl text-center leading-7 text-slate-600">
                Ce mini-test porte surtout sur des acquis de Première utiles dès le début
                de la Terminale. Il donne un point de départ prudent : ce n’est ni une note
                scolaire, ni une prédiction du Bac.
              </p>
            </div>
          </section>

          <section className="px-4 py-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold">Comment ça marche ?</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ["1", "Réponds", "Une seule réponse par question, avec retour en arrière possible."],
                  ["2", "Lis ton bilan", "Score global et 5 sous-scores affichés immédiatement."],
                  ["3", "Corrige-toi", "Ta réponse, la bonne réponse et une explication courte."],
                ].map(([number, title, text]) => (
                  <div key={number} className="rounded-2xl border bg-white p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-950 font-bold text-white">
                      {number}
                    </span>
                    <h3 className="mt-4 font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t bg-white px-4 py-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold">Questions fréquentes</h2>
              <div className="mt-6 space-y-3">
                {[
                  [
                    "À qui s’adresse ce test ?",
                    "Aux élèves qui entrent en Terminale ou commencent la Terminale spécialité maths et veulent vérifier quelques prérequis importants de Première.",
                  ],
                  [
                    "Faut-il donner son email pour voir le résultat ?",
                    "Non. Le score, les sous-scores et les corrections s’affichent immédiatement. L’envoi du bilan par email est proposé ensuite et reste facultatif.",
                  ],
                  [
                    "Le score prédit-il ma note au Bac ?",
                    "Non. Dix questions donnent seulement un premier repère. Elles ne remplacent ni un devoir complet, ni l’évaluation d’un professeur, ni le travail sur des annales.",
                  ],
                ].map(([question, answer]) => (
                  <details key={question} className="rounded-2xl border bg-slate-50 p-5">
                    <summary className="cursor-pointer font-bold">{question}</summary>
                    <p className="mt-3 leading-7 text-slate-600">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : null}

      {phase === "test" && question ? (
        <main className="px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-700 transition-all"
                style={{
                  width:
                    ((questionIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100 + "%",
                }}
              />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-wide text-blue-800">
              {question.domainLabel}
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-9 sm:text-3xl">
              {question.prompt}
            </h1>
            <div className="mt-7 space-y-3" role="radiogroup" aria-label="Réponses possibles">
              {question.options.map((option, optionIndex) => {
                const selected = selectedAnswer === optionIndex;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectAnswer(optionIndex)}
                    className={
                      "flex min-h-16 w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-100 " +
                      (selected
                        ? "border-blue-700 bg-blue-50 text-blue-950"
                        : "border-slate-200 hover:border-blue-300")
                    }
                  >
                    <span
                      className={
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 " +
                        (selected
                          ? "border-blue-700 bg-blue-700 text-white"
                          : "border-slate-300")
                      }
                    >
                      {selected ? <Check className="h-4 w-4" /> : null}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={previousQuestion}
                disabled={questionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
              <Button type="button" onClick={nextQuestion} disabled={selectedAnswer === undefined}>
                {questionIndex === DIAGNOSTIC_QUESTIONS.length - 1
                  ? "Voir mon résultat"
                  : "Question suivante"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      ) : null}

      {phase === "result" && result ? (
        <main className="px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <section className="rounded-3xl bg-blue-950 p-7 text-white shadow-xl sm:p-10">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-blue-200">Résultat immédiat</p>
                  <h1 className="mt-2 text-3xl font-black sm:text-4xl">{result.headline}</h1>
                  <p className="mt-4 max-w-2xl leading-7 text-blue-100">{result.summary}</p>
                </div>
                <div className="shrink-0 rounded-2xl bg-white px-8 py-6 text-center text-blue-950">
                  <div className="text-5xl font-black">
                    {result.correct}<span className="text-2xl text-slate-500">/{result.total}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-600">score global</p>
                </div>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold">Tes résultats par domaine</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.domains.map((domain) => (
                  <div
                    key={domain.id}
                    className={"rounded-2xl border p-5 " + statusClass(domain.status)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold">{domain.label}</h3>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-black">
                        {domain.correct}/{domain.total}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold">{domain.statusLabel}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-3xl border bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-blue-800" />
                <h2 className="text-2xl font-bold">Par quoi commencer</h2>
              </div>
              {result.priorityDomains.length ? (
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {result.priorityDomains.map((score) => {
                    const domain = getDiagnosticDomain(score.id);
                    return (
                      <div key={score.id} className="rounded-2xl bg-slate-50 p-5">
                        <h3 className="font-bold">{score.label}</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {score.correct}/{score.total} sur ce mini-test
                        </p>
                        <div className="mt-4 space-y-2">
                          {domain?.resources.slice(0, 2).map((resource) => (
                            <Link
                              key={resource.href}
                              href={resource.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackDiagnosticResourceClick({
                                  exam_goal: "terminale",
                                  level: result.level,
                                  source_page: "/diagnostic",
                                  chapter: score.id,
                                  destination_page: resource.href,
                                })
                              }
                              className="flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 text-sm font-semibold text-blue-950 hover:border-blue-300"
                            >
                              {resource.label}
                              <ArrowRight className="h-4 w-4 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-emerald-50 p-5 text-emerald-950">
                  <p className="font-semibold">
                    Aucun domaine faible ne ressort de ces 10 questions. Passe à des exercices
                    plus longs et à des annales pour tester ton raisonnement complet.
                  </p>
                </div>
              )}
            </section>

            <section className="mt-10">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="h-6 w-6 text-blue-800" />
                <h2 className="text-2xl font-bold">Correction des 10 questions</h2>
              </div>
              <div className="mt-5 space-y-3">
                {DIAGNOSTIC_QUESTIONS.map((item, index) => {
                  const answerIndex = answers[item.id];
                  const isCorrect = answerIndex === item.correctIndex;
                  return (
                    <details key={item.id} className="group rounded-2xl border bg-white p-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold">
                        <span>
                          <span className="mr-2 text-slate-500">{index + 1}.</span>
                          {item.prompt}
                        </span>
                        <span
                          className={
                            "shrink-0 text-sm " +
                            (isCorrect ? "text-emerald-700" : "text-rose-700")
                          }
                        >
                          {isCorrect ? "Correct" : "À revoir"}
                        </span>
                      </summary>
                      <div className="mt-5 space-y-3 border-t pt-5 text-sm leading-6">
                        <p>
                          <strong>Ta réponse :</strong>{" "}
                          {answerIndex === undefined ? "Aucune" : item.options[answerIndex]}
                        </p>
                        <p className="text-emerald-800">
                          <strong>Bonne réponse :</strong> {item.options[item.correctIndex]}
                        </p>
                        <p className="rounded-xl bg-slate-50 p-4 text-slate-700">
                          {item.explanation}
                        </p>
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-blue-800" />
                  <h2 className="text-2xl font-bold">Recevoir mon bilan + mon planning</h2>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  Facultatif : ton résultat est déjà complet ci-dessus. Demande une copie
                  par email et le planning gratuit si tu veux les retrouver plus tard.
                </p>
                {emailStatus === "success" ? (
                  <div
                    className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950"
                    role="status"
                  >
                    <CheckCircle2 className="h-6 w-6" />
                    <p className="mt-3 font-semibold">{emailMessage}</p>
                    <Link
                      href="/planning-revision-bac-maths"
                      className="mt-4 inline-block font-bold underline"
                    >
                      Ouvrir le planning maintenant
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={requestEmail} className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor="diagnostic-email"
                        className="text-sm font-bold text-slate-700"
                      >
                        Ton email ou celui d’un parent
                      </label>
                      <input
                        id="diagnostic-email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="email@exemple.fr"
                        className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none focus:border-blue-800 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="diagnostic-website">Site web</label>
                      <input
                        id="diagnostic-website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                      />
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                      <input
                        id="diagnostic-marketing-consent"
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(event) => setMarketingConsent(event.target.checked)}
                        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-400 text-blue-900"
                      />
                      <label
                        htmlFor="diagnostic-marketing-consent"
                        className="text-sm leading-6 text-slate-700"
                      >
                        {MARKETING_CONSENT_LABEL}
                      </label>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">
                      Le bilan est envoyé que tu coches ou non la case. La case marketing
                      est facultative et jamais précochée.{" "}
                      <Link
                        href="/politique-confidentialite"
                        className="font-semibold underline"
                      >
                        Politique de confidentialité
                      </Link>
                      .
                    </p>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={emailStatus === "loading"}
                    >
                      {emailStatus === "loading"
                        ? "Envoi en cours…"
                        : "Recevoir mon bilan + planning"}
                    </Button>
                    {emailStatus === "error" && emailMessage ? (
                      <p
                        className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-900"
                        role="alert"
                      >
                        {emailMessage}
                      </p>
                    ) : null}
                  </form>
                )}
              </div>

              <ProfileNextStep result={result} />
            </section>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={restartDiagnostic}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 underline underline-offset-4"
              >
                <RotateCcw className="h-4 w-4" />
                Refaire le mini-test
              </button>
            </div>
          </div>
        </main>
      ) : null}
    </div>
  );
}

function ProfileNextStep({ result }: { result: DiagnosticScore }) {
  if (result.level === "solid") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-emerald-950">Passe aux annales</h2>
        <p className="mt-3 leading-7 text-emerald-900">
          Ton niveau paraît solide sur ce mini-test. Travaille surtout avec des annales
          et analyse les erreurs qui reviennent.
        </p>
        <Link
          href="/annales-bac-maths-terminale"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackDiagnosticResourceClick({
              source_page: "/diagnostic",
              level: result.level,
              destination_page: "/annales-bac-maths-terminale",
            })
          }
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-emerald-900 px-5 font-bold text-white"
        >
          Voir les annales corrigées
        </Link>
      </div>
    );
  }

  if (result.level === "fragile") {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-amber-950">Priorité aux bases gratuites</h2>
        <p className="mt-3 leading-7 text-amber-900">
          Commence par les ressources recommandées et un planning réaliste. Inutile de
          tout reprendre en même temps : deux priorités suffisent pour démarrer.
        </p>
        <Link
          href="/planning-revision-bac-maths"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackDiagnosticResourceClick({
              source_page: "/diagnostic",
              level: result.level,
              destination_page: "/planning-revision-bac-maths",
            })
          }
          className="mt-6 inline-flex min-h-12 items-center rounded-full bg-amber-900 px-5 font-bold text-white"
        >
          Construire mon planning gratuit
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-blue-950">Besoin d’un cadre régulier ?</h2>
      <p className="mt-3 leading-7 text-blue-900">
        Le Pack Révision Express peut t’aider à structurer les notions à consolider avec
        des sessions courtes et des exercices guidés. Il reste facultatif.
      </p>
      <Link
        href="/bac-maths-2027#offre"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("click_bac2027_offer", {
            source_page: "/diagnostic",
            level: result.level,
            destination_page: "/bac-maths-2027#offre",
            cta_location: "diagnostic_result_intermediate",
          })
        }
        className="mt-6 inline-flex min-h-12 items-center rounded-full bg-blue-950 px-5 font-bold text-white"
      >
        Voir le Pack Révision Express
      </Link>
    </div>
  );
}
