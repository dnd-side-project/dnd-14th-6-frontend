import { redirect } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { gameResultReportQueryOptions } from "@/hooks/query/useGetGameResultReportQuery";
import { getServerSideTokens } from "@/server/auth/get-server-side-tokens";
import ServerFetchBoundary from "@/server/query/server-fetch-boundary";
import GameResultContent from "./game-result-content";

interface GameResultPageProps {
  searchParams: Promise<{ gameSessionId?: string | string[] }>;
}

function normalize(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function GameResultPage({
  searchParams,
}: GameResultPageProps) {
  const gameSessionId = normalize((await searchParams).gameSessionId);
  if (!gameSessionId) redirect(ROUTES.GAME);

  const tokens = await getServerSideTokens();

  return (
    <ServerFetchBoundary
      fetchOptions={gameResultReportQueryOptions({ gameSessionId }, tokens)}
    >
      <GameResultContent gameSessionId={gameSessionId} />
    </ServerFetchBoundary>
  );
}
