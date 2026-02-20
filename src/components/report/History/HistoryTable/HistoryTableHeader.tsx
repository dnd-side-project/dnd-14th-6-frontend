"use client";

import IcArrowDown from "@/assets/icons/colored/IcArrowDown";
import IcArrowUp from "@/assets/icons/colored/IcArrowUp";
import Text from "@/components/common/Text/Text";
import type { SortField, SortOrder } from "@/constants/history-table";
import { HISTORY_COLUMNS } from "@/constants/history-table";

import * as styles from "./HistoryTableHeader.css";

interface HistoryTableHeaderProps {
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField, direction: "asc" | "desc") => void;
}

const HistoryTableHeader = ({
  sortField,
  sortOrder,
  onSort,
}: HistoryTableHeaderProps) => {
  return (
    <div className={styles.header}>
      {HISTORY_COLUMNS.map((col) => {
        const isActive = sortField === col.sortField;
        const { sortField: colSortField } = col;

        return (
          <div
            key={col.key}
            className={styles.column}
            style={
              col.flexible
                ? { flex: 1, minWidth: col.width }
                : { width: col.width }
            }
          >
            <Text as="span" variant="subtitle2" color="coolgrey_80">
              {col.label}
            </Text>
            {col.sortable && colSortField && (
              <div
                className={styles.sortButton}
                style={{ left: col.sortIconLeft }}
              >
                <button
                  type="button"
                  className={styles.sortIconButton}
                  onClick={() => onSort(colSortField, "asc")}
                >
                  <span
                    className={styles.sortIcon({
                      active: !isActive || sortOrder === "asc",
                    })}
                  >
                    <IcArrowUp size={11} />
                  </span>
                </button>
                <button
                  type="button"
                  className={styles.sortIconButton}
                  onClick={() => onSort(colSortField, "desc")}
                >
                  <span
                    className={styles.sortIcon({
                      active: !isActive || sortOrder === "desc",
                    })}
                  >
                    <IcArrowDown size={11} />
                  </span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryTableHeader;
