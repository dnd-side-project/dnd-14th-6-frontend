import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  backgroundColor: vars.color.black,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const backgroundImage = style({
  objectFit: "cover",
  zIndex: 0,
  pointerEvents: "none",
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
