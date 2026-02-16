import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  width: 191,
});

export const row = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const labelGroup = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const dotBase = style({
  width: 14,
  height: 14,
  borderRadius: "50%",
  flexShrink: 0,
});

export const dot = styleVariants({
  hard: [dotBase, { backgroundColor: vars.color.point_01 }],
  normal: [dotBase, { backgroundColor: vars.color.primary_100 }],
  easy: [dotBase, { backgroundColor: vars.color.point_03 }],
});
