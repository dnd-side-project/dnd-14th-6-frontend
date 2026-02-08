import type { ReactNode } from "react";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import ProgressBar from "../ProgressBar/ProgressBar";
import { iconWrapper } from "./MistakeCategoryItem.css";

interface MistakeCategoryItemProps {
  icon: ReactNode;
  category: string;
  wrongRatio: number;
  wrongCount: number;
  level: 1 | 2 | 3;
}

export default function MistakeCategoryItem({
  icon,
  category,
  wrongRatio,
  wrongCount,
  level,
}: MistakeCategoryItemProps) {
  return (
    <Flex gap={1.4} align="center">
      <div className={iconWrapper}>{icon}</div>
      <Flex direction="column" gap={0.9} grow={1}>
        <Flex justify="spaceBetween" align="center">
          <Text variant="body7" color="coolgrey_10">
            {category}
          </Text>
          <Text variant="body7" color="coolgrey_10">
            {wrongRatio}% ({wrongCount})
          </Text>
        </Flex>
        <ProgressBar percent={wrongRatio} level={level} />
      </Flex>
    </Flex>
  );
}
