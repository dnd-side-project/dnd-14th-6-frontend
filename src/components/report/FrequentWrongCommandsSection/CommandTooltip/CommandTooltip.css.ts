import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const tooltipWrapper = style({
  position: "absolute",
  zIndex: 10,
  backgroundColor: vars.color.coolgrey_180,
  borderRadius: "12px",
  padding: "1.2rem 1.8rem",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  pointerEvents: "none",
  whiteSpace: "nowrap",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "0.8px",
      background: vars.gradient.glass_outstroke,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      pointerEvents: "none",
    },
  },
});

export const contentRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4.3rem",
});
