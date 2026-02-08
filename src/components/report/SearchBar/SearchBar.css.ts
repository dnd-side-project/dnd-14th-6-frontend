import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "1.8rem",
  width: "35.7rem",
  height: "5rem",
  paddingLeft: "2rem",
  paddingRight: "4rem",
  backgroundColor: vars.color.coolgrey_220,
  borderRadius: vars.radius.m,
});

export const input = style({
  ...fontStyles.body3,
  flex: 1,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  color: vars.color.coolgrey_10,
  caretColor: vars.color.primary_default,
  "::placeholder": {
    color: vars.color.coolgrey_80,
  },
});

export const icon = style({
  flexShrink: 0,
});
