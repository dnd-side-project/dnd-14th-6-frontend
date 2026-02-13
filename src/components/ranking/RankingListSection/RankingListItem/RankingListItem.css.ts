import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";

const hoverStyle = {
  selectors: {
    "&:hover": {
      background: vars.color.darkgreen_50,
    },
  },
} as const;

export const container = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "6rem",
    paddingLeft: "2.8rem",
    paddingRight: "4.4rem",
    borderRadius: vars.radius.m,
    transition: "background 0.2s ease",
  },
  variants: {
    variant: {
      top1: {
        background: vars.gradient.ranking_top1,
        ...hoverStyle,
      },
      top2: {
        background: vars.gradient.ranking_top2,
        ...hoverStyle,
      },
      top3: {
        background: vars.gradient.ranking_top3,
        ...hoverStyle,
      },
      default: {
        backgroundColor: vars.color.coolgrey_225,
        ...hoverStyle,
      },
      me: {
        background: vars.gradient.main_accent,
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const rankNumber = style({
  width: "3.6rem",
  textAlign: "center",
});

export const tierBadge = recipe({
  base: {
    width: "1.7rem",
    height: "1.25rem",
    borderRadius: vars.radius.xs,
    flexShrink: 0,
  },
  variants: {
    me: {
      true: {
        backgroundColor: vars.color.primary_250,
      },
      false: {
        backgroundColor: vars.color.coolgrey_10,
      },
    },
  },
  defaultVariants: {
    me: false,
  },
});

export const githubLink = style({
  display: "flex",
  flexShrink: 0,
});
