export const STEPS = ["category", "difficulty", "tutorial", "playing", "end", "badge"] as const;
export type Step = (typeof STEPS)[number];

export const STEP_LABELS: Record<Step, string> = {
  category: "카테고리 선택",
  difficulty: "난이도 선택",
  tutorial: "튜토리얼",
  playing: "게임 진행 중",
  end: "게임 종료",
  badge: "뱃지 획득",
};
