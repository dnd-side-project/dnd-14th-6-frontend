import type { CSSProperties } from "react";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import type { CategoryScore } from "@/types/report";
import * as styles from "./PopoverContent.css";

interface PopoverContentProps {
  difficultyMode: string;
  totalScore: number;
  categoryScores: CategoryScore[];
  style?: CSSProperties;
}

export default function PopoverContent({
  difficultyMode,
  totalScore,
  categoryScores,
  style,
}: PopoverContentProps) {
  const formatScore = (score: number) => score.toLocaleString();

  return (
    <div className={styles.popover} style={style}>
      <Flex direction="column" gap={0.8}>
        <Flex direction="column">
          <Text variant="caption1" color="primary_default">
            {difficultyMode}
          </Text>
          <Flex
            justify="spaceBetween"
            align="center"
            className={styles.headerDivider}
          >
            <Text variant="body7" color="coolgrey_10">
              총
            </Text>
            <Text variant="body7" color="coolgrey_10">
              {formatScore(totalScore)}
            </Text>
          </Flex>
        </Flex>

        <Flex direction="column">
          {categoryScores.map((cat) => (
            <Flex key={cat.category} justify="spaceBetween" align="center">
              <Text variant="caption3" color="coolgrey_50">
                {cat.category}
              </Text>
              <Text variant="caption3" color="coolgrey_50">
                {formatScore(cat.score)}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </div>
  );
}
