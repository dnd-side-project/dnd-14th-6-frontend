"use client";

import IcListArrow from "@/assets/icons/colored/IcListArrow";
import Text from "@/components/common/Text/Text";
import { HISTORY_COLUMNS } from "@/constants/history-table";

import type { HistoryItem } from "@/types/history";
import HighlightText from "../HighlightText/HighlightText";
import * as styles from "./HistoryRow.css";
import HistoryRowDetail from "./HistoryRowDetail";

interface HistoryRowProps {
  item: HistoryItem;
  isExpanded: boolean;
  onToggle: () => void;
  searchKeyword: string;
}

const getColumnStyle = (key: string) => {
  const col = HISTORY_COLUMNS.find((c) => c.key === key);
  if (!col) return {};
  return col.flexible ? { flex: 1, minWidth: col.width } : { width: col.width };
};

const HistoryRow = ({
  item,
  isExpanded,
  onToggle,
  searchKeyword,
}: HistoryRowProps) => {
  const isPerfect = item.correctCount === item.totalCount;

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.summaryRow}
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className={styles.cell} style={getColumnStyle("date")}>
          <Text as="span" variant="body2" color="coolgrey_20">
            {item.date}
          </Text>
        </div>
        <div className={styles.cell} style={getColumnStyle("category")}>
          <Text as="span" variant="body2" color="coolgrey_20">
            {item.category}
          </Text>
        </div>
        <div className={styles.cell} style={getColumnStyle("difficulty")}>
          <Text as="span" variant="body2" color="coolgrey_20">
            {item.difficulty}
          </Text>
        </div>
        <div className={styles.cell} style={getColumnStyle("problem")}>
          <Text as="span" variant="body2" color="coolgrey_20">
            <HighlightText text={item.problemSummary} keyword={searchKeyword} />
          </Text>
        </div>
        <div className={styles.cell} style={getColumnStyle("score")}>
          <Text as="span" variant="body2" color="coolgrey_20">
            {item.score}
          </Text>
        </div>
        <div className={styles.cell} style={getColumnStyle("result")}>
          <Text
            as="span"
            variant="body2"
            color={isPerfect ? "primary_100" : "primary_200"}
          >
            {item.correctCount}/{item.totalCount}
          </Text>
        </div>
        <div className={styles.arrowIcon({ expanded: isExpanded })}>
          <IcListArrow size={14} />
        </div>
      </button>
      {isExpanded && <HistoryRowDetail problems={item.problems} />}
    </div>
  );
};

export default HistoryRow;
