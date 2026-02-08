import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

export const container = style({
  width: "100%",
});

export const summaryRow = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "1.6rem 1.42rem 1.6rem 0.7rem",
  cursor: "pointer",
  background: "none",
  border: "none",
  textAlign: "left",
});

export const cell = style({
  flexShrink: 0,
});

export const arrowIcon = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "transform 0.2s ease",
  },
  variants: {
    expanded: {
      true: {
        transform: "rotate(180deg)",
      },
      false: {
        transform: "rotate(0deg)",
      },
    },
  },
  defaultVariants: {
    expanded: false,
  },
});

export const divider = style({
  width: "100%",
  height: "1px",
  backgroundColor: vars.color.coolgrey_110,
});
