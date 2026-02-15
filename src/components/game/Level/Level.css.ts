import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const level = style({
  background: vars.gradient.game_status_bar,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  filter: "drop-shadow(0px 1px 30px rgba(98, 235, 254, 0.83))",
});
