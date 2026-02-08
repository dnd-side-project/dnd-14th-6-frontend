import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

export const header = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "5.2rem",
  padding: "0 4.42rem 0 2.4rem",
  backgroundColor: vars.color.coolgrey_210,
  borderStyle: "solid",
  borderWidth: "1px 0",
  borderImage:
    "linear-gradient(to right, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.225) 18%, rgba(255, 255, 255, 0.15) 89%, rgba(255, 255, 255, 0.3) 100%) 1",
  position: "sticky",
  top: 0,
  zIndex: 1,
});

export const column = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  position: "relative",
});

export const sortButton = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 0,
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
});

export const sortIcon = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.15s ease",
  },
  variants: {
    active: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0.25,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
