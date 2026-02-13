"use client";

import { useState } from "react";

import Flex from "@/components/common/Flex/Flex";
import RankingListSection from "@/components/ranking/RankingListSection/RankingListSection";
import { MOCK_RANKS, MOCK_TOTAL_PAGE } from "@/constants/ranking-mock";

export default function RankingPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Flex width="100%" direction="column" padding={6}>
      <RankingListSection
        ranks={MOCK_RANKS}
        totalPage={MOCK_TOTAL_PAGE}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Flex>
  );
}
