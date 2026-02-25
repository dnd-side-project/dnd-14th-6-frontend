import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const overlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
  background: "none",
  border: "none",
  borderRadius: vars.radius.l,
  cursor: "pointer",
  zIndex: 1,
});
