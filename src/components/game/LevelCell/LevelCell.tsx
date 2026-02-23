import Flex from "@/components/common/Flex/Flex";
import type { CategoryType } from "@/components/game/Category/Category";
import Category from "@/components/game/Category/Category";
import type { LevelType } from "@/components/game/Level/Level";
import Level from "@/components/game/Level/Level";

import * as styles from "./LevelCell.css";

interface LevelCellProps {
  category: CategoryType;
  level: LevelType;
}

export default function LevelCell({ category, level }: LevelCellProps) {
  return (
    <Flex direction="column" className={styles.wrapper}>
      <Category category={category} />
      <Level level={level} />
    </Flex>
  );
}
