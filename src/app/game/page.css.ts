import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const categoryWrapper = style({
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10.6rem",
  marginInline: `calc(-1 * ${vars.space.space_48})`,
});

export const stepBackground = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
  objectFit: "cover",
  objectPosition: "top center",
});

export const guide = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.space_32,
});

export const categoryTitle = style({
  ...fontStyles.display7,
  color: vars.color.coolgrey_20,
  textAlign: "center",
});

export const categoryCards = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "row",
  gap: vars.space.space_32,
  alignItems: "center",
});

globalStyle(`${categoryCards}:hover > button:not(:hover)`, {
  opacity: 0.4,
  transition: "opacity 0.2s ease",
});

export const levelCards = style({
  position: "relative",
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: "53.8rem 53.8rem",
  gap: vars.space.space_20,
});

globalStyle(`${levelCards}:hover > button:not(:hover)`, {
  opacity: 0.4,
  transition: "opacity 0.2s ease",
});
