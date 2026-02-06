import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const footer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.9rem",
  width: "100%",
  paddingTop: "2.9rem",
});

export const divider = style({
  width: "30rem",
  height: "1px",
  backgroundColor: vars.color.coolgrey_120,
});
