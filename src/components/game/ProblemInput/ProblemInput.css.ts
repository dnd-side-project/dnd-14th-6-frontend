import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const wrapper = style({
  position: "relative",
  width: "100%",
  maxWidth: "71.6rem",
});

export const inputContainer = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "5.2rem",
  padding: vars.space.space_16,
  backgroundColor: vars.color.coolgrey_190,
  border: `1.5px solid ${vars.color.primary_default}`,
  borderRadius: vars.radius.s,
  backdropFilter: "blur(5px)",
  overflow: "hidden",
  selectors: {
    "&:hover, &:focus-within": {
      boxShadow: "0px 0px 25.8px 0px rgba(98, 235, 254, 0.32)",
    },
  },
});

export const input = style({
  ...fontStyles.body11,
  flex: 1,
  backgroundColor: "transparent",
  border: "none",
  color: vars.color.coolgrey_10,
  outline: "none",
  caretColor: vars.color.primary_default,
  selectors: {
    "&::placeholder": {
      ...fontStyles.body2,
      color: vars.color.coolgrey_80,
    },
  },
});

export const hint = style({
  ...fontStyles.caption6,
  color: vars.color.primary_100_light,
  whiteSpace: "nowrap",
  flexShrink: 0,
  marginLeft: vars.space.space_8,
});
