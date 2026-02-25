import { style } from "@vanilla-extract/css";

export const card = style({
  flex: 1,
});

export const valueRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  width: "100%",
});

export const valueRowBlurred = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  width: "100%",
  filter: "blur(8px)",
  userSelect: "none",
});
