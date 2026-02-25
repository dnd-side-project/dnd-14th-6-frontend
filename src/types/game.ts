export type SetupStep = "category" | "difficulty";

export type PlayPhase = "tutorial" | "playing" | "end";

export const GAME_SESSION_KEY = "gameSession";

export interface GameSession {
  category: string;
  categoryId: number;
  level: string;
}

/** SSE "problem" 이벤트 페이로드 */
export interface StreamProblem {
  problemId: string;
  title: string;
  subCategory: string;
  text: string;
  /** Base64 인코딩된 정답 */
  answer: string;
  point: number;
  difficulty: string;
  /** 클라이언트 측 낙하 시작 시간 (Date.now()) */
  arrivedAt: number;
}

/** SSE "timer" 이벤트 페이로드 */
export interface StreamTimer {
  remainingSeconds: number;
}

/** SSE "end" 이벤트 페이로드 */
export interface StreamEnd {
  message: string;
}

/** 문제별 답안 추적 */
export interface ClientAnswer {
  problemId: string;
  inputs: Array<{ input: string; isCorrect: boolean }>;
  solved: boolean;
  /** 파울라인 도달 시 true */
  expired: boolean;
  /** null = 큐(화면에 안 보임), number = 활성화 시점 (Date.now()) */
  activatedAt: number | null;
  /** 배정된 레인 (0 | 1 | 2), 큐 상태이면 null */
  lane: number | null;
}

/** useGameStream 리듀서 상태 */
export interface GamePlayState {
  problems: StreamProblem[];
  currentProblemIndex: number;
  remainingSeconds: number;
  score: number;
  clientAnswers: ClientAnswer[];
  answer: string;
  isStreamOpen: boolean;
  error: string | null;
}
