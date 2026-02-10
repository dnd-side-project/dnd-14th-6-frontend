import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const fadeInUp = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(1.2rem)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const row = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: "2.7rem",
  position: "relative",
  animation: `${fadeInUp} 0.6s ease-out both`,
  cursor: "pointer",
});

export const headerRow = style({
  cursor: "default",
});

export const lineNumberArea = style({
  width: "1.9rem",
  flexShrink: 0,
  textAlign: "left",
});

export const contentArea = style({
  marginLeft: "1.8rem",
  flex: 1,
  position: "relative",
});

globalStyle(`${row}:not(${headerRow}):hover ${contentArea}`, {
  backgroundColor: vars.color.darkgreen_50,
});

globalStyle(`${row}:not(${headerRow}):hover ${contentArea}::before`, {
  content: '""',
  position: "absolute",
  left: 0,
  top: 0,
  width: "2px",
  height: "100%",
  backgroundColor: vars.color.primary_200,
});

export const indentedContent = style({
  paddingLeft: "2.75rem",
});
