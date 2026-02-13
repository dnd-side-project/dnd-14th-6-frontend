import Image from "next/image";

import Flex from "@/components/common/Flex/Flex";

import * as styles from "./TopRankingCard.css";

export type TopRankingVariant = "first" | "second" | "third";

export interface TopRankingCardProps {
  variant: TopRankingVariant;
  nickname: string;
  totalScore: string;
  profileImage: string | null;
}

const TopRankingCard = ({
  variant,
  nickname,
  totalScore,
  profileImage,
}: TopRankingCardProps) => {
  const formattedScore = Number(totalScore).toLocaleString();

  return (
    <div className={styles.card({ variant })}>
      <div className={styles.profileArea}>
        <div className={styles.rankBadge} />
        {profileImage ? (
          <Image
            className={styles.profileImage}
            src={profileImage}
            alt={`${nickname} 프로필`}
            width={148}
            height={148}
          />
        ) : (
          <div className={styles.profileImage} />
        )}
      </div>
      <Flex direction="column" align="center" gap={1.2}>
        <Flex align="center" gap={0.9}>
          <div className={styles.tierBadge} />
          <span className={styles.nickname}>{nickname}</span>
        </Flex>
        <span className={styles.score}>{formattedScore}</span>
      </Flex>
    </div>
  );
};

export default TopRankingCard;
