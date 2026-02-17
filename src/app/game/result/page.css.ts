import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const wrapper = style({
  maxWidth: 480,
  margin: "80px auto",
  textAlign: "center",
});

export const title = style({
  fontSize: vars.typography.fontSize[32],
  fontWeight: vars.typography.fontWeight[700],
  marginBottom: 12,
});

export const description = style({
  color: vars.color.coolgrey_80,
  fontSize: vars.typography.fontSize[16],
  marginBottom: 12,
});

export const scoreText = style({
  fontSize: vars.typography.fontSize[22],
  fontWeight: vars.typography.fontWeight[700],
  marginBottom: 32,
});

export const nav = style({
  display: "flex",
  gap: 12,
  justifyContent: "center",
});

export const link = style({
  display: "inline-block",
  padding: "12px 24px",
  background: vars.color.coolgrey_180,
  color: vars.color.coolgrey_10,
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
});

export const linkOutline = style({
  display: "inline-block",
  padding: "12px 24px",
  background: vars.color.coolgrey_10,
  color: vars.color.coolgrey_180,
  border: `1px solid ${vars.color.coolgrey_40}`,
  borderRadius: vars.radius.s,
  fontSize: vars.typography.fontSize[16],
});
