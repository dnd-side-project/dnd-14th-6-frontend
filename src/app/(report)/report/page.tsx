import Flex from "@/components/common/Flex/Flex";
import CumulativeScoreSection from "@/components/report/CumulativeScoreSection/CumulativeScoreSection";
import FrequentWrongCommandsSection from "@/components/report/FrequentWrongCommandsSection/FrequentWrongCommandsSection";
import GameHistorySection from "@/components/report/GameHistorySection/GameHistorySection";
import MistakeCategorySection from "@/components/report/MistakeCategorySection/MistakeCategorySection";
import TierRankingSection from "@/components/report/TierRankingSection/TierRankingSection";
import {
  MOCK_FREQUENT_WRONG_CATEGORIES,
  MOCK_FREQUENT_WRONG_COMMANDS,
  MOCK_RANKING,
  MOCK_SCORE_DETAIL,
  MOCK_TIER,
  MOCK_TOTAL_SCORE,
} from "@/constants/report-mock";

export default function ReportPage() {
  return (
    <Flex
      width={"100%"}
      direction="column"
      padding={"3.6rem 4.8rem 16rem"}
      gap={1.6}
    >
      <CumulativeScoreSection
        totalScore={MOCK_TOTAL_SCORE}
        scoreDetail={MOCK_SCORE_DETAIL}
      />
      <Flex width={"100%"} gap={1.6} marginBottom={6.4}>
        <Flex direction="column" gap={1.6} style={{ flex: 1 }}>
          <MistakeCategorySection
            frequentWrongCategories={MOCK_FREQUENT_WRONG_CATEGORIES}
          />
          <Flex gap={1.6} style={{ flex: 1 }}>
            <TierRankingSection variant="tier" tier={MOCK_TIER} />
            <TierRankingSection variant="ranking" ranking={MOCK_RANKING} />
          </Flex>
        </Flex>
        <FrequentWrongCommandsSection
          frequentWrongCommands={MOCK_FREQUENT_WRONG_COMMANDS}
        />
      </Flex>
      <GameHistorySection />
    </Flex>
  );
}
