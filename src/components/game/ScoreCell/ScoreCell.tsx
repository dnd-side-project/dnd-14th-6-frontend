import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";

import * as styles from "./ScoreCell.css";

interface ScoreCellProps {
  score: number;
}

export default function ScoreCell({ score }: ScoreCellProps) {
  return (
    <Flex direction="column" align="flexEnd" className={styles.wrapper}>
      <Text variant="body15" color="coolgrey_40">
        Score
      </Text>
      <Text variant="display8" color="inherit" className={styles.score}>
        {score}
      </Text>
    </Flex>
  );
}
