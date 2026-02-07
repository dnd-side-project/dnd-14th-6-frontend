import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const panel = style({
  backgroundColor: vars.color.coolgrey_220,
  borderRadius: vars.radius.l,
  padding: "3.2rem",
  boxShadow:
    "0px 3px 7.8px 0px rgba(13, 13, 14, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  overflow: "clip",
  backdropFilter: "blur(24px) saturate(1.4)",
  WebkitBackdropFilter: "blur(24px) saturate(1.4)",
  backgroundImage:
    "linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.04) 100%)",
});

export const category = style({
  width: "37.1rem",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
});

export const divider = style({
  width: "100%",
  height: "0.5px",
  background: vars.color.coolgrey_120,
});
