import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const container = style({
  position: "relative",
  width: "22.7rem",
  height: "14.2rem",
  margin: "0 auto",
});

export const svg = style({
  position: "absolute",
  top: 0,
  left: "0.25rem",
  width: "21.8rem",
  height: "11.1rem",
  overflow: "visible",
});

export const labels = style({
  position: "absolute",
  top: "11.1rem",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
});

export const percentText = style({
  position: "absolute",
  top: "6.8rem",
  left: "50%",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
  fontFamily: vars.typography.fontFamily.pre,
  fontWeight: vars.typography.fontWeight[600],
  fontSize: "2.4rem",
  lineHeight: vars.typography.lineHeight[27],
  letterSpacing: vars.typography.letterSpacing[100],
  color: vars.color.primary_default,
  textAlign: "center",
});
