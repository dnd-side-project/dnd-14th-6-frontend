import Text from "@/components/common/Text/Text";
import { color } from "@/styles/tokens/color";
import * as styles from "./RankingGauge.css";

interface RankingGaugeProps {
  percentil?: number;
}

const OUTER_RADIUS = 109;
const INNER_RADIUS = 87;
const CORNER_RADIUS = 6;
const SVG_WIDTH = 218;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = 109;
const SVG_HEIGHT = CENTER_Y + 2;

const START_ANGLE = 270;
const END_ANGLE = 450;
const TOTAL_SWEEP = END_ANGLE - START_ANGLE;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeAnnularSector(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
  startCr: number,
  endCr = startCr,
): string {
  const maxStartCr = Math.min(startCr, (outerR - innerR) / 2);
  const maxEndCr = Math.min(endCr, (outerR - innerR) / 2);
  const sweep = endAngle - startAngle;

  const sOuterOff = Math.min(
    (maxStartCr / outerR) * (180 / Math.PI),
    sweep / 2,
  );
  const sInnerOff = Math.min(
    (maxStartCr / innerR) * (180 / Math.PI),
    sweep / 2,
  );
  const eOuterOff = Math.min((maxEndCr / outerR) * (180 / Math.PI), sweep / 2);
  const eInnerOff = Math.min((maxEndCr / innerR) * (180 / Math.PI), sweep / 2);

  const p1 = polarToCartesian(cx, cy, outerR - maxStartCr, startAngle);
  const p2 = polarToCartesian(cx, cy, outerR, startAngle + sOuterOff);
  const p3 = polarToCartesian(cx, cy, outerR, endAngle - eOuterOff);
  const p4 = polarToCartesian(cx, cy, outerR - maxEndCr, endAngle);
  const p5 = polarToCartesian(cx, cy, innerR + maxEndCr, endAngle);
  const p6 = polarToCartesian(cx, cy, innerR, endAngle - eInnerOff);
  const p7 = polarToCartesian(cx, cy, innerR, startAngle + sInnerOff);
  const p8 = polarToCartesian(cx, cy, innerR + maxStartCr, startAngle);

  const outerLargeArc = sweep - sOuterOff - eOuterOff > 180 ? 1 : 0;
  const innerLargeArc = sweep - sInnerOff - eInnerOff > 180 ? 1 : 0;

  return [
    `M ${p1.x} ${p1.y}`,
    maxStartCr > 0
      ? `A ${maxStartCr} ${maxStartCr} 0 0 1 ${p2.x} ${p2.y}`
      : `L ${p2.x} ${p2.y}`,
    `A ${outerR} ${outerR} 0 ${outerLargeArc} 1 ${p3.x} ${p3.y}`,
    maxEndCr > 0
      ? `A ${maxEndCr} ${maxEndCr} 0 0 1 ${p4.x} ${p4.y}`
      : `L ${p4.x} ${p4.y}`,
    `L ${p5.x} ${p5.y}`,
    maxEndCr > 0
      ? `A ${maxEndCr} ${maxEndCr} 0 0 1 ${p6.x} ${p6.y}`
      : `L ${p6.x} ${p6.y}`,
    `A ${innerR} ${innerR} 0 ${innerLargeArc} 0 ${p7.x} ${p7.y}`,
    maxStartCr > 0
      ? `A ${maxStartCr} ${maxStartCr} 0 0 1 ${p8.x} ${p8.y}`
      : `L ${p8.x} ${p8.y}`,
    "Z",
  ].join(" ");
}

const TRACK_PATH = describeAnnularSector(
  CENTER_X,
  CENTER_Y,
  INNER_RADIUS,
  OUTER_RADIUS,
  START_ANGLE,
  END_ANGLE,
  CORNER_RADIUS,
);

export default function RankingGauge({ percentil }: RankingGaugeProps) {
  const hasPercentil = percentil != null;
  const fillRatio = hasPercentil ? (100 - percentil) / 100 : 0;
  const displayPercent = hasPercentil ? Math.round(percentil) : 0;

  const fillEndAngle = START_ANGLE + TOTAL_SWEEP * fillRatio;
  const fillPath =
    fillRatio > 0
      ? describeAnnularSector(
          CENTER_X,
          CENTER_Y,
          INNER_RADIUS,
          OUTER_RADIUS,
          START_ANGLE,
          fillEndAngle,
          CORNER_RADIUS,
          0,
        )
      : "";

  return (
    <div className={styles.container}>
      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className={styles.svg}
        aria-label={`랭킹 게이지: Top ${displayPercent}%`}
      >
        <defs>
          <linearGradient id="rankingGaugeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color.primary_250} />
            <stop offset="100%" stopColor={color.primary_default} />
          </linearGradient>
        </defs>

        <path d={TRACK_PATH} fill={color.coolgrey_110} />

        {fillRatio > 0 && (
          <path d={fillPath} fill="url(#rankingGaugeGradient)" />
        )}
      </svg>

      <div className={styles.labels}>
        <Text variant="caption2" color="coolgrey_80">
          Low
        </Text>
        <Text variant="caption2" color="coolgrey_80">
          High
        </Text>
      </div>

      {hasPercentil && (
        <p className={styles.percentText}>{`Top ${displayPercent}%`}</p>
      )}
    </div>
  );
}
