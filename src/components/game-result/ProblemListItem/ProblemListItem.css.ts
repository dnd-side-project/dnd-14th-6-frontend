import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

export const item = recipe({
  base: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "3.6rem",
    padding: "0.8rem 2rem",
    borderRadius: vars.radius.m,
    cursor: "pointer",
    width: "100%",
    background: "none",
    border: "none",
    position: "relative",
  },
  variants: {
    selected: {
      false: {
        background: vars.color.coolgrey_200,
      },
      true: {
        background: vars.color.coolgrey_60,
        boxShadow: "inset 0px -7px 26.5px 0px rgba(98,235,254,0.27)",
        selectors: {
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            padding: "1px",
            background: vars.gradient.main_accent,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
        },
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});
