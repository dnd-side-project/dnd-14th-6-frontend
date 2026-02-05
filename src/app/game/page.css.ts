import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const stepCard = style({
  background: vars.color.coolgrey_20,
  borderRadius: vars.radius.l,
  padding: "32px 24px",
  marginBottom: 24,
});

export const stepCount = style({
  fontSize: vars.typography.fontSize[14],
  color: vars.color.coolgrey_80,
  marginBottom: 8,
});

export const stepLabel = style({
  fontSize: vars.typography.fontSize[22],
  fontWeight: vars.typography.fontWeight[700],
});

export const btn = style({
  padding: "12px 24px",
  background: vars.color.coolgrey_180,
  color: vars.color.coolgrey_10,
  border: "none",
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
  cursor: "pointer",
});

export const btnOutline = style({
  padding: "12px 24px",
  background: vars.color.coolgrey_10,
  color: vars.color.coolgrey_180,
  border: `1px solid ${vars.color.coolgrey_40}`,
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
  cursor: "pointer",
});
