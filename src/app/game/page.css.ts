import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const stepCard = style({
  background: vars.color.grey_50,
  borderRadius: vars.radius.game_problem,
  padding: "32px 24px",
  marginBottom: 24,
});

export const stepCount = style({
  fontSize: vars.typography.fontSize[14],
  color: vars.color.grey_200,
  marginBottom: 8,
});

export const stepLabel = style({
  fontSize: vars.typography.fontSize[22],
  fontWeight: vars.typography.fontWeight[700],
});

export const btn = style({
  padding: "12px 24px",
  background: vars.color.grey_350,
  color: vars.color.white,
  border: "none",
  borderRadius: vars.radius.game_category,
  fontSize: vars.typography.fontSize[16],
  cursor: "pointer",
});

export const btnOutline = style({
  padding: "12px 24px",
  background: vars.color.white,
  color: vars.color.grey_350,
  border: `1px solid ${vars.color.grey_100}`,
  borderRadius: vars.radius.game_category,
  fontSize: vars.typography.fontSize[16],
  cursor: "pointer",
});
