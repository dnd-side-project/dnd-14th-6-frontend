"use client";

import { useState } from "react";

import Pagination from "@/components/common/Pagination/Pagination";
import type { SortField, SortOrder } from "@/constants/history-table";
import type { SessionHistoryDto } from "@/types/api";
import HistoryTable from "../HistoryTable/HistoryTable";
import * as styles from "./HistoryList.css";

interface HistoryListProps {
  items: SessionHistoryDto[];
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField, direction: "asc" | "desc") => void;
  searchKeyword: string;
}

const HistoryList = ({
  items,
  totalItems,
  currentPage,
  onPageChange,
  sortField,
  sortOrder,
  onSort,
  searchKeyword,
}: HistoryListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePageChange = (page: number) => {
    setExpandedId(null);
    onPageChange(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableSection}>
        <HistoryTable
          items={items}
          expandedId={expandedId}
          onToggle={handleToggle}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSort}
          searchKeyword={searchKeyword}
        />
        <div className={styles.paginationWrapper}>
          <Pagination
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
