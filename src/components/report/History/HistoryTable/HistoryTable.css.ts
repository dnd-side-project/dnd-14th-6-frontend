import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const table = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: "127.6rem",
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0.5rem 1.6rem 0",
});

export const rowGroup = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const divider = style({
  height: "0.5px",
  backgroundColor: vars.color.coolgrey_110,
  marginLeft: "-1.6rem",
  marginRight: "-1.6rem",
});

export const lastDivider = style({
  height: "1px",
  backgroundColor: vars.color.coolgrey_110,
  marginLeft: "-1.6rem",
  marginRight: "-1.6rem",
});
