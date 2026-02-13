import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "6rem",
  paddingLeft: "2.8rem",
  paddingRight: "3.7rem",
  borderRadius: vars.radius.m,
});

export const rankHeader = style({
  width: "3.6rem",
  textAlign: "center",
});
