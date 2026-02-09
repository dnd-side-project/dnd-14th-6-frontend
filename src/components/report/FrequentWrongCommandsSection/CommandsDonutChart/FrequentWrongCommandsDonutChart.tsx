"use client";

import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import { color } from "@/styles/tokens/color";
import { gradient } from "@/styles/tokens/gradient";
import type { FrequentWrongCommand } from "@/types/report";
import CommandTooltip from "../CommandTooltip/CommandTooltip";
import * as styles from "./FrequentWrongCommandsDonutChart.css";

interface FrequentWrongCommandsDonutChartProps {
  commands: FrequentWrongCommand[];
  hoveredIndex: number | null;
  onHoverIndex: (index: number | null) => void;
}

const SVG_SIZE = 245;
const SVG_CENTER = SVG_SIZE / 2;
const OUTER_RADIUS = 115;
const INNER_RADIUS = 85;
const GAP_DEGREES = 2.5;
const BADGE_RADIUS = OUTER_RADIUS;
const HOVER_EXPAND = 5;
const CORNER_RADIUS = 6;

const SVG_CONTAINER_LEFT = 50;
const PIE_CENTER_X = SVG_CONTAINER_LEFT + SVG_CENTER;
const PIE_CENTER_Y = SVG_CENTER;

const DEFAULT_BADGE_SIZE = 22.94;
const HOVERED_BADGE_SIZE = 30;
const TOOLTIP_GAP = 6;

