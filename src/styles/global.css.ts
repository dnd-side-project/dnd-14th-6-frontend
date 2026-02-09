import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

/** Paperlogy 폰트 정의 */
globalFontFace("Paperlogy", {
  src: 'url("/fonts/Paperlogy-Regular.woff2") format("woff2")',
  fontWeight: 400,
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace("Paperlogy", {
  src: 'url("/fonts/Paperlogy-Medium.woff2") format("woff2")',
  fontWeight: 500,
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace("Paperlogy", {
  src: 'url("/fonts/Paperlogy-SemiBold.woff2") format("woff2")',
  fontWeight: 600,
  fontStyle: "normal",
  fontDisplay: "swap",
});

/** 1rem = 10px */
globalStyle("html", {
  fontSize: "62.5%",
  scrollbarWidth: "thin",
  scrollbarColor: `${vars.color.coolgrey_80} transparent`,
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
  backgroundColor: vars.color.black,
  color: "#000000",
  lineHeight: "1.5",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

/** 스크롤바 */
globalStyle("::-webkit-scrollbar", {
  width: "6px",
});

globalStyle("::-webkit-scrollbar-track", {
  background: "transparent",
});

globalStyle("::-webkit-scrollbar-thumb", {
  backgroundColor: vars.color.coolgrey_80,
  borderRadius: "100px",
});

globalStyle("button", {
  cursor: "pointer",
});
