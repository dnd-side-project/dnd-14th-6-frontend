import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const iconWrapper = style({
  width: "5rem",
  height: "5rem",
  borderRadius: "8.571px",
  backgroundColor: vars.color.coolgrey_160,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});
