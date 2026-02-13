import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";

import * as styles from "./RankingTabs.css";

export type RankingTabType = "all" | "tier";

interface RankingTabsProps {
  activeTab: RankingTabType;
  onTabChange: (tab: RankingTabType) => void;
}

const TABS: { key: RankingTabType; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "tier", label: "티어" },
];

export default function RankingTabs({
  activeTab,
  onTabChange,
}: RankingTabsProps) {
  return (
    <Flex align="center" gap={2.6}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            className={styles.tab({ active: isActive })}
            onClick={() => onTabChange(tab.key)}
          >
            <Text
              variant="body13"
              color={isActive ? "coolgrey_40" : "coolgrey_110"}
            >
              {tab.label}
            </Text>
          </button>
        );
      })}
    </Flex>
  );
}
