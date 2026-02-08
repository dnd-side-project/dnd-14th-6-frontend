import type { ScoreDetail } from "@/types/report";

export const MOCK_SCORE_DETAIL: ScoreDetail[] = [
  {
    difficultyMode: "Hard",
    totalScore: 32460,
    categoryScores: [
      { category: "Git", score: 17650 },
      { category: "Linux", score: 11010 },
      { category: "Docker", score: 3800 },
    ],
  },
  {
    difficultyMode: "Normal",
    totalScore: 15000,
    categoryScores: [
      { category: "Git", score: 10000 },
      { category: "Linux", score: 2500 },
      { category: "Docker", score: 2500 },
    ],
  },
  {
    difficultyMode: "Easy",
    totalScore: 7150,
    categoryScores: [
      { category: "Git", score: 7000 },
      { category: "Linux", score: 100 },
      { category: "Docker", score: 50 },
    ],
  },
];

export const MOCK_TOTAL_SCORE = 54610;
