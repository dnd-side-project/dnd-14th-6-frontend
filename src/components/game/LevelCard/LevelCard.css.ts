import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const card = style({
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
  backgroundColor: vars.color.coolgrey_200,
  backgroundImage: "none",
  borderColor: "rgba(255, 255, 255, 0.02)",
  boxShadow: vars.effect.level_card_glow,
  selectors: {
    "&:hover": {
      backgroundColor: "transparent",
      backgroundImage: vars.gradient.level_card_selected,
      borderColor: vars.color.game_border_selected,
      boxShadow: vars.effect.level_card_selected_glow,
    },
  },
});

export const label = style({
  ...fontStyles.display2,
  fontStyle: "normal",
  flexShrink: 0,
  color: vars.color.coolgrey_20,
  transition: "color 0.2s ease",
  selectors: {
    "button:hover &": {
      color: vars.color.primary_default,
    },
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
