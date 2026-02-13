import RankingContent from "./ranking-content";

interface RankingPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function RankingPage({ searchParams }: RankingPageProps) {
  const { tab } = await searchParams;
  return <RankingContent key={tab} tab={tab} />;
}
