import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const heroTitle = style({
  margin: 0,
  fontFamily: vars.typography.fontFamily.Jaka,
  fontSize: "9.6rem",
  fontWeight: "700",
  lineHeight: "10.4rem",
  letterSpacing: "0",
  whiteSpace: "pre-wrap",
  background: "linear-gradient(180deg, #f7fbff 34.48%, #dde7f2 87.8%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
});

export const copyText = style({
  whiteSpace: "pre-wrap",
});
