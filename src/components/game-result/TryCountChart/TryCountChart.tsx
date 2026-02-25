"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import Text from "@/components/common/Text/Text";
import type { ReportDto } from "@/types/api";

import LoginOverlay from "../LoginOverlay/LoginOverlay";
import ResultCard from "../ResultCard/ResultCard";
import ChartPopover from "./ChartPopover";
import * as styles from "./TryCountChart.css";

interface TryCountChartProps {
  reports: ReportDto[];
  onLoginClick?: () => void;
}

const PADDING_LEFT = 36;
const PADDING_TOP = 14;
const PADDING_BOTTOM = 35;
const PADDING_RIGHT = 16;
const POPOVER_HALF_WIDTH = 85;

export default function TryCountChart({
  reports,
  onLoginClick,
}: TryCountChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const data = useMemo(() => reports.map((r) => r.tryCount ?? 0), [reports]);

  const maxValue = useMemo(() => {
    const max = Math.max(...data);
    return Math.max(15, Math.ceil(max / 5) * 5);
  }, [data]);

  const yTicks = useMemo(() => {
    const ticks: number[] = [];
    for (let i = 0; i <= maxValue; i += 5) {
      ticks.push(i);
    }
    return ticks;
  }, [maxValue]);

  const chartWidth = svgSize.width - PADDING_LEFT - PADDING_RIGHT;
  const chartHeight = svgSize.height - PADDING_TOP - PADDING_BOTTOM;

  const getX = (index: number) => {
    if (data.length <= 1) return PADDING_LEFT;
    return PADDING_LEFT + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (value: number) => {
    return PADDING_TOP + chartHeight - (value / maxValue) * chartHeight;
  };

  const getPopoverTransform = (index: number) => {
    const x = getX(index);
    if (x < POPOVER_HALF_WIDTH) return "translateY(-100%)";
    if (x > svgSize.width - POPOVER_HALF_WIDTH)
      return "translate(-100%, -100%)";
    return "translate(-50%, -100%)";
  };

  const points = data.map((v, i) => `${getX(i)},${getY(v)}`).join(" ");

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSvgSize({ width, height });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ResultCard className={styles.wrapper}>
      {onLoginClick && <LoginOverlay onClick={onLoginClick} />}
      <Text variant="body1" color="coolgrey_40">
        문제별 시도 횟수
      </Text>

      <div
        className={`${styles.graphWrapper}${onLoginClick ? ` ${styles.contentBlurred}` : ""}`}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {svgSize.width > 0 && (
            <>
              {/* 수평 그리드선 + Y축 라벨 */}
              {yTicks.map((tick) => {
                const y = getY(tick);
                return (
                  <g key={tick}>
                    <line
                      x1={PADDING_LEFT}
                      y1={y}
                      x2={svgSize.width - PADDING_RIGHT}
                      y2={y}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth={1}
                    />
                    <text
                      x={PADDING_LEFT - 10}
                      y={y}
                      textAnchor="end"
                      dominantBaseline="middle"
                      fill="#9ea4aa"
                      fontSize={14}
                      fontFamily="Pretendard"
                      fontWeight={500}
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* 그라디언트 정의 */}
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#62EBFE" />
                  <stop offset="100%" stopColor="#B9F6FF" />
                </linearGradient>
              </defs>

              {/* 데이터 라인 */}
              <polyline
                points={points}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* 호버 영역 (각 데이터 포인트) */}
              {reports.map((report, i) => {
                const x = getX(i);
                const hitWidth =
                  data.length > 1 ? chartWidth / (data.length - 1) : chartWidth;
                return (
                  // biome-ignore lint/a11y/noStaticElementInteractions: SVG chart hit areas
                  <rect
                    key={`hit-${report.problemId}`}
                    x={x - hitWidth / 2}
                    y={PADDING_TOP}
                    width={hitWidth}
                    height={chartHeight}
                    fill="transparent"
                    onMouseEnter={() => setHoveredIndex(i)}
                  />
                );
              })}

              {/* X축 라벨 */}
              {reports.map((report, i) => {
                const x = getX(i);
                const isHovered = hoveredIndex === i;
                return (
                  <text
                    key={`label-${report.problemId}`}
                    x={x}
                    y={svgSize.height - 4}
                    textAnchor="middle"
                    fill={isHovered ? "#62ebfe" : "#9ea4aa"}
                    fontSize={14}
                    fontFamily="Pretendard"
                    fontWeight={500}
                  >
                    {i + 1}
                  </text>
                );
              })}
            </>
          )}
        </svg>

        {/* 호버 인디케이터 */}
        {hoveredIndex !== null && svgSize.width > 0 && (
          <>
            <div
              className={styles.hoverLine}
              style={{
                left: getX(hoveredIndex),
                top: getY(data[hoveredIndex]),
                height:
                  svgSize.height - PADDING_BOTTOM - getY(data[hoveredIndex]),
              }}
            />
            <div
              className={styles.hoverDot}
              style={{
                left: getX(hoveredIndex),
                top: getY(data[hoveredIndex]),
              }}
            />
            <ChartPopover
              index={hoveredIndex + 1}
              subCategory={reports[hoveredIndex].subCategory}
              tryCount={data[hoveredIndex]}
              style={{
                left: getX(hoveredIndex),
                top: getY(data[hoveredIndex]) - 16,
                transform: getPopoverTransform(hoveredIndex),
              }}
            />
          </>
        )}
      </div>
    </ResultCard>
  );
}
