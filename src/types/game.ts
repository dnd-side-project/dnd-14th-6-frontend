export type SetupStep = "category" | "difficulty";

export type PlayPhase = "tutorial" | "playing" | "end" | "badge";

export const GAME_SESSION_KEY = "gameSession";
export const GAME_RESULT_KEY = "gameResult";

export interface GameSession {
  category: string;
  level: string;
}

export interface GameResult {
  category: string;
  level: string;
  score: number;
  totalTime: number;
  playedAt: string;
}
