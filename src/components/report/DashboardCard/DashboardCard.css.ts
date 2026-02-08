import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const card = style({
  position: "relative",
  backgroundColor: vars.color.coolgrey_60,
  borderRadius: vars.radius.l,
  padding: "3.2rem",
  backdropFilter: "blur(2px)",
  transition: "box-shadow 0.2s ease, backdrop-filter 0.2s ease",
  ":hover": {
    boxShadow: "inset 0px -7px 26.5px 0px rgba(98, 235, 254, 0.27)",
    backdropFilter: "blur(5.8px)",
  },
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "0.5px",
      background: vars.gradient.glass_outstroke,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      transition: "background 0.2s ease, padding 0.2s ease",
      pointerEvents: "none",
    },
    "&:hover::before": {
      padding: "1px",
      background: `linear-gradient(90deg, ${vars.color.primary_default} 0%, ${vars.color.primary_50} 100%)`,
    },
  },
});
