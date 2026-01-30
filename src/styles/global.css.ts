import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

/** 1rem = 10px */
globalStyle("html", {
  fontSize: "62.5%",
});

/** 텍스트 렌더링 */
globalStyle(":root", {
  textRendering: "optimizeLegibility",
});

/** 앱 기본 폰트/색/배경 */
globalStyle("html, body", {
  height: "100%",
  fontFamily: vars.typography.fontFamily.pre,
});

globalStyle("body", {
  backgroundColor: vars.color.white,
  color: vars.color.black,
  lineHeight: "1.5",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("button", {
  cursor: "pointer",
});
