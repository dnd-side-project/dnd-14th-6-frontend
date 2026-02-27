import Image from "next/image";
import IcFirst from "@/assets/icons/colored/IcFirst";
import IcSecond from "@/assets/icons/colored/IcSecond";
import IcThird from "@/assets/icons/colored/IcThird";
import Flex from "@/components/common/Flex/Flex";

import * as styles from "./TopRankingCard.css";

export type TopRankingVariant = "first" | "second" | "third";

const RANK_ICONS: Record<
  TopRankingVariant,
  { icon: typeof IcFirst; width: string; height: string }
> = {
  first: { icon: IcFirst, width: "7.4rem", height: "6.177rem" },
  second: { icon: IcSecond, width: "6.5rem", height: "4.1rem" },
  third: { icon: IcThird, width: "6.5rem", height: "4.448rem" },
};

export interface TopRankingCardProps {
  variant: TopRankingVariant;
  nickname: string;
  totalScore: string;
  profileImage: string | null;
  tier: { name: string; imageUrl: string } | null;
}

const TopRankingCard = ({
  variant,
  nickname,
  totalScore,
  profileImage,
  tier,
}: TopRankingCardProps) => {
  const formattedScore = Number(totalScore).toLocaleString();

  return (
    <div className={styles.card({ variant })}>
      <Flex
        direction="column"
        align="center"
        gap={variant === "first" ? 2 : 1.6}
      >
        {(() => {
          const { icon: RankIcon, width, height } = RANK_ICONS[variant];
          return <RankIcon width={width} height={height} />;
        })()}
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
      </Flex>
      <Flex direction="column" align="center" gap={1.2}>
        <Flex align="center" gap={0.4}>
          {tier && (
            <Image src={tier.imageUrl} alt={tier.name} width={32} height={21} />
          )}
          <span className={styles.nickname}>{nickname}</span>
        </Flex>
        <span className={styles.score}>{formattedScore}</span>
      </Flex>
    </div>
  );
};

export default TopRankingCard;
