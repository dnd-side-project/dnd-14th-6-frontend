import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "3.6rem",
  width: "100%",
  paddingTop: "4.4rem",
  paddingBottom: "6.4rem",
  maxHeight: "60rem",
  overflowY: "auto",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const problemSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  width: "100%",
});

export const problemText = style({
  ...fontStyles.body2,
  color: vars.color.coolgrey_40,
  paddingLeft: "0.1rem",
});

export const codeTag = style({
  ...fontStyles.caption6,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "2rem",
  padding: "0 0.6rem",
  backgroundColor: vars.color.coolgrey_130,
  borderRadius: "4px",
  color: vars.color.coolgrey_20,
  backdropFilter: "blur(32px)",
  verticalAlign: "middle",
});

export const answersSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  width: "100%",
  paddingLeft: "2.6rem",
});

export const answerRow = style({
  display: "flex",
  alignItems: "flex-start",
  paddingLeft: "7.2rem",
  position: "relative",
});

export const answerLabel = style({
  ...fontStyles.body8,
  color: vars.color.coolgrey_80,
  position: "absolute",
  left: 0,
  top: "1rem",
  whiteSpace: "nowrap",
});

export const answerBox = style({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
  padding: "1rem 2.4rem",
  backgroundColor: vars.color.coolgrey_160,
  borderRadius: "12px",
  position: "relative",
});

export const answerText = recipe({
  base: {
    ...fontStyles.body14,
    whiteSpace: "pre-wrap",
  },
  variants: {
    correct: {
      true: {
        color: vars.color.coolgrey_50,
      },
      false: {
        color: vars.color.point_02,
      },
    },
  },
  defaultVariants: {
    correct: true,
  },
});

export const copyButton = style({
  position: "absolute",
  right: "2rem",
  top: "1.3rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
});

export const explanationSection = style({
  display: "flex",
  alignItems: "flex-start",
  paddingLeft: "7.2rem",
  position: "relative",
  marginTop: "0.8rem",
});

export const explanationLabel = style({
  ...fontStyles.body8,
  color: vars.color.coolgrey_80,
  position: "absolute",
  left: 0,
  whiteSpace: "nowrap",
});

export const explanationText = style({
  ...fontStyles.body2,
  color: vars.color.coolgrey_40,
});
