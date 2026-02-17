import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

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

export const phaseWrapper = style({
  maxWidth: 480,
  margin: "80px auto",
  textAlign: "center",
});

export const phaseTitle = style({
  fontSize: vars.typography.fontSize[32],
  fontWeight: vars.typography.fontWeight[700],
  marginBottom: 12,
});

export const phaseDescription = style({
  color: vars.color.coolgrey_80,
  fontSize: vars.typography.fontSize[16],
  marginBottom: 32,
});

export const btn = style({
  padding: "12px 24px",
  background: vars.color.coolgrey_180,
  color: vars.color.coolgrey_10,
  border: "none",
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
  cursor: "pointer",
});
