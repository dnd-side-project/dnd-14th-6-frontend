import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  isolation: "isolate",
  backgroundColor: vars.color.black,
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  overflow: "hidden",
});

export const backgroundImage = style({
  objectFit: "cover",
  objectPosition: "top center",
  zIndex: -1,
  pointerEvents: "none",
});

export const contentStyle = style({
  marginTop: "10.4rem",
  height: "calc(100vh - 10.4rem)",
});
