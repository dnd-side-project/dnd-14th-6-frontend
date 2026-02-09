"use client";

import { useState } from "react";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import type { FrequentWrongCommand } from "@/types/report";
import DashboardCard from "../DashboardCard/DashboardCard";
import FrequentWrongCommandsDonutChart from "./CommandsDonutChart/FrequentWrongCommandsDonutChart";
import CommandsTable from "./CommandsTable/CommandsTable";
import * as styles from "./FrequentWrongCommandsSection.css";

interface FrequentWrongCommandsSectionProps {
  frequentWrongCommands: FrequentWrongCommand[];
}

export default function FrequentWrongCommandsSection({
  frequentWrongCommands,
}: FrequentWrongCommandsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <DashboardCard className={styles.card}>
      <Flex direction="column" gap={3} width="100%">
        <Text variant="heading4" color="coolgrey_40">
          자주 틀린 명령어
        </Text>
        <FrequentWrongCommandsDonutChart
          commands={frequentWrongCommands}
          hoveredIndex={hoveredIndex}
          onHoverIndex={setHoveredIndex}
        />
        <CommandsTable
          commands={frequentWrongCommands}
          hoveredIndex={hoveredIndex}
          onHoverIndex={setHoveredIndex}
        />
      </Flex>
    </DashboardCard>
  );
}
