export interface TierDto {
  /** 티어 ID */
  id: number;
  /** 티어 이름 */
  name: string;
  /** 티어 이미지 URL */
  imageUrl: string;
}

export interface CategoryScoreDto {
  /** 카테고리 이름 */
  category: string;
  /** 해당 카테고리 점수 (BigInt 안정성을 위해 String) */
  score: string;
}

export interface ScoreDetailDto {
  /** 난이도 */
  difficultyMode: string;
  /** 해당 난이도 총 점수 (BigInt 안정성을 위해 String) */
  totalScore: string;
  /** 카테고리별 점수 목록 */
  categoryScores: CategoryScoreDto[];
}

export interface GetUserStatsResponseDto {
  /** 닉네임 */
  nickname: string;
  /** 총 점수 (BigInt 안정성을 위해 String) */
  totalScore: string;
  /** 전체 유저 평균 점수 (BigInt 안정성을 위해 String) */
  averageScore: string;
  /** 현재 랭킹 */
  ranking: number;
  /** 티어 정보 */
  tier: TierDto | null;
  /** 난이도별 점수 상세 (totalScore 기준 DESC 정렬) */
  scoreDetail: ScoreDetailDto[];
}
