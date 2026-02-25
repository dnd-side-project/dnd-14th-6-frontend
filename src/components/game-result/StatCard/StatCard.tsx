import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";

import ResultCard from "../ResultCard/ResultCard";
import * as styles from "./StatCard.css";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  isBlurred?: boolean;
}

export default function StatCard({
  title,
  value,
  subtitle,
  isBlurred,
}: StatCardProps) {
  return (
    <ResultCard className={styles.card}>
      <Flex direction="column" gap={2.4}>
        <Text variant="body1" color="coolgrey_40">
          {title}
        </Text>
        <div className={isBlurred ? styles.valueRowBlurred : styles.valueRow}>
          <Text variant="display6" color="coolgrey_10">
            {value}
          </Text>
          {subtitle && (
            <Text variant="body8" color="primary_200">
              {subtitle}
            </Text>
          )}
        </div>
      </Flex>
    </ResultCard>
  );
}
