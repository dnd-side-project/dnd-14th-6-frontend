import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  width: "100%",
  height: "1.1rem",
});

export const track = style({
  position: "absolute",
  inset: 0,
  borderRadius: vars.radius.max,
  backgroundColor: vars.color.coolgrey_70,
  opacity: 0.15,
});

export const fill = recipe({
  base: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "1.1rem",
    borderRadius: vars.radius.max,
  },
  variants: {
    level: {
      1: {
        background: vars.gradient.main_accent,
      },
      2: {
        background: vars.gradient.chart_level2,
        opacity: 0.7,
      },
      3: {
        background: vars.gradient.chart_level3,
        opacity: 0.5,
      },
    },
  },
  defaultVariants: {
    level: 1,
  },
});
