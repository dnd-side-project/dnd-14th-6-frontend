import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const popoverWrapper = style({
  position: "absolute",
  zIndex: 10,
  backgroundColor: vars.color.coolgrey_180,
  borderRadius: "12px",
  padding: "1.2rem 1.8rem",
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
  pointerEvents: "none",
  whiteSpace: "nowrap",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "0.8px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.21) 75%, rgba(255,255,255,0.455) 88%, rgba(255,255,255,0.7) 100%)",
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
