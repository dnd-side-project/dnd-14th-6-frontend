import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";

import type { RankingListItemProps } from "../RankingListItem/RankingListItem";
import RankingListItem from "../RankingListItem/RankingListItem";
import * as styles from "./RankingList.css";

interface RankingListProps {
  ranks: RankingListItemProps[];
}

const RankingList = ({ ranks }: RankingListProps) => {
  return (
    <Flex direction="column">
      <div className={styles.headerRow}>
        <Flex align="center" gap={6}>
          <Text
            variant="body7"
            color="coolgrey_80"
            className={styles.rankHeader}
          >
            순위
          </Text>
          <Text variant="body7" color="coolgrey_80">
            닉네임
          </Text>
        </Flex>
        <Flex align="center" gap={2.7}>
          <Text variant="body7" color="coolgrey_80">
            누적 점수
          </Text>
          <Text variant="body7" color="coolgrey_80">
            깃허브
          </Text>
        </Flex>
      </div>

      <Flex direction="column" gap={1}>
        {ranks.map((rank) => (
          <RankingListItem key={rank.ranking} {...rank} />
        ))}
      </Flex>
    </Flex>
  );
};

export default RankingList;
