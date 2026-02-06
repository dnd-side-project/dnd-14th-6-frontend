import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  backgroundColor: vars.color.coolgrey_260,
  display: "flex",
  height: "100vh",
});

export const contentStyle = style({
  flex: 1,
  overflowY: "auto",
});
