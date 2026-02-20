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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const toStr = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export default async function ReportPage({ searchParams }: ReportPageProps) {
  const { userId, tokens } = await requireAuth();
  const raw = await searchParams;

  const page = Math.max(1, Number(toStr(raw.page)) || 1);
  const rawSortField = toStr(raw.sortField);
  const sortField = VALID_SORT_FIELDS.includes(rawSortField as SortField)
    ? (rawSortField as SortField)
    : null;
  const rawSortOrder = toStr(raw.sortOrder);
  const sortOrder = VALID_SORT_ORDERS.includes(
    rawSortOrder as (typeof VALID_SORT_ORDERS)[number],
  )
    ? (rawSortOrder as "asc" | "desc")
    : "desc";

  const search = toStr(raw.search);
  const startDate = toStr(raw.startDate);
  const endDate = toStr(raw.endDate);
  const categories = toStr(raw.categories);
  const difficulties = toStr(raw.difficulties);

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
            sortOrder,
            ...(search && { search }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(categories && { categories }),
            ...(difficulties && { difficultyModes: difficulties }),
          },
          tokens,
        ),
      ]}
    >
      <ReportContent userId={userId} />
    </ServerFetchBoundary>
  );
}
