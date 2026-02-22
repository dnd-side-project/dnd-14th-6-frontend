import Text from "@/components/common/Text/Text";

import * as styles from "./Level.css";

export type LevelType = "normal" | "easy" | "hard" | "random";

const VALID_LEVEL_SET = new Set<string>(["normal", "easy", "hard", "random"]);
export const isValidLevel = (value: string): value is LevelType =>
  VALID_LEVEL_SET.has(value);

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
