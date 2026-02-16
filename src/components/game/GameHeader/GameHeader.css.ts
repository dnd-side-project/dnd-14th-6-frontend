import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  width: "100%",
});

export const statusBar = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  width: "100%",
});

export const statusRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const timeRow = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
});

export const timeBar = style({
  flex: 1,
});

export const bottomRow = style({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
});

export const hintButton = style({
  cursor: "pointer",
  marginLeft: "auto",
  background: "none",
  border: "none",
  padding: 0,
  lineHeight: 0,
});
