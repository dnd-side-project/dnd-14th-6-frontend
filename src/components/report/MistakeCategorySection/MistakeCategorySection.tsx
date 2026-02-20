import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import DashboardCard from "@/components/report/DashboardCard/DashboardCard";
import type { FrequentWrongCategory } from "@/types/report";
import MistakeCategoryItem from "./MistakeCategoryItem/MistakeCategoryItem";
import { card } from "./MistakeCategorySection.css";

interface MistakeCategorySectionProps {
  frequentWrongCategories: FrequentWrongCategory[];
}

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
          {frequentWrongCategories.slice(0, 3).map((item, index) => {
            const level = (index + 1) as 1 | 2 | 3;

            return (
              <MistakeCategoryItem
                key={item.category}
                iconUrl={item.iconUrl}
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
