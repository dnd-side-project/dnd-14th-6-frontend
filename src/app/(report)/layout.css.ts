import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  backgroundColor: vars.color.black,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const backgroundWrapper = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
});

export const backgroundImage = style({
  objectFit: "cover",
  objectPosition: "top",
});

export const foreground = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const contentStyle = style({
  flex: 1,
});
