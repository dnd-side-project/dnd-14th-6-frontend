import { createGlobalTheme } from "@vanilla-extract/css";
import { color } from "./tokens/color";
import { effect } from "./tokens/effect";
import { fontStyles } from "./tokens/fontStyles";
import { gradient } from "./tokens/gradient";
import { radius } from "./tokens/radius";
import { space } from "./tokens/space";
import { typography } from "./tokens/typography";

export const vars = createGlobalTheme(":root", {
  color,
  radius,
  space,
  typography,
  fontStyles,
  gradient,
  effect,
});
