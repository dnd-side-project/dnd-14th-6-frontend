import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET, getClientSideTokens, queryKeys, type Tokens } from "@/server";
import type { GetGameResultReportResponseDto } from "@/types/api";

const STALE_TIME = Number.POSITIVE_INFINITY;
const GC_TIME = 5 * 60 * 1000;

interface GetGameResultReportQueryParams {
  gameSessionId: string;
}

export const gameResultReportQueryOptions = (
  params: GetGameResultReportQueryParams,
  tokens?: Tokens,
) => {
  const accessToken = tokens?.accessToken ?? getClientSideTokens().accessToken;
  const authenticated = !!accessToken;

  return queryOptions({
    queryKey: queryKeys.games.reports({ ...params, authenticated }),
    queryFn: () =>
      GET<GetGameResultReportResponseDto>(
        `api/games/${params.gameSessionId}/reports`,
        undefined,
        tokens,
      ),
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
};

export const useGetGameResultReportSuspenseQuery = (
  params: GetGameResultReportQueryParams,
) => useSuspenseQuery(gameResultReportQueryOptions(params));

export const useGetGameResultReportQuery = (
  params: GetGameResultReportQueryParams,
) => useQuery(gameResultReportQueryOptions(params));
