import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  display: "inline-block",
});

export const panelWrapper = style({
  position: "absolute",
  top: "calc(100% + 0.8rem)",
  right: 0,
  zIndex: 100,
});
