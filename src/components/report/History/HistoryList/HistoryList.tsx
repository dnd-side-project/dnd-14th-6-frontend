"use client";

import { useState } from "react";

import Pagination from "@/components/common/Pagination/Pagination";
import type { SortField, SortOrder } from "@/constants/history-table";
import type { HistoryItem } from "@/types/history";
import HistoryTable from "../HistoryTable/HistoryTable";
import * as styles from "./HistoryList.css";

interface HistoryListProps {
  items: HistoryItem[];
  totalItems: number;
}

const HistoryList = ({ items, totalItems }: HistoryListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const handleToggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc",
      );
      if (sortOrder === "desc") {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
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
          onSort={handleSort}
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
