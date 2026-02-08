import { style, styleVariants } from "@vanilla-extract/css";

export const contentWrapper = style({
  position: "relative",
  width: "100%",
});

export const barWrapper = style({
  position: "relative",
  cursor: "pointer",
});

const barBase = style({
  height: "4.1rem",
  width: "100%",
  transition: "background 0.2s ease",
});

export const bar = styleVariants({
  first: [barBase, { borderRadius: "99px 20px 20px 99px" }],
  middle: [barBase, { borderRadius: "5px" }],
  last: [barBase, { borderRadius: "20px 99px 99px 20px" }],
});
