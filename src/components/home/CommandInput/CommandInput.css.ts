import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const wrapper = style({
  position: "relative",
  width: "100%",
  maxWidth: "58.1rem",
});

export const inputBorder = style({
  position: "relative",
  borderRadius: vars.radius.s,
  padding: "1.5px",
  background:
    "linear-gradient(to right, rgba(98, 235, 254, 0.3), rgba(59, 141, 152, 0.3))",
  backdropFilter: "blur(5px)",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "1.5px",
      borderRadius: `calc(${vars.radius.s} - 1.5px)`,
      backgroundColor: vars.color.black,
    },
    "&:hover, &:focus-within": {
      background:
        "linear-gradient(to right, rgba(98, 235, 254, 0.91), rgba(63, 198, 216, 0.91), rgba(98, 235, 254, 0.91))",
      boxShadow: "0px 0px 25.8px 0px rgba(98, 235, 254, 0.32)",
    },
  },
});

export const input = style({
  ...fontStyles.body11,
  position: "relative",
  width: "100%",
  height: "5.2rem",
  paddingLeft: "2.4rem",
  paddingRight: "2.4rem",
  backgroundColor: vars.color.coolgrey_190,
  border: "none",
  borderRadius: `calc(${vars.radius.s} - 1.5px)`,
  color: vars.color.primary_50,
  outline: "none",
  caretColor: vars.color.primary_default,
  selectors: {
    "&::placeholder": {
      color: vars.color.coolgrey_80,
    },
    "&:focus::placeholder": {
      color: "transparent",
    },
  },
});

export const dropdownBorder = style({
  position: "absolute",
  top: "calc(100% + 0.7rem)",
  left: 0,
  width: "22rem",
  borderRadius: vars.radius.s,
  padding: "1.5px",
  background:
    "linear-gradient(to right, rgba(98, 235, 254, 0.3), rgba(59, 141, 152, 0.3))",
  zIndex: 10,
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "1.5px",
      borderRadius: `calc(${vars.radius.s} - 1.5px)`,
      backgroundColor: vars.color.black,
    },
  },
});

export const dropdown = style({
  position: "relative",
  backgroundColor: vars.color.coolgrey_190,
  borderRadius: `calc(${vars.radius.s} - 1.5px)`,
  overflow: "hidden",
});

export const dropdownItem = recipe({
  base: {
    width: "100%",
    height: "4.5rem",
    display: "flex",
    alignItems: "center",
    paddingLeft: "2.4rem",
    cursor: "pointer",
    border: "none",
    background: "none",
  },
  variants: {
    active: {
      true: {
        backgroundColor: vars.color.darkgreen_100,
      },
      false: {},
    },
  },
  defaultVariants: {
    active: false,
  },
});
