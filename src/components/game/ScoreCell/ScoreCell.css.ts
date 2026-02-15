import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  width: 120,
  paddingBottom: 7,
  textAlign: "right",
});

export const score = style({
  background: vars.gradient.game_status_bar,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: `drop-shadow(${vars.effect.game_glow})`,
});
