import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const nav = style({
  display: "flex",
  gap: 12,
  justifyContent: "center",
});

export const link = style({
  display: "inline-block",
  padding: "12px 24px",
  background: vars.color.coolgrey_180,
  color: vars.color.coolgrey_10,
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
});
