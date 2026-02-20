import { userAnalysisQueryOptions } from "@/hooks/query/useGetUserAnalysisQuery";
import { userStatsQueryOptions } from "@/hooks/query/useGetUserStatsQuery";
import { requireAuth } from "@/server/auth/require-auth";
import ServerFetchBoundary from "@/server/query/server-fetch-boundary";
import ReportContent from "./report-content";

export default async function ReportPage() {
  const { userId, tokens } = await requireAuth();

  return (
    <ServerFetchBoundary
      fetchOptions={[
        userStatsQueryOptions({ userId }, tokens),
        userAnalysisQueryOptions({ userId }, tokens),
      ]}
    >
      <ReportContent userId={userId} />
    </ServerFetchBoundary>
  );
}
