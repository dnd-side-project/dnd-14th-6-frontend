import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const card = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "34.4rem",
    height: "42.2rem",
    paddingBlock: vars.space.space_72,
    borderRadius: vars.radius.xxl,
    borderWidth: "1px",
    borderStyle: "solid",
    appearance: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
    flexShrink: 0,
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.color.coolgrey_200,
        backgroundImage: "none",
        borderColor: "rgba(255, 255, 255, 0.02)",
        boxShadow: vars.effect.category_card_glow,
      },
      selected: {
        backgroundColor: "transparent",
        backgroundImage: vars.gradient.category_card_selected,
        borderColor: vars.color.game_border_selected,
        boxShadow: vars.effect.category_card_selected_glow,
      },
      inactive: {
        backgroundColor: vars.color.coolgrey_200,
        backgroundImage: "none",
        borderColor: "rgba(255, 255, 255, 0.02)",
        boxShadow: vars.effect.category_card_glow,
        opacity: 0.6,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const iconWrapper = style({
  width: "14rem",
  height: "14rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const label = recipe({
  base: {
    ...fontStyles.display2,
    textAlign: "center",
    fontStyle: "normal",
  },
  variants: {
    variant: {
      default: {
        color: vars.color.coolgrey_20,
      },
      selected: {
        color: vars.color.primary_default,
      },
      inactive: {
        color: vars.color.game_category_inactive_text,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
