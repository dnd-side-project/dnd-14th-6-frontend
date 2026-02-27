import { keyframes, style, styleVariants } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

// ── Playing ──

// 피그마 기준: 1440×900, top bar y=34, foulLine y=653 (653/900 ≈ 72.56vh)

export const playingWrapper = style({
  position: "relative",
  isolation: "isolate",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  paddingTop: 34,
  overflow: "hidden",
  marginInline: `calc(-1 * ${vars.space.space_48})`,
  paddingInline: vars.space.space_48,
});

export const backgroundVideo = style({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  objectFit: "cover",
  pointerEvents: "none",
});

export const gameArea = style({
  flex: 1,
});

// ── 산성비 낙하 카드 ──

const fallDown = keyframes({
  from: { top: "4vh", opacity: 0 },
  "5%": { opacity: 1 },
  to: { top: "calc(72.56vh - 50px)", opacity: 1 },
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
  animation: `${fallDown} 17s linear forwards`,
});

// 3개 수평 레인 (균등 분배, 카드 너비 ~25vw 고려)
export const fallingCardLane = styleVariants({
  0: [fallingCardBase, { left: "7vw" }],
  1: [fallingCardBase, { left: "39vw" }],
  2: [fallingCardBase, { left: "71vw" }],
});

// ── 정답 이펙트 ──

const fadeOut = keyframes({
  "0%": { opacity: 1, transform: "scale(1)" },
  "20%": { opacity: 1, transform: "scale(1.03)" },
  "100%": { opacity: 0, transform: "scale(0.95)" },
});

export const solvingCard = style({
  animation: `${fadeOut} 800ms ease-in-out 200ms forwards`,
  pointerEvents: "none",
});

// ── 만료 이펙트 ──

const expireFadeOut = keyframes({
  from: { opacity: 1, transform: "translateY(0)" },
  to: { opacity: 0, transform: "translateY(25px)" },
});

export const expiringCard = style({
  animation: `${expireFadeOut} 600ms ease-in forwards`,
  pointerEvents: "none",
});

// ── 오답 이펙트 ──

const shake = keyframes({
  "0%, 100%": { transform: "translateX(0)" },
  "20%": { transform: "translateX(-4px)" },
  "40%": { transform: "translateX(4px)" },
  "60%": { transform: "translateX(-3px)" },
  "80%": { transform: "translateX(3px)" },
});

export const shakingCard = style({
  animation: `${shake} 400ms ease-in-out`,
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
  minHeight: 62,
});