function parseGradientStops(gradientStr: string) {
  const colorStopRegex = /(#[0-9a-fA-F]{6}|rgba?\([^)]+\))\s+([\d.]+%?)/g;
  const stops: { color: string; offset: string }[] = [];
  let match = colorStopRegex.exec(gradientStr);
  while (match) {
    stops.push({ color: match[1], offset: match[2] });
    match = colorStopRegex.exec(gradientStr);
  }
  return stops;
}

const GRADIENT_DEFS = [
  { id: "donutLevel2", stops: parseGradientStops(gradient.chart_level2) },
  { id: "donutLevel3", stops: parseGradientStops(gradient.chart_level3) },
  { id: "donutAccent", stops: parseGradientStops(gradient.main_accent) },
];

const CHART_GRADIENTS = {
  level2Id: GRADIENT_DEFS[0].id,
  level3Id: GRADIENT_DEFS[1].id,
  accentId: GRADIENT_DEFS[2].id,
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeRoundedAnnularSector(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
  cr: number,
) {
  const maxCr = Math.min(cr, (outerR - innerR) / 2);
  const outerAngleOffset = (maxCr / outerR) * (180 / Math.PI);
  const innerAngleOffset = (maxCr / innerR) * (180 / Math.PI);
  const sweep = endAngle - startAngle;
  const oOff = Math.min(outerAngleOffset, sweep / 2);
  const iOff = Math.min(innerAngleOffset, sweep / 2);

  const p1 = polarToCartesian(cx, cy, outerR - maxCr, startAngle);
  const p2 = polarToCartesian(cx, cy, outerR, startAngle + oOff);
  const p3 = polarToCartesian(cx, cy, outerR, endAngle - oOff);
  const p4 = polarToCartesian(cx, cy, outerR - maxCr, endAngle);
  const p5 = polarToCartesian(cx, cy, innerR + maxCr, endAngle);
  const p6 = polarToCartesian(cx, cy, innerR, endAngle - iOff);
  const p7 = polarToCartesian(cx, cy, innerR, startAngle + iOff);
  const p8 = polarToCartesian(cx, cy, innerR + maxCr, startAngle);

  const outerLargeArc = sweep - 2 * oOff > 180 ? 1 : 0;
  const innerLargeArc = sweep - 2 * iOff > 180 ? 1 : 0;

  return [
    `M ${p1.x} ${p1.y}`,
    `A ${maxCr} ${maxCr} 0 0 1 ${p2.x} ${p2.y}`,
    `A ${outerR} ${outerR} 0 ${outerLargeArc} 1 ${p3.x} ${p3.y}`,
    `A ${maxCr} ${maxCr} 0 0 1 ${p4.x} ${p4.y}`,
    `L ${p5.x} ${p5.y}`,
    `A ${maxCr} ${maxCr} 0 0 1 ${p6.x} ${p6.y}`,
    `A ${innerR} ${innerR} 0 ${innerLargeArc} 0 ${p7.x} ${p7.y}`,
    `A ${maxCr} ${maxCr} 0 0 1 ${p8.x} ${p8.y}`,
    "Z",
  ].join(" ");
}

function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
}

function isAngleBetween(angle: number, start: number, end: number): boolean {
  const a = normalizeAngle(angle);
  const s = normalizeAngle(start);
  const e = normalizeAngle(end);
  if (s <= e) {
    return a >= s && a <= e;
  }
  return a >= s || a <= e;
}

function getAngleFromCenter(cx: number, cy: number, x: number, y: number) {
  const dx = x - cx;
  const dy = y - cy;
  let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
  if (angle < 0) angle += 360;
  return angle;
}

function getDistanceFromCenter(cx: number, cy: number, x: number, y: number) {
  return Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
}

export default function FrequentWrongCommandsDonutChart({
  commands,
  hoveredIndex,
  onHoverIndex,
}: FrequentWrongCommandsDonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const totalCount = useMemo(
    () => commands.reduce((sum, cmd) => sum + cmd.wrongCount, 0),
    [commands],
  );

  const segments = useMemo(() => {
    const totalGap = GAP_DEGREES * commands.length;
    const availableDegrees = 360 - totalGap;

    const firstProportion =
      totalCount > 0 ? commands[0].wrongCount / totalCount : 0;
    const firstSweep = firstProportion * availableDegrees;
    let currentAngle = -(firstSweep / 2);

    return commands.map((cmd, index) => {
      const proportion = totalCount > 0 ? cmd.wrongCount / totalCount : 0;
      const sweepAngle = proportion * availableDegrees;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sweepAngle;
      const midAngle = startAngle + sweepAngle / 2;

      currentAngle = endAngle + GAP_DEGREES;

      const isFirst = index === 0;
      const isHovered = hoveredIndex === index;
      const hasHover = hoveredIndex !== null;

      let fillId: string;
      if (isHovered) {
        fillId = `url(#${CHART_GRADIENTS.accentId})`;
      } else if (hasHover) {
        fillId = color.darkgreen_150;
      } else if (isFirst) {
        fillId = `url(#${CHART_GRADIENTS.level2Id})`;
      } else {
        fillId = `url(#${CHART_GRADIENTS.level3Id})`;
      }

      return {
        command: cmd,
        startAngle,
        endAngle,
        midAngle,
        sweepAngle,
        fillId,
        isHovered,
        index,
      };
    });
  }, [commands, totalCount, hoveredIndex]);

  const findSegmentAtPoint = useCallback(
    (clientX: number, clientY: number): number | null => {
      if (!svgRef.current) return null;

      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = SVG_SIZE / rect.width;
      const scaleY = SVG_SIZE / rect.height;
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      const dist = getDistanceFromCenter(SVG_CENTER, SVG_CENTER, x, y);
      if (
        dist < INNER_RADIUS - HOVER_EXPAND ||
        dist > OUTER_RADIUS + HOVER_EXPAND
      )
        return null;

      const angle = getAngleFromCenter(SVG_CENTER, SVG_CENTER, x, y);

      for (const seg of segments) {
        if (isAngleBetween(angle, seg.startAngle, seg.endAngle)) {
          return seg.index;
        }
      }
      return null;
    },
    [segments],
  );

  const handleSvgMouseMove = useCallback(
    (e: MouseEvent<SVGSVGElement>) => {
      const idx = findSegmentAtPoint(e.clientX, e.clientY);
      onHoverIndex(idx);
    },
    [findSegmentAtPoint, onHoverIndex],
  );

  const handleSvgMouseLeave = useCallback(() => {
    onHoverIndex(null);
  }, [onHoverIndex]);

  const getBadgePosition = useCallback((midAngle: number) => {
    const pos = polarToCartesian(
      PIE_CENTER_X,
      PIE_CENTER_Y,
      BADGE_RADIUS,
      midAngle,
    );
    return { left: pos.x, top: pos.y };
  }, []);

  const getTooltipPosition = useCallback(
    (midAngle: number): CSSProperties => {
      const badgePos = getBadgePosition(midAngle);
      const badgeHalf = HOVERED_BADGE_SIZE / 2;
      const isRightSide = badgePos.left > PIE_CENTER_X;

      if (isRightSide) {
        return {
          left: `${(badgePos.left + badgeHalf + TOOLTIP_GAP) / 10}rem`,
          top: `${badgePos.top / 10}rem`,
          transform: "translateY(-50%)",
        };
      }

      return {
        left: `${(badgePos.left - badgeHalf - TOOLTIP_GAP) / 10}rem`,
        top: `${badgePos.top / 10}rem`,
        transform: "translate(-100%, -50%)",
      };
    },
    [getBadgePosition],
  );

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.svgContainer}>
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          onMouseMove={handleSvgMouseMove}
          onMouseLeave={handleSvgMouseLeave}
        >
          <defs>
            {GRADIENT_DEFS.map((def) => (
              <linearGradient
                key={def.id}
                id={def.id}
                x1="0"
                y1="0"
                x2={String(SVG_SIZE)}
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                {def.stops.map((stop) => (
                  <stop
                    key={stop.offset}
                    offset={stop.offset}
                    stopColor={stop.color}
                  />
                ))}
              </linearGradient>
            ))}
          </defs>

          {segments.map((seg) => {
            const outerR = seg.isHovered
              ? OUTER_RADIUS + HOVER_EXPAND
              : OUTER_RADIUS;
            const innerR = seg.isHovered
              ? INNER_RADIUS - HOVER_EXPAND
              : INNER_RADIUS;
            return (
              <path
                key={seg.index}
                d={describeRoundedAnnularSector(
                  SVG_CENTER,
                  SVG_CENTER,
                  innerR,
                  outerR,
                  seg.startAngle,
                  seg.endAngle,
                  CORNER_RADIUS,
                )}
                fill={seg.fillId}
                className={styles.segment}
              />
            );
          })}
        </svg>
      </div>

      {segments.map((seg) => {
        const badgePos = getBadgePosition(seg.midAngle);
        const isHovered = seg.isHovered;
        const size = isHovered ? HOVERED_BADGE_SIZE : DEFAULT_BADGE_SIZE;

        return (
          <Flex
            key={seg.index}
            align="center"
            justify="center"
            className={styles.numberBadge}
            style={{
              left: `${badgePos.left / 10}rem`,
              top: `${badgePos.top / 10}rem`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            onMouseEnter={() => onHoverIndex(seg.index)}
            onMouseLeave={() => onHoverIndex(null)}
          >
            <Text
              as="span"
              variant={isHovered ? "subtitle2" : "caption5"}
              color="coolgrey_10"
            >
              {seg.index + 1}
            </Text>
          </Flex>
        );
      })}

      {hoveredIndex !== null && segments[hoveredIndex] && (
        <CommandTooltip
          command={segments[hoveredIndex].command}
          style={getTooltipPosition(segments[hoveredIndex].midAngle)}
        />
      )}
    </div>
  );
}
