import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const track = style({
  width: "100%",
  background: vars.gradient.game_timebar_bg,
  borderRadius: vars.radius.l,
  display: "flex",
  alignItems: "center",
});

const fillBase = style({
  height: 9,
  borderRadius: vars.radius.l,
  transition: "width 0.3s linear",
});

export const fill = styleVariants({
  default: [fillBase, { background: vars.gradient.main_accent }],
  red: [fillBase, { background: vars.gradient.game_error_left }],
});
