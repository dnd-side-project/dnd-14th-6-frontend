import {
  keepPreviousData,
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET, queryKeys, type Tokens } from "@/server";
import type { GetGameHistoriesResponseDto } from "@/types/api";

const STALE_TIME = 60 * 1000;
const GC_TIME = 5 * 60 * 1000;

export interface GetGameHistoriesQueryParams {
  userId: string;
  page: number;
  size: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  categories?: string;
  difficultyModes?: string;
  sortBy: "playedAt" | "score" | "correctProblemCount";
  sortOrder: "asc" | "desc";
}

export const gameHistoriesQueryOptions = (
  params: GetGameHistoriesQueryParams,
  tokens?: Tokens,
) =>
  queryOptions({
    queryKey: queryKeys.games.sessions(params),
    queryFn: () =>
      GET<GetGameHistoriesResponseDto>(
        "api/games/sessions",
        {
          userId: params.userId,
          page: String(params.page),
          size: String(params.size),
          ...(params.search != null && { search: params.search }),
          ...(params.startDate != null && {
            startDate: params.startDate,
          }),
          ...(params.endDate != null && { endDate: params.endDate }),
          ...(params.categories != null && {
            categories: params.categories,
          }),
          ...(params.difficultyModes != null && {
            difficultyModes: params.difficultyModes,
          }),
          sortBy: params.sortBy,
          sortOrder: params.sortOrder,
        },
        tokens,
      ),
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useGetGameHistoriesSuspenseQuery = (
  params: GetGameHistoriesQueryParams,
) => useSuspenseQuery(gameHistoriesQueryOptions(params));

export const useGetGameHistoriesQuery = (params: GetGameHistoriesQueryParams) =>
  useQuery({
    ...gameHistoriesQueryOptions(params),
    placeholderData: keepPreviousData,
  });
