export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: QuizDifficulty;
  category: QuizCategory;
  timeLimit: number; // minutes
  questionCount: number;
  rewards: QuizRewards;
  completionRate: number;
  image: string;
}

export type QuizDifficulty = "Başlangıç" | "Orta" | "İleri";

export type QuizCategory = "Programlama" | "Algoritma" | "Web";

export interface QuizRewards {
  points: number;
  badge?: string;
  certificate?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  quizId: string;
  userId: string;
  score: number;
  completedAt: Date;
  timeSpent: number; // minutes
  correctAnswers: number;
  totalQuestions: number;
  earnedRewards: {
    points: number;
    badge?: string;
    certificate?: string;
  };
}
