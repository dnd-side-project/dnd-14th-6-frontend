import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  position: "relative",
  display: "inline-block",
});

export const triggerContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "0.85rem",
  background: "none",
  border: "none",
  cursor: "pointer",
});

export const inputBox = style({
  gap: "1rem",
  width: "27rem",
  height: "4.4rem",
  paddingLeft: "1.6rem",
  paddingRight: "1.2rem",
  backgroundColor: vars.color.coolgrey_150,
  borderRadius: vars.radius.s,
  border: "none",
  cursor: "pointer",
});

export const popover = style({
  position: "absolute",
  top: "calc(100% + 0.8rem)",
  left: "0",
  zIndex: 100,
});
