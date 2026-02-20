import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET, queryKeys, type Tokens } from "@/server";
import type { GetUserAnalysisResponseDto } from "@/types/api";

const STALE_TIME = 60 * 1000;
const GC_TIME = 5 * 60 * 1000;

interface GetUserAnalysisQueryParams {
  userId: string;
}

export const userAnalysisQueryOptions = (
  params: GetUserAnalysisQueryParams,
  tokens?: Tokens,
) =>
  queryOptions({
    queryKey: queryKeys.users.analysis(params),
    queryFn: () =>
      GET<GetUserAnalysisResponseDto>(
        `api/users/${params.userId}/analysis`,
        undefined,
        tokens,
      ),
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useGetUserAnalysisSuspenseQuery = (
  params: GetUserAnalysisQueryParams,
) => useSuspenseQuery(userAnalysisQueryOptions(params));

export const useGetUserAnalysisQuery = (params: GetUserAnalysisQueryParams) =>
  useQuery(userAnalysisQueryOptions(params));
