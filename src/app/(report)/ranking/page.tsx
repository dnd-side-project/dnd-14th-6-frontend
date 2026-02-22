import type { RankingTabType } from "@/components/ranking/RankingTabs/RankingTabs";
import {
  LIST_PAGE_SIZE,
  TOP_RANKS_SIZE,
  VALID_TABS,
} from "@/constants/ranking";
import { ranksQueryOptions } from "@/hooks/query/useGetRanksQuery";
import { requireAuth } from "@/server/auth/require-auth";
import ServerFetchBoundary from "@/server/query/server-fetch-boundary";
import RankingContent from "./ranking-content";

interface RankingPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function RankingPage({ searchParams }: RankingPageProps) {
  const { tokens } = await requireAuth();
  const { tab } = await searchParams;
  const scope: RankingTabType = VALID_TABS.includes(tab as RankingTabType)
    ? (tab as RankingTabType)
    : "all";

  return (
    <ServerFetchBoundary
      fetchOptions={[
        ranksQueryOptions({ page: 1, size: TOP_RANKS_SIZE, scope }, tokens),
        ranksQueryOptions({ page: 1, size: LIST_PAGE_SIZE, scope }, tokens),
      ]}
    >
      <RankingContent key={tab} tab={tab} />
    </ServerFetchBoundary>
  );
}
