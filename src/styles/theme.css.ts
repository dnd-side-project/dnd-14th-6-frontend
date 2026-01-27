import { createGlobalTheme } from "@vanilla-extract/css";
import { color } from "./tokens/color";
import { font } from "./tokens/font";
import { fontStyles } from "./tokens/fontStyles";
import { radius } from "./tokens/radius";
import { shadow } from "./tokens/shadow";
import { typography } from "./tokens/typography";

export const vars = createGlobalTheme(":root", {
  color,
  radius,
  shadow,
  font,
  typography,
  fontStyles,
});
