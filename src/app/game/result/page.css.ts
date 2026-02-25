import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  paddingTop: "6.6rem",
  paddingBottom: "5.6rem",
  height: "100vh",
  boxSizing: "border-box",
});

export const backgroundImageWrapper = style({
  position: "absolute",
  top: 0,
  left: "-4.8rem",
  right: "-4.8rem",
  bottom: 0,
  pointerEvents: "none",
});

export const backgroundImage = style({
  objectFit: "cover",
  objectPosition: "top",
});

export const contentWrapper = style({
  flex: 1,
  minHeight: 0,
  display: "flex",
  flexDirection: "row",
  gap: "1.6rem",
});

export const rightContent = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
  minHeight: 0,
  minWidth: 0,
});

export const problemDetailSection = style({
  flex: 1,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
});

export const bottomRow = style({
  display: "flex",
  gap: "1.6rem",
  flexShrink: 0,
  height: "28.3rem",
});

export const statsColumn = style({
  minWidth: "27.7rem",
  flexShrink: 0,
  alignSelf: "stretch",
});
