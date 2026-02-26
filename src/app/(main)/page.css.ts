import { style } from "@vanilla-extract/css";

export const pageContainer = style({
  position: "relative",
  width: "100%",
  overflowX: "hidden",
});

export const planetImage = style({
  position: "absolute",
  top: "10rem",
  right: "-22.5vw",
  width: "62.5vw",
  height: "auto",
  pointerEvents: "none",
});

export const heroViewport = style({
  minHeight: "100svh",
  paddingTop: "10.4rem",
  paddingLeft: "10rem",
  paddingRight: "10rem",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  zIndex: 1,
});

export const topSpacer = style({ flex: 7 });
export const bottomSpacer = style({ flex: 10 });

export const content = style({
  position: "relative",
  zIndex: 1,
});
