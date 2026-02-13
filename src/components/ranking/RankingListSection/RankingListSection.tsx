import Flex from "@/components/common/Flex/Flex";
import Pagination from "@/components/common/Pagination/Pagination";
import type { RankUser } from "@/types/ranking";

import RankingList from "./RankingList/RankingList";

const ITEMS_PER_PAGE = 20;

export interface RankingListSectionProps {
  ranks: RankUser[];
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const RankingListSection = ({
  ranks,
  totalPage,
  currentPage,
  onPageChange,
}: RankingListSectionProps) => {
  return (
    <Flex direction="column" gap={5.6}>
      <RankingList ranks={ranks} />
      <Flex justify="center">
        <Pagination
          totalItems={totalPage * ITEMS_PER_PAGE}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </Flex>
    </Flex>
  );
};

export default RankingListSection;
