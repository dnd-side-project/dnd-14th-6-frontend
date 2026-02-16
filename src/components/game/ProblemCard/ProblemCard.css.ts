import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const container = recipe({
  base: {
    display: "inline-flex",
    padding: "2px",
    borderRadius: vars.radius.l,
    cursor: "pointer",
    outline: "none",
    transition: "box-shadow 0.2s ease",
  },
  variants: {
    variant: {
      default: {
        background: vars.gradient.game_problem_border_default,
      },
      selected: {
        background: vars.gradient.game_problem_border_selected,
        boxShadow: vars.effect.game_selected_default,
      },
      error: {
        background: vars.gradient.game_problem_border_error,
        boxShadow: vars.effect.game_selected_error,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const inner = style({
  display: "flex",
  alignItems: "center",
  height: "4.6rem",
  borderRadius: `calc(${vars.radius.l} - 2px)`,
  backgroundColor: vars.color.black,
  backgroundImage: vars.gradient.game_problem_bg,
});

export const categorySection = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: vars.space.space_20,
  flexShrink: 0,
  height: "100%",
});

export const divider = recipe({
  base: {
    width: "2px",
    alignSelf: "stretch",
  },
  variants: {
    variant: {
      default: { backgroundColor: vars.color.game_border_default },
      selected: { backgroundColor: vars.color.game_border_selected },
      error: { backgroundColor: vars.color.game_border_error },
    },
  },
});

export const bodySection = style({
  display: "flex",
  alignItems: "center",
  paddingInline: vars.space.space_28,
  flexShrink: 0,
  height: "100%",
});

export const categoryText = style({
  ...fontStyles.subtitle4,
  color: vars.color.primary_150,
  whiteSpace: "nowrap",
});

export const bodyText = style({
  ...fontStyles.subtitle1,
  color: vars.color.coolgrey_10,
});
