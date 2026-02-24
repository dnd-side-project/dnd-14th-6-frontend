import type { PaginationMetadataDto } from "./common";

export interface RankTierDto {
  /** 티어 이름 */
  name: string;
  /** 티어 이미지 URL */
  imageUrl: string;
}

export interface RankItemDto {
  /** 랭킹 */
  ranking: number;
  /** 닉네임 */
  nickname: string;
  /** 총 점수(int size를 넘길 수 있어 string type) */
  totalScore: string;
  /** 프로필 이미지 */
  profileImage: string | null;
  /** github 링크 */
  githubUrl: string | null;
  /** 티어 정보 */
  tier: RankTierDto | null;
}

export interface GetRanksResponseDto {
  /** 랭킹 리스트 */
  ranks: RankItemDto[];
  /** 페이지네이션 메타데이터 */
  metadata: PaginationMetadataDto;
}

export interface FrequentWrongCommandDto {
  /** 카테고리 이름 */
  category: string;
  /** 서브 카테고리 이름 */
  subCategory: string;
  /** 오답 횟수 */
  wrongCount: number;
}

export interface FrequentWrongCategoryDto {
  /** 카테고리 이름 */
  category: string;
  /** 오답 비율 (%) */
  wrongRatio: number;
  /** 오답 횟수 */
  wrongCount: number;
  /** 카테고리 아이콘 이미지 URL */
  iconUrl: string | null;
}

export interface GetUserAnalysisResponseDto {
  /** 서브 카테고리 기준 자주 틀린 명령어 Top 5 */
  frequentWrongCommands: FrequentWrongCommandDto[];
  /** 많이 틀린 카테고리 */
  frequentWrongCategories: FrequentWrongCategoryDto[];
}

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
  percentil: number;
  /** 현재 랭킹 */
  ranking: number;
  /** 티어 정보 */
  tier: TierDto | null;
  /** 난이도별 점수 상세 (totalScore 기준 DESC 정렬) */
  scoreDetail: ScoreDetailDto[];
}
