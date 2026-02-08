import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "3.2rem 2.8rem",
  backgroundColor: vars.color.coolgrey_60,
  borderRadius: vars.radius.l,
  border: "1px solid rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)",
});

export const tableSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  width: "100%",
  overflowX: "auto",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const paginationWrapper = style({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});
