import Image from "next/image";
import Ic1Medal from "@/assets/icons/colored/Ic1Medal";
import Ic2Medal from "@/assets/icons/colored/Ic2Medal";
import Ic3Medal from "@/assets/icons/colored/Ic3Medal";
import IcGitActive from "@/assets/icons/colored/IcGitActive";
import IcGitInactive from "@/assets/icons/colored/IcGitInactive";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import type { RankUser } from "@/types/ranking";

import * as styles from "./RankingListItem.css";

export interface RankingListItemProps extends RankUser {
  isMe?: boolean;
}

const MEDAL_ICONS: Record<number, typeof Ic1Medal> = {
  1: Ic1Medal,
  2: Ic2Medal,
  3: Ic3Medal,
};

const getVariant = (ranking: number, isMe: boolean) => {
  if (isMe) return "me";
  if (ranking === 1) return "top1";
  if (ranking === 2) return "top2";
  if (ranking === 3) return "top3";
  return "default";
};

const RankingListItem = ({
  ranking,
  nickname,
  totalScore,
  githubUrl,
  tier,
  isMe = false,
}: RankingListItemProps) => {
  const variant = getVariant(ranking, isMe);
  const formattedScore = Number(totalScore).toLocaleString();

  return (
    <div className={styles.container({ variant })}>
      <Flex align="center" gap={6}>
        {(() => {
          const MedalIcon = MEDAL_ICONS[ranking];
          if (MedalIcon) {
            return <MedalIcon size={30} className={styles.rankNumber} />;
          }
          return (
            <Text
              variant="body7"
              color={isMe ? "coolgrey_120" : "coolgrey_75"}
              className={styles.rankNumber}
            >
              {ranking}
            </Text>
          );
        })()}
        <Flex align="center" gap={0.6}>
          {tier && (
            <Image src={tier.imageUrl} alt={tier.name} width={30} height={17} />
          )}
          <Text variant="body7" color={isMe ? "coolgrey_230" : "coolgrey_40"}>
            {nickname}
          </Text>
        </Flex>
      </Flex>

      <Flex align="center" gap={3.6}>
        <Text variant="body5" color={isMe ? "coolgrey_230" : "coolgrey_50"}>
          {formattedScore}
        </Text>
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <IcGitActive />
          </a>
        ) : (
          <IcGitInactive />
        )}
      </Flex>
    </div>
  );
};

export default RankingListItem;
