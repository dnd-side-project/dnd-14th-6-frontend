"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import RankingListSection from "@/components/ranking/RankingListSection/RankingListSection";
import RankingTabs, {
  type RankingTabType,
} from "@/components/ranking/RankingTabs/RankingTabs";
import TopRankingSection from "@/components/ranking/TopRankingSection/TopRankingSection";
import {
  MOCK_RANKS,
  MOCK_TOP_RANKS,
  MOCK_TOTAL_PAGE,
} from "@/constants/ranking-mock";

import * as styles from "./page.css";

const VALID_TABS: RankingTabType[] = ["all", "tier"];

interface RankingContentProps {
  tab?: string;
}

export default function RankingContent({ tab }: RankingContentProps) {
  const router = useRouter();
  const activeTab = VALID_TABS.includes(tab as RankingTabType)
    ? (tab as RankingTabType)
    : "all";
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabChange = (newTab: RankingTabType) => {
    router.replace(`?tab=${newTab}`);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.tabArea}>
          <RankingTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <div className={styles.topRankingArea}>
          <TopRankingSection ranks={MOCK_TOP_RANKS} />
        </div>
      </div>
      <div className={styles.planetSection}>
        <Image
          src="/assets/images/ranking-planet.png"
          alt=""
          width={1440}
          height={3865}
          className={styles.planetImage}
        />
        <div className={styles.rankingListArea}>
          <RankingListSection
            ranks={MOCK_RANKS}
            totalPage={MOCK_TOTAL_PAGE}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
