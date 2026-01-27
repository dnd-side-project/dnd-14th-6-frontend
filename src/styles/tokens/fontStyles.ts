import { font } from "./font";
import { typography } from "./typography";

export const fontStyles = {
  //TODO 디자인시스템에 맞게 값 수정
  /* 예시값 */
  xxl_title_sans: {
    fontFamily: font.sans,
    fontSize: typography.fontSize[28],
    lineHeight: typography.lineHeight[28],
    fontWeight: typography.fontWeight.bold,
  },
  xl_title_mono: {
    fontFamily: font.mono,
    fontSize: typography.fontSize[24],
    lineHeight: typography.lineHeight[24],
    fontWeight: typography.fontWeight.semibold,
  },
} as const;

export type FontStylesType = typeof fontStyles;
export type FontStyleVariant = keyof typeof fontStyles;
