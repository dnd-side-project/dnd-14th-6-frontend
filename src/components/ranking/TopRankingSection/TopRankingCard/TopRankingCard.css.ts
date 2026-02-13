import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const card = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    width: "14.8rem",
  },
  variants: {
    variant: {
      first: {},
      second: {
        marginTop: "3.9rem",
      },
      third: {
        marginTop: "3.9rem",
      },
    },
  },
});

export const profileArea = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

export const rankBadge = style({
  width: "13.25rem",
  height: "6.5rem",
  borderRadius: vars.radius.s,
  backgroundColor: vars.color.primary_default,
  flexShrink: 0,
});

export const profileImage = style({
  width: "14.8rem",
  borderRadius: vars.radius.max,
  border: `2px solid ${vars.color.primary_default}`,
  boxShadow: "0px -3px 30px 0px rgba(98, 235, 254, 0.54)",
  objectFit: "cover",
  backgroundColor: vars.color.coolgrey_220,
  aspectRatio: "1 / 1",
  marginTop: "-1.2rem",
  position: "relative",
});

export const tierBadge = style({
  width: "3.2rem",
  height: "2.1rem",
  borderRadius: vars.radius.xxl,
  backgroundColor: vars.color.primary_150,
  flexShrink: 0,
});

export const nickname = style({
  ...fontStyles.heading4,
  background: vars.gradient.game_selected_left,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  whiteSpace: "nowrap",
});

export const score = style({
  ...fontStyles.heading1,
  color: vars.color.coolgrey_40,
  textAlign: "center",
  whiteSpace: "nowrap",
});
