import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const container = style({
  display: "flex",
  gap: vars.space.space_6,
  alignItems: "center",
});

const stepBase = style({
  width: "2.8rem",
  height: "2.8rem",
  borderRadius: "0.4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...fontStyles.body6,
});

export const activeStep = style([
  stepBase,
  {
    backgroundColor: vars.color.primary_200,
    color: vars.color.coolgrey_10,
  },
]);

export const inactiveStep = style([
  stepBase,
  {
    backgroundColor: vars.color.coolgrey_140,
    color: vars.color.coolgrey_75,
  },
]);
