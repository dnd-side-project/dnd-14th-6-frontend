import { useState } from "react";

import Text from "@/components/common/Text/Text";

import * as styles from "./ProblemListItem.css";

interface ProblemListItemProps {
  index: number;
  subCategory: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ProblemListItem({
  index,
  subCategory,
  isSelected = false,
  onClick,
}: ProblemListItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variant = isSelected ? "body7" : "body8";
  const defaultColor = isHovered ? "coolgrey_80" : "coolgrey_110";

  return (
    <button
      type="button"
      className={styles.item({ selected: isSelected })}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text
        as="span"
        variant={variant}
        color={isSelected ? "primary_150" : defaultColor}
      >
        {index}
      </Text>
      <Text
        as="span"
        variant={variant}
        color={isSelected ? "primary_default" : defaultColor}
      >
        {subCategory}
      </Text>
    </button>
  );
}
