import { keyframes, style, styleVariants } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

// ── Playing ──

// 피그마 기준: 1440×900, top bar y=34, foulLine y=653 (653/900 ≈ 72.56vh)

export const playingWrapper = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  paddingTop: 34,
});

export const gameArea = style({
  flex: 1,
});

// ── 산성비 낙하 카드 ──

const fallDown = keyframes({
  from: { top: "4vh", opacity: 0 },
  "5%": { opacity: 1 },
  to: { top: "72.56vh", opacity: 1 },
});

export const fallingCardContainer = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
});

const fallingCardBase = style({
  position: "absolute",
  pointerEvents: "auto",
  animation: `${fallDown} 10s linear forwards`,
});

// 3개 수평 레인 (Figma 기준 X좌표)
export const fallingCardLane = styleVariants({
  0: [fallingCardBase, { left: "54.38vw" }],
  1: [fallingCardBase, { left: "11.81vw" }],
  2: [fallingCardBase, { left: "55.69vw" }],
});

// ── Foul Line / Bottom ──

export const foulLineArea = style({
  position: "fixed",
  left: 0,
  right: 0,
  top: "72.56vh",
  pointerEvents: "none",
});

export const bottomArea = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 40,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 28,
  paddingInline: vars.space.space_48,
});

export const problemText = style({
  ...fontStyles.body2,
  color: vars.color.coolgrey_10,
  textAlign: "center",
  maxWidth: 680,
});
