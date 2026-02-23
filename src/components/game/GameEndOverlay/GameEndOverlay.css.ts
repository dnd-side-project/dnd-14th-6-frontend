import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.color.coolgrey_190,
});

export const resultText = style({
  fontSize: "9.6rem",
  fontWeight: vars.typography.fontWeight[700],
  fontFamily: vars.typography.fontFamily.pre,
  color: vars.color.primary_default,
  textAlign: "center",
});
