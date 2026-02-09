import { style } from "@vanilla-extract/css";

export const card = style({
  flex: 1,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  width: "100%",
});
