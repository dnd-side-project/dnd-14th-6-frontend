import {
  keepPreviousData,
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET, queryKeys, type Tokens } from "@/server";
import type { GetRanksResponseDto } from "@/types/api";

const STALE_TIME = 60 * 1000;
const GC_TIME = 5 * 60 * 1000;

interface GetRanksParams {
  page: number;
  size: number;
  scope?: "all" | "tier";
}

export const ranksQueryOptions = (params: GetRanksParams, tokens?: Tokens) =>
  queryOptions({
    queryKey: queryKeys.users.ranks(params),
    queryFn: () =>
      GET<GetRanksResponseDto>(
        "api/users/ranks",
        {
          page: String(params.page),
          size: String(params.size),
          ...(params.scope && { scope: params.scope }),
        },
        tokens,
      ),
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useGetRanksSuspenseQuery = (params: GetRanksParams) =>
  useSuspenseQuery(ranksQueryOptions(params));

export const useGetRanksQuery = (params: GetRanksParams) =>
  useQuery({
    ...ranksQueryOptions(params),
    placeholderData: keepPreviousData,
  });
