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

export interface FrequentWrongCategory {
  category: string;
  wrongRatio: number;
  wrongCount: number;
  iconUrl: string | null;
}

export interface FrequentWrongCommand {
  category: string;
  subCategory: string;
  wrongCount: number;
}
