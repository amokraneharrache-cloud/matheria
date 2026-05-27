"use client";

import { Eye, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";

type ChapterExerciseRevealProps = {
  chapter: string;
  detail: string;
  exerciseId: string;
  sourcePage: string;
};

export function ChapterExerciseReveal({
  chapter,
  detail,
  exerciseId,
  sourcePage,
}: ChapterExerciseRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      trackEvent("free_chapter_exercise_reveal", {
        chapter,
        level: "terminale",
        source_page: sourcePage,
        cta_location: `${exerciseId}_guided_detail`,
      });
    }

    setIsRevealed((current) => !current);
  };

  return (
    <div className="mt-5 border-t border-slate-200 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-slate-600">
          Aperçu du guidage SprintMaths disponible gratuitement.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={handleReveal}
          className="w-full whitespace-normal px-4 sm:w-auto"
        >
          <Eye className="h-4 w-4" />
          {isRevealed ? "Masquer le détail guidé" : "Voir le détail guidé"}
        </Button>
      </div>

      {isRevealed ? (
        <div className="mt-4 flex gap-3 rounded-lg bg-emerald-50 p-4 text-emerald-950">
          <Sparkles className="mt-1 h-5 w-5 shrink-0 text-emerald-700" />
          <p className="leading-7">{detail}</p>
        </div>
      ) : null}
    </div>
  );
}
