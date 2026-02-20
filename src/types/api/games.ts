import type { PaginationMetadataDto } from "./common";

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
