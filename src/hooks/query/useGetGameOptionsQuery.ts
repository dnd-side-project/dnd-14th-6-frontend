import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { GET_PUBLIC, queryKeys } from "@/server";
import type { GetGameOptionsResponseDto } from "@/types/api";

const STALE_TIME = 30 * 60 * 1000;
const GC_TIME = 60 * 60 * 1000;

export const gameOptionsQueryOptions = () =>
  queryOptions({
    queryKey: queryKeys.games.options(),
    queryFn: () => GET_PUBLIC<GetGameOptionsResponseDto>("api/games/options"),
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useGetGameOptionsSuspenseQuery = () =>
  useSuspenseQuery(gameOptionsQueryOptions());

export const useGetGameOptionsQuery = () => useQuery(gameOptionsQueryOptions());
