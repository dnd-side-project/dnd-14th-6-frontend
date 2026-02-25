import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const button = style({
  width: "3.6rem",
  height: "3.6rem",
  borderRadius: "50%",
  backgroundColor: vars.color.coolgrey_160,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  cursor: "pointer",
  padding: 0,
  color: vars.color.coolgrey_70,
  transition: "transform 0.2s ease, color 0.2s ease",
  ":hover": {
    transform: "scale(1.1667)",
    color: vars.color.coolgrey_30,
  },
  zIndex: 1,
});
