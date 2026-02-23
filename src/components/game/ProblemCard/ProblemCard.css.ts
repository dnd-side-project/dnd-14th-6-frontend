import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const container = recipe({
  base: {
    display: "inline-flex",
    border: "none",
    background: vars.gradient.game_problem_bg,
    backdropFilter: "blur(4.95px)",
    borderRadius: vars.radius.l,
    overflow: "hidden",
    cursor: "pointer",
    outline: "none",
    transition: "box-shadow 0.2s ease",
  },
  variants: {
    variant: {
      default: {},
      selected: {
        boxShadow: vars.effect.game_selected_default,
      },
      error: {
        boxShadow: vars.effect.game_selected_error,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const sectionBase = {
  display: "flex",
  alignItems: "center",
  height: 50,
  borderStyle: "solid",
  borderWidth: 2,
  flexShrink: 0,
} as const;

export const categorySection = recipe({
  base: {
    ...sectionBase,
    justifyContent: "center",
    paddingInline: vars.space.space_20,
    borderTopLeftRadius: vars.radius.l,
    borderBottomLeftRadius: vars.radius.l,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 2,
  },
  variants: {
    variant: {
      default: {
        borderColor: vars.color.game_border_default,
        borderRightColor: vars.color.game_border_body_default,
      },
      selected: {
        borderColor: vars.color.primary_default,
        borderRightColor: vars.color.game_border_selected,
      },
      error: {
        borderColor: vars.color.point_01,
        borderRightColor: vars.color.game_border_error,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const categorySectionHeadOnly = recipe({
  base: {
    ...sectionBase,
    justifyContent: "center",
    paddingInline: vars.space.space_20,
    borderRadius: vars.radius.l,
  },
  variants: {
    variant: {
      default: { borderColor: vars.color.game_border_default },
      selected: { borderColor: vars.color.primary_default },
      error: { borderColor: vars.color.point_01 },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const bodySection = recipe({
  base: {
    ...sectionBase,
    paddingInline: vars.space.space_28,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: vars.radius.l,
    borderBottomRightRadius: vars.radius.l,
  },
  variants: {
    variant: {
      default: { borderColor: vars.color.game_border_body_default },
      selected: { borderColor: vars.color.game_border_selected },
      error: { borderColor: vars.color.game_border_error },
    },
  },
  defaultVariants: {
    variant: "default",
  },
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
