import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const section = style({
  position: "relative",
  width: "100%",
  maxWidth: "74rem",
});

export const verticalLine = style({
  position: "absolute",
  left: "2.4rem",
  top: 0,
  bottom: 0,
  width: "2px",
  background: vars.color.coolgrey_110,
  pointerEvents: "none",
  opacity: 0.4,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
});

export const lineSlot = style({
  minHeight: "2.7rem",
});

const cursorBlink = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0 },
});

export const cursorRow = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: "2.7rem",
});

export const cursorNumberArea = style({
  width: "1.9rem",
  flexShrink: 0,
  textAlign: "left",
});

export const cursorArea = style({
  marginLeft: "0.8rem",
});

export const cursorBlock = style({
  width: "4px",
  height: "2.3rem",
  backgroundColor: vars.color.primary_200,
  animation: `${cursorBlink} 1.06s step-end infinite`,
});

export const headerGap = style({
  marginTop: "3.7rem",
});

export const sectionGap = style({
  marginTop: "2rem",
});
