import { globalStyle } from "@vanilla-extract/css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("body", {
  minHeight: "100dvh",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  fontSize: "inherit",
  fontWeight: "inherit",
});

globalStyle("ol, ul, menu", {
  listStyle: "none",
});

globalStyle("table", {
  borderCollapse: "collapse",
  borderColor: "inherit",
  textIndent: "0",
});

globalStyle("img, picture", {
  display: "block",
  maxWidth: "100%",
  height: "auto",
});

globalStyle("input, button, textarea, select", {
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  color: "inherit",
});
