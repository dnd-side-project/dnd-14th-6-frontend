"use client";

import { type MouseEvent, useRef, useState } from "react";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import { vars } from "@/styles/theme.css";
import type { ScoreDetail } from "@/types/report";
import DashboardCard from "../DashboardCard/DashboardCard";
import * as styles from "./CumulativeScoreSection.css";
import PopoverContent from "./PopoverContent";

interface CumulativeScoreSectionProps {
  totalScore: number;
  scoreDetail: ScoreDetail[];
}

const BAR_GRADIENTS = [
  vars.gradient.main_accent,
  vars.gradient.chart_level2,
  vars.gradient.chart_level3,
];

const BAR_OPACITIES = [1, 0.7, 0.5];

const DIMMED_BG = vars.color.darkgreen_150;

export default function CumulativeScoreSection({
  totalScore,
  scoreDetail,
}: CumulativeScoreSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorX, setCursorX] = useState(0);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const formatScore = (score: number) => score.toLocaleString();

  const handleBarMouseMove = (e: MouseEvent, index: number) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredIndex(index);
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCursorX(e.clientX - rect.left);
    }
  };

  const handleBarMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 50);
  };

  return (
    <DashboardCard>
      <div ref={wrapperRef} className={styles.contentWrapper}>
        <Flex direction="column" gap={3} width="100%">
          <Flex direction="column" gap={3.5}>
            <Text variant="heading4" color="coolgrey_40">
              누적 점수
            </Text>
            <Text variant="display2" color="coolgrey_10">
              {formatScore(totalScore)}
            </Text>
          </Flex>

          <Flex gap={0.8} align="center" width="100%">
            {scoreDetail.map((detail, index) => {
              const isFirst = index === 0;
              const isLast = index === scoreDetail.length - 1;
              const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

              const gradient =
                BAR_GRADIENTS[index] ?? BAR_GRADIENTS[BAR_GRADIENTS.length - 1];
              const opacity =
                BAR_OPACITIES[index] ?? BAR_OPACITIES[BAR_OPACITIES.length - 1];

              const barPosition = isFirst
                ? "first"
                : isLast
                  ? "last"
                  : "middle";

              return (
                <Flex
                  key={detail.difficultyMode}
                  direction="column"
                  gap={0.2}
                  className={styles.barWrapper}
                  style={{
                    flex: `${detail.totalScore} 0 0%`,
                  }}
                  onMouseMove={(e) => handleBarMouseMove(e, index)}
                  onMouseLeave={handleBarMouseLeave}
                >
                  <div
                    className={styles.bar[barPosition]}
                    style={{
                      background: isDimmed ? DIMMED_BG : gradient,
                      opacity,
                    }}
                  />
                  <Text variant="body8" color="coolgrey_80">
                    {detail.difficultyMode}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Flex>

        {hoveredIndex !== null && (
          <PopoverContent
            difficultyMode={scoreDetail[hoveredIndex].difficultyMode}
            totalScore={scoreDetail[hoveredIndex].totalScore}
            categoryScores={scoreDetail[hoveredIndex].categoryScores}
            style={{
              left: `clamp(9.5rem, ${cursorX}px, calc(100% - 9.5rem))`,
            }}
          />
        )}
      </div>
    </DashboardCard>
  );
}
