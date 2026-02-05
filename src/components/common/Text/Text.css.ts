import { styleVariants } from "@vanilla-extract/css";
import { color } from "@/styles/tokens/color";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const textVariants = styleVariants(fontStyles, (style) => ({
  fontFamily: style.fontFamily,
  fontWeight: style.fontWeight,
  fontSize: style.fontSize,
  lineHeight: style.lineHeight,
  letterSpacing: style.letterSpacing,
}));

export const textColors = styleVariants(color, (value) => ({
  color: value,
}));
