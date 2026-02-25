import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  flex: 1,
  minWidth: 0,
});

export const graphWrapper = style({
  position: "relative",
  flex: 1,
  minHeight: 0,
});

export const contentBlurred = style({
  filter: "blur(8px)",
  userSelect: "none",
  pointerEvents: "none",
});

export const yAxisLabel = style({
  position: "absolute",
  right: 0,
  textAlign: "right",
  width: "1.5rem",
});

export const xAxisContainer = style({
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: "3.6rem",
});

export const hoverLine = style({
  position: "absolute",
  width: "1px",
  borderLeft: `1px dashed ${vars.color.primary_250}`,
  pointerEvents: "none",
});

export const hoverDot = style({
  position: "absolute",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: vars.gradient.main_accent,
  boxShadow: `0 0 12px 0 ${vars.color.primary_default}`,
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "3px",
      borderRadius: "50%",
      backgroundColor: vars.color.coolgrey_20,
    },
  },
});
