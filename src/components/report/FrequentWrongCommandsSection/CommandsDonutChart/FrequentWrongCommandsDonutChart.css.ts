import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const chartWrapper = style({
  position: "relative",
  width: "35.2rem",
  height: "27rem",
  margin: "0 auto",
});

export const svgContainer = style({
  position: "absolute",
  left: "5rem",
  width: "24.5rem",
  height: "24.5rem",
});

export const svg = style({
  width: "100%",
  height: "100%",
  overflow: "visible",
});

export const numberBadge = style({
  position: "absolute",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "width 0.15s ease, height 0.15s ease",
  transform: "translate(-50%, -50%)",
  pointerEvents: "auto",
  backgroundColor: vars.color.coolgrey_0,
  backdropFilter: "blur(8px) saturate(180%)",
  WebkitBackdropFilter: "blur(8px) saturate(180%)",
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
      pointerEvents: "none",
    },
  },
});
