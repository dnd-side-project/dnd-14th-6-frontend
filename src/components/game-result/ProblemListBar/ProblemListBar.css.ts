import { style } from "@vanilla-extract/css";

import { vars } from "@/styles/theme.css";

export const container = style({
  position: "relative",
  width: "18.1rem",
  backgroundColor: vars.color.coolgrey_200,
  borderRadius: vars.radius.l,
  overflowY: "auto",
  flexShrink: 0,
  padding: "0.3rem 0.2rem",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const hasScroll = style({
  paddingRight: "1rem",
});

export const scrollTrack = style({
  position: "absolute",
  top: "3%",
  bottom: 0,
  right: "0.3rem",
  width: "3px",
});

export const scrollThumb = style({
  position: "absolute",
  width: "100%",
  borderRadius: "1px",
  background: "rgba(255,255,255,0.15)",
  transition: "background 0.15s",
  selectors: {
    "&:hover": {
      background: "rgba(255,255,255,0.3)",
    },
  },
});
