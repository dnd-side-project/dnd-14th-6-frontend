import Text from "@/components/common/Text/Text";

import * as styles from "./Level.css";

export type LevelType = "normal" | "easy" | "hard" | "random";

const LEVEL_LABELS: Record<LevelType, string> = {
  normal: "Normal",
  easy: "Easy",
  hard: "Hard",
  random: "Random",
};

interface LevelProps {
  level: LevelType;
}

export default function Level({ level }: LevelProps) {
  return (
    <Text variant="display8" color="inherit" className={styles.level}>
      {LEVEL_LABELS[level]}
    </Text>
  );
}
