"use client";

import Flex from "@/components/common/Flex/Flex";
import CumulativeScoreSection from "@/components/report/CumulativeScoreSection/CumulativeScoreSection";
import FrequentWrongCommandsSection from "@/components/report/FrequentWrongCommandsSection/FrequentWrongCommandsSection";
import GameHistorySection from "@/components/report/GameHistorySection/GameHistorySection";
import MistakeCategorySection from "@/components/report/MistakeCategorySection/MistakeCategorySection";
import TierRankingSection from "@/components/report/TierRankingSection/TierRankingSection";
import { useGetUserStatsSuspenseQuery } from "@/hooks/query/useGetUserStatsQuery";
import type {
  FrequentWrongCategory,
  FrequentWrongCommand,
} from "@/types/report";

// TODO: /api/users/{userId}/analysis API 연동 시 제거
const TEMP_FREQUENT_WRONG_CATEGORIES: FrequentWrongCategory[] = [
  { category: "Git", wrongRatio: 48, wrongCount: 24 },
  { category: "Docker", wrongRatio: 30, wrongCount: 15 },
  { category: "Linux", wrongRatio: 22, wrongCount: 11 },
];

const TEMP_FREQUENT_WRONG_COMMANDS: FrequentWrongCommand[] = [
  { mainCategory: "Git", subCategory: "Branch", wrongCount: 12 },
  { mainCategory: "Git", subCategory: "Commit", wrongCount: 9 },
  { mainCategory: "Git", subCategory: "Merge", wrongCount: 7 },
  { mainCategory: "Git", subCategory: "Rebase", wrongCount: 5 },
  { mainCategory: "Linux", subCategory: "Stash", wrongCount: 3 },
];

interface ReportContentProps {
  userId: string;
}

export default function ReportContent({ userId }: ReportContentProps) {
  const { data: stats } = useGetUserStatsSuspenseQuery({ userId });

  return (
    <Flex
      width={"100%"}
      direction="column"
      padding={"3.6rem 4.8rem 16rem"}
      gap={1.6}
    >
      <CumulativeScoreSection
        totalScore={stats.totalScore}
        scoreDetail={stats.scoreDetail}
      />
      <Flex width={"100%"} gap={1.6} marginBottom={6.4}>
        <Flex direction="column" gap={1.6} style={{ flex: 1 }}>
          <MistakeCategorySection
            frequentWrongCategories={TEMP_FREQUENT_WRONG_CATEGORIES}
          />
          <Flex gap={1.6} style={{ flex: 1 }}>
            {stats.tier && (
              <TierRankingSection variant="tier" tier={stats.tier} />
            )}
            <TierRankingSection variant="ranking" ranking={stats.ranking} />
          </Flex>
        </Flex>
        <FrequentWrongCommandsSection
          frequentWrongCommands={TEMP_FREQUENT_WRONG_COMMANDS}
        />
      </Flex>
      <GameHistorySection />
    </Flex>
  );
}
