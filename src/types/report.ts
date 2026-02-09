export interface SearchFilterValue {
  startDate: Date | null;
  endDate: Date | null;
  categories: string[];
  difficulties: string[];
}

export interface CategoryScore {
  category: string;
  score: number;
}

export interface ScoreDetail {
  difficultyMode: string;
  totalScore: number;
  categoryScores: CategoryScore[];
}

export interface Tier {
  id: number;
  name: string;
  imageUrl: string;
}

export type KnownCategory = "Git" | "Docker" | "Linux";

export interface FrequentWrongCategory {
  category: KnownCategory;
  wrongRatio: number;
  wrongCount: number;
}

export interface FrequentWrongCommand {
  mainCategory: string;
  subCategory: string;
  wrongCount: number;
}

export interface CumulativeScoreData {
  nickname: string;
  totalScore: number;
  averageScore: number;
  ranking: number;
  tier: Tier;
  scoreDetail: ScoreDetail[];
}
