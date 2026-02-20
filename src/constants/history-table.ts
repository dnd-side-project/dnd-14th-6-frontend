export type SortField = "date" | "score" | "result";
export type SortOrder = "asc" | "desc" | null;

export const VALID_SORT_FIELDS: SortField[] = ["date", "score", "result"];
export const VALID_SORT_ORDERS = ["asc", "desc"] as const;

export const SORT_FIELD_TO_API: Record<
  SortField,
  "playedAt" | "score" | "correctProblemCount"
> = {
  date: "playedAt",
  score: "score",
  result: "correctProblemCount",
};

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
