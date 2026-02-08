import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const mark = style({
  position: "relative",
  backgroundColor: "transparent",
  color: "inherit",
  isolation: "isolate",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "-0.1rem -0.1rem",
      backgroundColor: vars.color.primary_default,
      opacity: 0.5,
      mixBlendMode: "hard-light",
      zIndex: -1,
    },
  },
});
