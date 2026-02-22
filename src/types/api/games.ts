import type { PaginationMetadataDto } from "./common";

export interface CategoryDto {
  /** 카테고리 ID */
  id: number;
  /** 카테고리 이름 */
  name: string;
  /** 카테고리 icon Url */
  iconUrl: string;
}

export interface GetGameOptionsResponseDto {
  /** 게임 카테고리 목록 */
  categories: CategoryDto[];
  /** 게임난이도 목록 */
  difficultyModes: ("Easy" | "Normal" | "Hard" | "Random")[];
}

export interface SummaryDto {
  /** 게임 세션 ID */
  sessionId: string;
  /** 유저 ID (비회원은 null) */
  userId: string | null;
  /** 총 획득 점수 */
  score: number | null;
  /** 문제 개수 */
  totalProblemCount: number | null;
  /** 맞춘 문제 개수 */
  correctProblemCount: number | null;
  /** 정답률(%) */
  correctRate: number | null;
}

export interface InputDto {
  /** 사용자 입력 값 */
  input: string;
  /** 정답 여부 */
  isCorrect: boolean;
}

export interface ReportDto {
  /** 문제 ID */
  problemId: string;
  /** 하위 카테고리 */
  subCategory: string;
  /** 문제 지문 */
  text: string | null;
  /** 문제 해설 */
  explanation: string | null;
  /** 사용자 입력 정답 이력 */
  inputs: InputDto[];
  /** 정답 */
  answer: string | null;
  /** 해결 여부 */
  isSolved: boolean | null;
  /** 시도 횟수 */
  tryCount: number | null;
}

export interface GetGameResultReportResponseDto {
  /** 비회원 여부 */
  isGuest: boolean;
  /** 게임 결과 요약 */
  summary: SummaryDto;
  /** 문제별 결과 리포트 */
  reports: ReportDto[];
}

export interface SessionHistoryDto {
  /** 세션 ID */
  id: string;
  /** 화면 표시용 제목 */
  title: string;
  /** 카테고리 */
  category: string;
  /** 난이도 */
  difficultyMode: string;
  /** 획득 점수 */
  score: number;
  /** 총 문제 수 */
  totalProblemCount: number;
  /** 정답 수 */
  correctProblemCount: number;
  /** 플레이 일시 */
  playedAt: string;
}

export interface GetGameHistoriesResponseDto {
  /** 세션 히스토리 목록 */
  sessions: SessionHistoryDto[];
  /** 페이지네이션 메타데이터 */
  metadata: PaginationMetadataDto;
}
