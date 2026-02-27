import { style } from "@vanilla-extract/css";

export const content = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "2.2rem 4.8rem 0",
});

export const tabArea = style({
  paddingLeft: "1.8rem",
});

export const topRankingArea = style({
  marginTop: "4.4rem",
});

export const planetSection = style({
  position: "relative",
  overflow: "hidden",
  marginTop: "-25.42vw",
  zIndex: 0,
});

export const planetImage = style({
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  width: "130%",
  maxWidth: "none",
  height: "auto",
  zIndex: 0,
});

export const rankingListArea = style({
  position: "relative",
  zIndex: 1,
  padding: "47.26vw 4.8rem 16rem",
});
