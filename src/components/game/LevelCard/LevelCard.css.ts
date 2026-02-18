import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const card = recipe({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "53.8rem",
    height: "20rem",
    paddingInline: vars.space.space_68,
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
        boxShadow: vars.effect.level_card_glow,
      },
      selected: {
        backgroundColor: "transparent",
        backgroundImage: vars.gradient.level_card_selected,
        borderColor: vars.color.game_border_selected,
        boxShadow: vars.effect.level_card_selected_glow,
      },
      inactive: {
        backgroundColor: vars.color.coolgrey_200,
        backgroundImage: "none",
        borderColor: "rgba(255, 255, 255, 0.02)",
        boxShadow: vars.effect.level_card_glow,
        opacity: 0.6,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const label = recipe({
  base: {
    ...fontStyles.display2,
    fontStyle: "normal",
    flexShrink: 0,
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
        color: vars.color.game_level_inactive_text,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const iconWrapper = style({
  width: "12.8rem",
  height: "4.923rem",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
