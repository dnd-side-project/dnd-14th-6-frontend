export const typography = {
  //TODO 디자인시스템에 맞게 값 수정
  /* 예시값 */
  fontSize: {
    28: "2.8rem",
    24: "2.4rem",
    20: "2rem",
    18: "1.8rem",
    16: "1.6rem",
    14: "1.4rem",
    12: "1.2rem",
  },
  lineHeight: {
    28: "3.6rem",
    24: "3.2rem",
    20: "2.8rem",
    18: "2.6rem",
    16: "2.4rem",
    14: "2.0rem",
    12: "1.8rem",
  },
  fontWeight: {
    bold: "700",
    semibold: "600",
    medium: "500",
    regular: "400",
  },
} as const;

export type TypographyType = typeof typography;
