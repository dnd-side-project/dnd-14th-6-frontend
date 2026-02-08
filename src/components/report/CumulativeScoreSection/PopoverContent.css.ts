import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const popover = style({
  position: "absolute",
  top: 0,
  transform: "translateX(-50%)",
  pointerEvents: "none",
  width: "19rem",
  backgroundColor: vars.color.coolgrey_180,
  borderRadius: vars.radius.m,
  paddingTop: "1.8rem",
  paddingLeft: "1.8rem",
  paddingRight: "2rem",
  paddingBottom: "0.9rem",
  backdropFilter: "blur(30px)",
  zIndex: 10,
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "0.8px",
      background:
        "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0.65) 88%, rgba(255,255,255,1) 100%)",
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      maskComposite: "exclude",
      opacity: 0.7,
      pointerEvents: "none",
    },
  },
});

export const headerDivider = style({
  position: "relative",
  paddingBottom: "0.8rem",
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "0.5px",
      opacity: 0.7,
      background:
        "linear-gradient(to right, rgba(255,255,255,0.05) 0%, rgba(255,255,255,1) 25%, rgba(255,255,255,0.65) 61%, rgba(255,255,255,0.8) 83%, rgba(255,255,255,0.05) 100%)",
    },
  },
});
