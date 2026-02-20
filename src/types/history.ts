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
