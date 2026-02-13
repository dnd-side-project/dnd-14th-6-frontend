import type { RankUser } from "@/types/ranking";

import TopRankingCard from "./TopRankingCard/TopRankingCard";
import * as styles from "./TopRankingSection.css";

interface TopRankingSectionProps {
  ranks: RankUser[];
}

const TopRankingSection = ({ ranks }: TopRankingSectionProps) => {
  const first = ranks.find((r) => r.ranking === 1);
  const second = ranks.find((r) => r.ranking === 2);
  const third = ranks.find((r) => r.ranking === 3);

  return (
    <div className={styles.section}>
      {second && (
        <TopRankingCard
          variant="second"
          nickname={second.nickname}
          totalScore={second.totalScore}
          profileImage={second.profileImage}
        />
      )}
      {first && (
        <TopRankingCard
          variant="first"
          nickname={first.nickname}
          totalScore={first.totalScore}
          profileImage={first.profileImage}
        />
      )}
      {third && (
        <TopRankingCard
          variant="third"
          nickname={third.nickname}
          totalScore={third.totalScore}
          profileImage={third.profileImage}
        />
      )}
    </div>
  );
};

export default TopRankingSection;
