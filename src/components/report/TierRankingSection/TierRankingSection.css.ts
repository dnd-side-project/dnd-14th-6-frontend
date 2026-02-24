import { style } from "@vanilla-extract/css";
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
  gap: "3.9rem",
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
});

export const imagePlaceholder = style({
  width: "100%",
  height: "14.8rem",
  position: "relative",
});
