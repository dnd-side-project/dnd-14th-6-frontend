import { gameOptionsQueryOptions } from "@/hooks/query/useGetGameOptionsQuery";
import ServerFetchBoundary from "@/server/query/server-fetch-boundary";
import GameSetupContent from "./game-setup-content";

export default async function GamePage() {
  return (
    <ServerFetchBoundary fetchOptions={[gameOptionsQueryOptions()]}>
      <GameSetupContent />
    </ServerFetchBoundary>
  );
}
