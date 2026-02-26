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

export const video = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
