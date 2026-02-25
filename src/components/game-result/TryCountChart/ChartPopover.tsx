import type { CSSProperties } from "react";

import Text from "@/components/common/Text/Text";

import * as styles from "./ChartPopover.css";

interface ChartPopoverProps {
  index: number;
  subCategory: string;
  tryCount: number;
  style?: CSSProperties;
}

export default function ChartPopover({
  index,
  subCategory,
  tryCount,
  style,
}: ChartPopoverProps) {
  return (
    <div className={styles.popoverWrapper} style={style}>
      <Text variant="body7" color="primary_default">
        {index}번
      </Text>
      <div className={styles.contentRow}>
        <Text variant="body7" color="coolgrey_10">
          {subCategory}
        </Text>
        <Text variant="body6" color="coolgrey_10">
          {tryCount}
        </Text>
      </div>
    </div>
  );
}
