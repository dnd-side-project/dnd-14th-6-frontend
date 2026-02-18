import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

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
  marginBottom: 32,
});

export const nav = style({
  display: "flex",
  gap: 12,
  justifyContent: "center",
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

export const startButtonArea = style({
  display: "flex",
  justifyContent: "center",
  marginTop: 24,
});

export const categoryWrapper = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10.6rem",
});

export const guide = style({
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
  display: "flex",
  flexDirection: "row",
  gap: vars.space.space_32,
  alignItems: "center",
});

export const levelCards = style({
  display: "grid",
  gridTemplateColumns: "53.8rem 53.8rem",
  gap: vars.space.space_20,
});
