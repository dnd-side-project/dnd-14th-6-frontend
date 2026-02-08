import type { HistoryItem } from "@/types/history";

export type SortField = "date" | "score" | "result";
export type SortOrder = "asc" | "desc" | null;

export interface ColumnConfig {
  key: string;
  label: string;
  width: string;
  sortable: boolean;
  sortField?: SortField;
  sortIconLeft?: string;
  flexible?: boolean;
}

export const HISTORY_COLUMNS: ColumnConfig[] = [
  {
    key: "date",
    label: "기간",
    width: "15.8rem",
    sortable: true,
    sortField: "date",
    sortIconLeft: "10.9rem",
  },
  { key: "category", label: "카테고리", width: "13.1rem", sortable: false },
  { key: "difficulty", label: "난이도", width: "13.5rem", sortable: false },
  {
    key: "problem",
    label: "문제",
    width: "55.5rem",
    sortable: false,
    flexible: true,
  },
  {
    key: "score",
    label: "스코어",
    width: "12.3rem",
    sortable: true,
    sortField: "score",
    sortIconLeft: "7rem",
  },
  {
    key: "result",
    label: "결과",
    width: "9.9rem",
    sortable: true,
    sortField: "result",
    sortIconLeft: "5.5rem",
  },
];

export const MOCK_HISTORY_ITEMS: HistoryItem[] = Array.from(
  { length: 15 },
  (_, i) => ({
    id: `item-${i + 1}`,
    date: "2025.02.16",
    category: "Git",
    difficulty: "Normal",
    problemSummary: "기능 개발을 위한 브랜치 생성 및 이동 외 19건",
    score: 200,
    correctCount: i === 14 ? 18 : 20,
    totalCount: 20,
    problems: [
      {
        id: `problem-${i + 1}-1`,
        description:
          "현재 `main` 브랜치에서 `feature/login` 브랜치를 생성하고 이동하세요.",
        userAnswers: [
          { text: "git checkout -b feature/login", isCorrect: true },
        ],
        correctAnswer: "git checkout -b feature/login",
        explanation:
          "`git checkout -b`는 새 브랜치를 생성하고 동시에 이동하는 명령어입니다.",
      },
      {
        id: `problem-${i + 1}-2`,
        description: "변경된 파일을 모두 스테이징하세요.",
        userAnswers: [{ text: "git add .", isCorrect: true }],
        correctAnswer: "git add .",
        explanation:
          "`git add .`은 현재 디렉토리의 모든 변경 사항을 스테이징합니다.",
      },
    ],
  }),
);
