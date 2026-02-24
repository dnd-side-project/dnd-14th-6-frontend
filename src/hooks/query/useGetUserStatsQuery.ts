import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET, queryKeys, type Tokens } from "@/server";
import type { GetUserStatsResponseDto } from "@/types/api";
import type { ScoreDetail } from "@/types/report";

const STALE_TIME = 60 * 1000;
const GC_TIME = 5 * 60 * 1000;

interface GetUserStatsQueryParams {
  userId: string;
}

export interface UserStats {
  nickname: string;
  totalScore: number;
  percentil: number;
  ranking: number;
  tier: GetUserStatsResponseDto["tier"];
  scoreDetail: ScoreDetail[];
}

function toUserStats(dto: GetUserStatsResponseDto): UserStats {
  return {
    nickname: dto.nickname,
    totalScore: Number(dto.totalScore),
    percentil: dto.percentil,
    ranking: dto.ranking,
    tier: dto.tier,
    scoreDetail: dto.scoreDetail.map((detail) => ({
      difficultyMode: detail.difficultyMode,
      totalScore: Number(detail.totalScore),
      categoryScores: detail.categoryScores.map((cs) => ({
        category: cs.category,
        score: Number(cs.score),
      })),
    })),
  };
}

export const userStatsQueryOptions = (
  params: GetUserStatsQueryParams,
  tokens?: Tokens,
) =>
  queryOptions({
    queryKey: queryKeys.users.stats(params),
    queryFn: () =>
      GET<GetUserStatsResponseDto>(
        `api/users/${params.userId}/stats`,
        undefined,
        tokens,
      ),
    select: (response) => toUserStats(response.data),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useGetUserStatsSuspenseQuery = (params: GetUserStatsQueryParams) =>
  useSuspenseQuery(userStatsQueryOptions(params));

export const useGetUserStatsQuery = (params: GetUserStatsQueryParams) =>
  useQuery(userStatsQueryOptions(params));
