import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  isolation: "isolate",
  backgroundColor: vars.color.black,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const backgroundImage = style({
  objectFit: "cover",
  objectPosition: "top center",
  zIndex: -1,
  pointerEvents: "none",
});

export const contentStyle = style({
  flex: 1,
});
