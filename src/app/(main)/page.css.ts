import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  position: "relative",
  width: "100%",
  overflowX: "hidden",
});

export const planetImage = style({
  position: "absolute",
  top: "8rem",
  right: "-22.5vw",
  width: "62.5vw",
  height: "auto",
  pointerEvents: "none",
});

export const content = style({
  position: "relative",
  zIndex: 1,
});
