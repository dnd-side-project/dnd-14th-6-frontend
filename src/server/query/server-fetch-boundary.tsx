import type { FetchQueryOptions } from "@tanstack/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "./get-query-client";

// biome-ignore lint/suspicious/noExplicitAny: 모든 queryOptions 타입을 수용하기 위해 필요
type AnyFetchQueryOptions = FetchQueryOptions<any, any, any, any, never>;

interface ServerFetchBoundaryProps {
  fetchOptions: AnyFetchQueryOptions | AnyFetchQueryOptions[];
  children: ReactNode;
}

export default async function ServerFetchBoundary({
  fetchOptions,
  children,
}: ServerFetchBoundaryProps) {
  const queryClient = getQueryClient();

  const options = Array.isArray(fetchOptions) ? fetchOptions : [fetchOptions];

  await Promise.all(options.map((option) => queryClient.prefetchQuery(option)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
