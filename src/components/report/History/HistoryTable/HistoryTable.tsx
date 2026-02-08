"use client";

import type { SortField, SortOrder } from "@/constants/history-table";

import type { HistoryItem } from "@/types/history";
import HistoryRow from "../HistoryRow/HistoryRow";
import * as styles from "./HistoryTable.css";
import HistoryTableHeader from "./HistoryTableHeader";

interface HistoryTableProps {
  items: HistoryItem[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const HistoryTable = ({
  items,
  expandedId,
  onToggle,
  sortField,
  sortOrder,
  onSort,
}: HistoryTableProps) => {
  return (
    <div className={styles.table}>
      <HistoryTableHeader
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
      />
      <div className={styles.body}>
        {items.map((item, index) => (
          <div key={item.id} className={styles.rowGroup}>
            {index > 0 && <div className={styles.divider} />}
            <HistoryRow
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => onToggle(item.id)}
            />
            {index === items.length - 1 && (
              <div className={styles.lastDivider} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTable;
