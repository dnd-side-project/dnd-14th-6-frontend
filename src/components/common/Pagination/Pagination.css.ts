import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "1.48rem",
});

export const navigationButton = style({
  color: vars.color.coolgrey_100,
  background: "none",
  border: "none",
  cursor: "pointer",
  borderRadius: vars.radius.xs,
  padding: "0.1rem 1.42rem",
  height: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  selectors: {
    "&:disabled": {
      cursor: "default",
      opacity: 0.4,
    },
  },
});

export const pageButton = recipe({
  base: {
    width: "3rem",
    height: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radius.xs,
    background: "none",
    border: "0.5px solid transparent",
    cursor: "pointer",
    padding: 0,
  },
  variants: {
    selected: {
      true: {
        color: vars.color.coolgrey_40,
        borderColor: vars.color.coolgrey_20,
      },
      false: {
        color: vars.color.coolgrey_80,
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});
