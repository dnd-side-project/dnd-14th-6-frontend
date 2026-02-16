import Text from "@/components/common/Text/Text";
import type { LevelType } from "@/components/game/Level/Level";

import * as styles from "./ScoreTable.css";

export type ScoreLevelType = Exclude<LevelType, "random">;

interface ScoreTableProps {
  scores: Record<ScoreLevelType, number>;
}

const LEVEL_ORDER: ScoreLevelType[] = ["hard", "normal", "easy"];

const LEVEL_LABELS: Record<ScoreLevelType, string> = {
  hard: "Hard",
  normal: "Normal",
  easy: "Easy",
};

export default function ScoreTable({ scores }: ScoreTableProps) {
  return (
    <div className={styles.wrapper}>
      {LEVEL_ORDER.map((level) => (
        <div key={level} className={styles.row}>
          <div className={styles.labelGroup}>
            <span className={styles.dot[level]} />
            <Text as="span" variant="body8" color="coolgrey_50">
              {LEVEL_LABELS[level]}
            </Text>
          </div>
          <Text as="span" variant="body7" color="coolgrey_20">
            {scores[level]}점
          </Text>
        </div>
      ))}
    </div>
  );
}
