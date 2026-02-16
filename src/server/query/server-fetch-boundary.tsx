import type { FetchQueryOptions } from "@tanstack/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "./get-query-client";

interface ServerFetchBoundaryProps {
  fetchOptions: FetchQueryOptions | FetchQueryOptions[];
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
