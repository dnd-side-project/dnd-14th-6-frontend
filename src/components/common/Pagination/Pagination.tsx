"use client";

import Text from "@/components/common/Text/Text";
import Flex from "../Flex/Flex";
import * as styles from "./Pagination.css";

const PAGES_PER_GROUP = 3;
const ITEMS_PER_PAGE = 5;

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalItems,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentGroup = Math.floor((currentPage - 1) / PAGES_PER_GROUP);
  const startPage = currentGroup * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const hasPrevious = startPage > 1;
  const hasNext = endPage < totalPages;

  return (
    <nav className={styles.container}>
      <button
        type="button"
        className={styles.navigationButton}
        disabled={!hasPrevious}
        onClick={() => onPageChange(startPage - 1)}
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
        onClick={() => onPageChange(endPage + 1)}
      >
        <Text as="span" variant="caption2" color="inherit">
          Next
        </Text>
      </button>
    </nav>
  );
};

export default Pagination;
