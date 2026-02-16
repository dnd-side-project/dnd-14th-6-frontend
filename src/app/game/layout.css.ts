import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  minHeight: "100vh",
  backgroundImage: vars.gradient.bg,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const content = style({
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginInline: "auto",
  paddingInline: vars.space.space_48,
});
