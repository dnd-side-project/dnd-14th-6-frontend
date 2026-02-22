"use client";

import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";

import RankingListSection from "@/components/ranking/RankingListSection/RankingListSection";
import RankingTabs, {
  type RankingTabType,
} from "@/components/ranking/RankingTabs/RankingTabs";
import TopRankingSection from "@/components/ranking/TopRankingSection/TopRankingSection";
import {
  LIST_PAGE_SIZE,
  TOP_RANKS_SIZE,
  VALID_TABS,
} from "@/constants/ranking";
import {
  useGetRanksQuery,
  useGetRanksSuspenseQuery,
} from "@/hooks/query/useGetRanksQuery";

import * as styles from "./page.css";

interface RankingContentProps {
  tab?: string;
}

export default function RankingContent({ tab }: RankingContentProps) {
  const router = useRouter();
  const activeTab = VALID_TABS.find((t) => t === tab) ?? "all";
  const [currentPage, setCurrentPage] = useState(1);
  const rankingListRef = useRef<HTMLDivElement>(null);

  const myNickname = useMemo(() => {
    try {
      const raw = getCookie("userInfo");
      if (!raw) return null;
      const parsed = JSON.parse(String(raw));
      return typeof parsed?.nickname === "string" ? parsed.nickname : null;
    } catch {
      return null;
    }
  }, []);

  const { data: topRanksData } = useGetRanksSuspenseQuery({
    page: 1,
    size: TOP_RANKS_SIZE,
    scope: activeTab,
  });

  const { data: listData } = useGetRanksQuery({
    page: currentPage,
    size: LIST_PAGE_SIZE,
    scope: activeTab,
  });

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    rankingListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleTabChange = (newTab: RankingTabType) => {
    router.replace(`?tab=${newTab}`);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.tabArea}>
          <RankingTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <div className={styles.topRankingArea}>
          <TopRankingSection ranks={topRanksData.ranks} />
        </div>
      </div>
      <div className={styles.planetSection}>
        <Image
          src="/assets/images/ranking-planet-frame.png"
          alt=""
          width={1641}
          height={963.5}
          className={styles.planetImage}
        />
        <div ref={rankingListRef} className={styles.rankingListArea}>
          {listData && (
            <RankingListSection
              ranks={listData.ranks}
              totalPage={listData.metadata.totalPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              myNickname={myNickname}
            />
          )}
        </div>
      </div>
    </>
  );
}
