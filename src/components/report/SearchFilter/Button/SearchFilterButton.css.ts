import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const searchFilterButton = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "8.5rem",
    height: "4.1rem",
    borderRadius: vars.radius.s,
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "transform 0.2s ease",
    transformOrigin: "center",

    ":active": {
      transform: "scale(1.0976)",
    },
  },

  variants: {
    variant: {
      ok: {
        background: vars.gradient.main_accent,
        color: vars.color.coolgrey_250,
      },
      reset: {
        background: "transparent",
        border: `1px solid ${vars.color.coolgrey_20}`,
        color: vars.color.coolgrey_20,
      },
    },
  },

  defaultVariants: {
    variant: "ok",
  },
});
