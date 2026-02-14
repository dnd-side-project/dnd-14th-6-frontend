import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  width: "100%",
  height: 3,
});

const lineBase = style({
  position: "absolute",
  inset: 0,
  opacity: 0.53,
  borderRadius: vars.radius.s,
});

export const line = styleVariants({
  default: [
    lineBase,
    {
      backgroundImage: vars.gradient.game_deadline_default,
      boxShadow: vars.effect.game_deadline_default,
    },
  ],
  error: [
    lineBase,
    {
      backgroundImage: vars.gradient.game_deadline_error,
      boxShadow: vars.effect.game_deadline_error,
    },
  ],
});
