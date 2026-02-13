import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

export const tab = recipe({
  base: {
    position: "relative",
    appearance: "none",
    padding: "0.4rem 0.8rem",
    background: "transparent",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  variants: {
    active: {
      true: {
        selectors: {
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "0.1rem",
            width: "4.4rem",
            height: "0.3rem",
            backgroundColor: vars.color.coolgrey_40,
            borderRadius: vars.radius.max,
          },
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
