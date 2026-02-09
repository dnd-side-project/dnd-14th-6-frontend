import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const tableWrapper = style({
  width: "100%",
  borderRadius: "12px",
  overflow: "hidden",
});

export const header = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "4.8rem",
  paddingLeft: "3.3rem",
  backgroundColor: vars.color.coolgrey_180,
  border: `1px solid ${vars.color.coolgrey_0}`,
  borderRadius: "12px 12px 0 0",
  boxShadow: "inset 0px 0px 15.2px 0px rgba(98, 235, 254, 0.25)",
});

export const headerRank = style({
  width: "8.7rem",
});

export const headerCommand = style({
  flex: 1,
});

export const headerCount = style({
  width: "6.2rem",
  textAlign: "right",
  paddingRight: "3.2rem",
});

export const tableBody = style({
  border: `1px solid ${vars.color.coolgrey_150}`,
  borderTop: "none",
  borderRadius: "0 0 12px 12px",
});

const rowBase = style({
  display: "flex",
  alignItems: "center",
  height: "4.8rem",
  paddingLeft: "3.2rem",
  borderBottom: `1px solid ${vars.color.coolgrey_150}`,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  selectors: {
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const row = styleVariants({
  default: [rowBase],
  hovered: [
    rowBase,
    {
      backgroundColor: vars.color.coolgrey_60,
    },
  ],
});

export const rowIndex = style({
  width: "8.7rem",
});

export const rowCommand = style({
  flex: 1,
  padding: "0.8rem",
});

export const rowCount = style({
  width: "6.2rem",
  textAlign: "right",
  padding: "0.8rem",
  paddingRight: "3.2rem",
});
