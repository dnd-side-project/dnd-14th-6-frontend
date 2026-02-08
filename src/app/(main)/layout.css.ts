import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  backgroundColor: vars.color.black,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const contentStyle = style({
  flex: 1,
  paddingTop: "11.4rem",
});
