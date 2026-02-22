import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const container = recipe({
  base: {
    display: "inline-flex",
    padding: "2px",
    border: "none",
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
    shape: {
      full: {
        borderRadius: vars.radius.l,
      },
      headOnly: {
        borderTopLeftRadius: vars.radius.l,
        borderBottomLeftRadius: vars.radius.l,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
  defaultVariants: {
    variant: "default",
    shape: "full",
  },
});

const innerBase = {
  display: "flex",
  alignItems: "center",
  height: "46px",
  backgroundColor: vars.color.black,
  backgroundImage: vars.gradient.game_problem_bg,
  backdropFilter: "blur(4.95px)",
} as const;

export const inner = style({
  ...innerBase,
  borderRadius: `calc(${vars.radius.l} - 2px)`,
});

export const innerHeadOnly = style({
  ...innerBase,
  borderTopLeftRadius: `calc(${vars.radius.l} - 2px)`,
  borderBottomLeftRadius: `calc(${vars.radius.l} - 2px)`,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
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
      default: { backgroundColor: vars.color.game_border_body_default },
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

export const categoryText = recipe({
  base: {
    ...fontStyles.subtitle4,
    whiteSpace: "nowrap",
  },
  variants: {
    level: {
      easy: { color: vars.color.primary_150 },
      normal: { color: vars.color.point_03 },
      hard: { color: vars.color.point_04 },
    },
  },
  defaultVariants: {
    level: "easy",
  },
});

export const bodyText = style({
  ...fontStyles.subtitle1,
  color: vars.color.coolgrey_10,
});
