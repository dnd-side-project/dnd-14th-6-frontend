export interface UserAnswer {
  text: string;
  isCorrect: boolean;
}

export interface Problem {
  id: string;
  description: string;
  userAnswers: UserAnswer[];
  correctAnswer: string;
  explanation: string;
}

export interface HistoryItem {
  id: string;
  date: string;
  category: string;
  difficulty: string;
  problemSummary: string;
  score: number;
  correctCount: number;
  totalCount: number;
  problems: Problem[];
}
