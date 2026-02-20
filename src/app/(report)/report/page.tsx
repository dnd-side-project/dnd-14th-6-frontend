import {
  SORT_FIELD_TO_API,
  type SortField,
  VALID_SORT_FIELDS,
  VALID_SORT_ORDERS,
} from "@/constants/history-table";
import { gameHistoriesQueryOptions } from "@/hooks/query/useGetGameHistoriesQuery";
import { userAnalysisQueryOptions } from "@/hooks/query/useGetUserAnalysisQuery";
import { userStatsQueryOptions } from "@/hooks/query/useGetUserStatsQuery";
import { requireAuth } from "@/server/auth/require-auth";
import ServerFetchBoundary from "@/server/query/server-fetch-boundary";
import ReportContent from "./report-content";

interface ReportPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ReportPage({ searchParams }: ReportPageProps) {
  const { userId, tokens } = await requireAuth();
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const sortField = VALID_SORT_FIELDS.includes(params.sortField as SortField)
    ? (params.sortField as SortField)
    : null;
  const sortOrder =
    sortField &&
    VALID_SORT_ORDERS.includes(
      params.sortOrder as (typeof VALID_SORT_ORDERS)[number],
    )
      ? (params.sortOrder as "asc" | "desc")
      : null;

  return (
    <ServerFetchBoundary
      fetchOptions={[
        userStatsQueryOptions({ userId }, tokens),
        userAnalysisQueryOptions({ userId }, tokens),
        gameHistoriesQueryOptions(
          {
            userId,
            page,
            size: 5,
            sortBy: sortField ? SORT_FIELD_TO_API[sortField] : "playedAt",
            sortOrder: sortField
              ? ((sortOrder ?? "desc") as "asc" | "desc")
              : "desc",
            ...(params.search && { search: params.search }),
            ...(params.startDate && { startDate: params.startDate }),
            ...(params.endDate && { endDate: params.endDate }),
            ...(params.categories && { categories: params.categories }),
            ...(params.difficulties && {
              difficultyModes: params.difficulties,
            }),
          },
          tokens,
        ),
      ]}
    >
      <ReportContent userId={userId} />
    </ServerFetchBoundary>
  );
}
