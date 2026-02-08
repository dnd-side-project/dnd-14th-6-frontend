import type { ReactNode } from "react";
import { IcDocker, IcGit, IcLinux } from "@/assets/icons/colored";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import DashboardCard from "@/components/report/DashboardCard/DashboardCard";
import MistakeCategoryItem from "./MistakeCategoryItem/MistakeCategoryItem";
import { card } from "./MistakeCategorySection.css";

interface FrequentWrongCategory {
  category: string;
  wrongRatio: number;
  wrongCount: number;
}

interface MistakeCategorySectionProps {
  frequentWrongCategories: FrequentWrongCategory[];
}

const CATEGORY_ICON_MAP: Record<string, ReactNode> = {
  Git: <IcGit size={33} />,
  Docker: <IcDocker size={28} />,
  Linux: <IcLinux size={34} />,
};

export default function MistakeCategorySection({
  frequentWrongCategories,
}: MistakeCategorySectionProps) {
  return (
    <DashboardCard className={card}>
      <Flex direction="column" gap={4.2}>
        <Text variant="heading4" color="coolgrey_40">
          많이 틀린 카테고리
        </Text>
        <Flex direction="column" gap={2.3}>
          {frequentWrongCategories.map((item, index) => {
            const level = (index + 1) as 1 | 2 | 3;

            return (
              <MistakeCategoryItem
                key={item.category}
                icon={CATEGORY_ICON_MAP[item.category]}
                category={item.category}
                wrongRatio={item.wrongRatio}
                wrongCount={item.wrongCount}
                level={level}
              />
            );
          })}
        </Flex>
      </Flex>
    </DashboardCard>
  );
}
