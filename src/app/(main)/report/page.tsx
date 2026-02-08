import Flex from "@/components/common/Flex/Flex";
import CumulativeScoreSection from "@/components/report/CumulativeScoreSection/CumulativeScoreSection";
import MistakeCategorySection from "@/components/report/MistakeCategorySection/MistakeCategorySection";
import {
  MOCK_FREQUENT_WRONG_CATEGORIES,
  MOCK_SCORE_DETAIL,
  MOCK_TOTAL_SCORE,
} from "@/constants/report-mock";

export default function ReportPage() {
  return (
    <Flex
      width={"100%"}
      direction="column"
      padding={"3.6rem 4.8rem 5rem"}
      gap={1.6}
    >
      <CumulativeScoreSection
        totalScore={MOCK_TOTAL_SCORE}
        scoreDetail={MOCK_SCORE_DETAIL}
      />
      <Flex align="center" width={"100%"} gap={1.6}>
        <MistakeCategorySection
          frequentWrongCategories={MOCK_FREQUENT_WRONG_CATEGORIES}
        />
        <Flex grow={1} />
      </Flex>
    </Flex>
  );
}
