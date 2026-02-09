import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const linkWrapper = style({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  minWidth: 0,
});

export const cardFullHeight = style({
  flex: 1,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "3.1rem",
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
});

export const imagePlaceholder = style({
  width: "100%",
  height: "14.8rem",
  backgroundColor: vars.color.coolgrey_110,
  borderRadius: vars.radius.s,
  overflow: "hidden",
  position: "relative",
});
