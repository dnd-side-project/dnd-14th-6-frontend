"use client";

import { Suspense } from "react";

import Flex from "@/components/common/Flex/Flex";
import CumulativeScoreSection from "@/components/report/CumulativeScoreSection/CumulativeScoreSection";
import FrequentWrongCommandsSection from "@/components/report/FrequentWrongCommandsSection/FrequentWrongCommandsSection";
import GameHistorySection from "@/components/report/GameHistorySection/GameHistorySection";
import MistakeCategorySection from "@/components/report/MistakeCategorySection/MistakeCategorySection";
import TierRankingSection from "@/components/report/TierRankingSection/TierRankingSection";
import { useGetUserAnalysisSuspenseQuery } from "@/hooks/query/useGetUserAnalysisQuery";
import { useGetUserStatsSuspenseQuery } from "@/hooks/query/useGetUserStatsQuery";

interface ReportContentProps {
  userId: string;
}

export default function ReportContent({ userId }: ReportContentProps) {
  const { data: stats } = useGetUserStatsSuspenseQuery({ userId });
  const { data: analysis } = useGetUserAnalysisSuspenseQuery({ userId });

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
            frequentWrongCategories={analysis.frequentWrongCategories}
          />
          <Flex gap={1.6} style={{ flex: 1 }}>
            {stats.tier && (
              <TierRankingSection variant="tier" tier={stats.tier} />
            )}
            <TierRankingSection
              variant="ranking"
              ranking={stats.ranking}
              percentil={stats.percentil}
            />
          </Flex>
        </Flex>
        <FrequentWrongCommandsSection
          frequentWrongCommands={analysis.frequentWrongCommands}
        />
      </Flex>
      {/* TODO: 게임 히스토리 스켈레톤 UI fallback 추가 */}
      <Suspense>
        <GameHistorySection userId={userId} />
      </Suspense>
    </Flex>
  );
}
