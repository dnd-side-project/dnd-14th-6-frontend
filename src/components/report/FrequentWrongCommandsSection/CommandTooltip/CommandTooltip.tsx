import type { CSSProperties } from "react";
import Text from "@/components/common/Text/Text";
import type { FrequentWrongCommand } from "@/types/report";
import * as styles from "./CommandTooltip.css";

interface CommandTooltipProps {
  command: FrequentWrongCommand;
  style?: CSSProperties;
}

export default function CommandTooltip({
  command,
  style,
}: CommandTooltipProps) {
  return (
    <div className={styles.tooltipWrapper} style={style}>
      <Text variant="body7" color="primary_default">
        {command.mainCategory}
      </Text>
      <div className={styles.contentRow}>
        <Text variant="body7" color="coolgrey_10">
          {command.subCategory}
        </Text>
        <Text variant="body6" color="coolgrey_10">
          {command.wrongCount}
        </Text>
      </div>
    </div>
  );
}
