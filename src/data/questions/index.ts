import { Question, ExamGoal } from "./types";
import { brevetQuestions } from "./brevet";
import { bacPremiereQuestions } from "./bacPremiere";
import { terminaleQuestions } from "./terminale";

export * from "./types";

export const allQuestions: Question[] = [
  ...brevetQuestions,
  ...bacPremiereQuestions,
  ...terminaleQuestions,
];

// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------

export function getQuestionsByExamGoal(goal: ExamGoal): Question[] {
  return allQuestions.filter((q) => q.examGoal === goal);
}

export function getQuestionsByTopic(goal: ExamGoal, topic: string): Question[] {
  return allQuestions.filter((q) => q.examGoal === goal && q.topic === topic);
}

export function getAvailableTopics(goal: ExamGoal): { topic: string; label: string; count: number }[] {
  const filtered = getQuestionsByExamGoal(goal);
  
  const topicMap = new Map<string, { label: string; count: number }>();
  
  filtered.forEach((q) => {
    if (!topicMap.has(q.topic)) {
      topicMap.set(q.topic, { label: q.topicLabel, count: 0 });
    }
    topicMap.get(q.topic)!.count++;
  });

  return Array.from(topicMap.entries()).map(([topic, data]) => ({
    topic,
    label: data.label,
    count: data.count
  }));
}

export function pickRandomQuestions(sourceList: Question[], count: number): Question[] {
  const shuffled = [...sourceList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
