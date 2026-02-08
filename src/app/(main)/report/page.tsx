import Flex from "@/components/common/Flex/Flex";
import CumulativeScoreSection from "@/components/report/CumulativeScoreSection/CumulativeScoreSection";
import { MOCK_SCORE_DETAIL, MOCK_TOTAL_SCORE } from "@/constants/report-mock";

export default function ReportPage() {
  return (
    <Flex width={"100%"} direction="column" padding={"3.6rem 4.8rem 5rem"}>
      <CumulativeScoreSection
        totalScore={MOCK_TOTAL_SCORE}
        scoreDetail={MOCK_SCORE_DETAIL}
      />
    </Flex>
  );
}
