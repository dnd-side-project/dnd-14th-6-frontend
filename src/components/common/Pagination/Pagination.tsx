"use client";

import IcPageBack from "@/assets/icons/colored/IcPageBack";
import IcPageFront from "@/assets/icons/colored/IcPageFront";
import IcPageLeft from "@/assets/icons/colored/IcPageLeft";
import IcPageRight from "@/assets/icons/colored/IcPageRight";
import Text from "@/components/common/Text/Text";
import Flex from "../Flex/Flex";
import * as styles from "./Pagination.css";

const PAGES_PER_GROUP = 5;

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const currentGroup = Math.floor((currentPage - 1) / PAGES_PER_GROUP);
  const startPage = currentGroup * PAGES_PER_GROUP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPage);
  const totalGroups = Math.ceil(totalPage / PAGES_PER_GROUP);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const hasPrevGroup = currentGroup > 0;
  const hasNextGroup = currentGroup < totalGroups - 1;

  return (
    <nav className={styles.container}>
      <Flex align="center">
        <button
          type="button"
          className={styles.navigationButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          aria-label="첫 페이지"
        >
          <IcPageFront size={30} />
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          disabled={!hasPrevGroup}
          onClick={() => onPageChange((currentGroup - 1) * PAGES_PER_GROUP + 1)}
          aria-label="이전 그룹"
        >
          <IcPageLeft size={30} />
        </button>
      </Flex>

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

      <Flex align="center">
        <button
          type="button"
          className={styles.navigationButton}
          disabled={!hasNextGroup}
          onClick={() => onPageChange((currentGroup + 1) * PAGES_PER_GROUP + 1)}
          aria-label="다음 그룹"
        >
          <IcPageRight size={30} />
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          disabled={currentPage === totalPage}
          onClick={() => onPageChange(totalPage)}
          aria-label="마지막 페이지"
        >
          <IcPageBack size={30} />
        </button>
      </Flex>
    </nav>
  );
};

export default Pagination;
