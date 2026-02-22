import { gameOptionsQueryOptions } from "@/hooks/query/useGetGameOptionsQuery";
import ServerFetchBoundary from "@/server/query/server-fetch-boundary";
import GameSetupContent from "./game-setup-content";

interface GamePageProps {
  searchParams: Promise<{ step?: string; category?: string }>;
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const { step, category } = await searchParams;

  return (
    <ServerFetchBoundary fetchOptions={[gameOptionsQueryOptions()]}>
      <GameSetupContent step={step} category={category} />
    </ServerFetchBoundary>
  );
}
