import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const card = style({
  flex: 1,
  minHeight: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const contentArea = style({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  marginRight: "-1.2rem",
  paddingRight: "2.4rem",
});

export const problemText = style({
  paddingLeft: "0.8rem",
});

export const codeTag = style({
  ...fontStyles.caption7,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "1.8rem",
  padding: "0 0.6rem",
  backgroundColor: vars.color.coolgrey_130,
  borderRadius: "4px",
  color: vars.color.coolgrey_20,
  backdropFilter: "blur(32px)",
  verticalAlign: "text-bottom",
});

export const answerRow = style({
  display: "flex",
  alignItems: "flex-start",
  paddingLeft: "7.2rem",
  position: "relative",
});

export const answerLabel = style({
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
});

export const answerText = recipe({
  base: {
    ...fontStyles.body16,
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

export const explanationRow = style({
  display: "flex",
  alignItems: "flex-start",
  paddingLeft: "7.2rem",
  position: "relative",
  marginTop: "0.8rem",
});

export const explanationLabel = style({
  position: "absolute",
  left: 0,
  top: "0.4rem",
  whiteSpace: "nowrap",
});

export const contentBlurred = style({
  filter: "blur(8px)",
  userSelect: "none",
  pointerEvents: "none",
});
