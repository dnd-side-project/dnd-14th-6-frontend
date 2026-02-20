"use client";

import Text from "@/components/common/Text/Text";
import Flex from "../Flex/Flex";
import * as styles from "./Pagination.css";

const PAGES_PER_GROUP = 3;
const DEFAULT_ITEMS_PER_PAGE = 5;

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const Pagination = ({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentGroup = Math.floor((currentPage - 1) / PAGES_PER_GROUP);
  const startPage = currentGroup * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className={styles.container}>
      <button
        type="button"
        className={styles.navigationButton}
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Text as="span" variant="caption2" color="inherit">
          Previous
        </Text>
      </button>

      <Flex align="center" gap={0.53}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={styles.pageButton({ selected: page === currentPage })}
            onClick={() => onPageChange(page)}
          >
            <Text
              as="span"
              variant={page === currentPage ? "caption1" : "caption2"}
              color="inherit"
            >
              {page}
            </Text>
          </button>
        ))}
      </Flex>

      <button
        type="button"
        className={styles.navigationButton}
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Text as="span" variant="caption2" color="inherit">
          Next
        </Text>
      </button>
    </nav>
  );
};

export default Pagination;
