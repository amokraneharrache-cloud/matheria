export type ExamGoal = "brevet" | "bac-premiere" | "terminale";
export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  examGoal: ExamGoal;
  levelLabel: string;
  topic: string;
  topicLabel: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};
