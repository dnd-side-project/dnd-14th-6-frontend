import { style } from "@vanilla-extract/css";

export const pageWrapper = style({
  width: "100%",
  height: "100%",
});

export const title = style({
  textAlign: "center",
  whiteSpace: "pre-line",
  position: "relative",
  zIndex: 1,
});

export const planetSection = style({
  position: "relative",
  flex: 1,
  width: "100%",
});

export const circleImage = style({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(calc(-50% - 7.35rem), -50%)",
  width: "53.4rem",
  height: "53.4rem",
  pointerEvents: "none",
});

export const planetImage = style({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "39.1rem",
  height: "auto",
  pointerEvents: "none",
});
