export const typography = {
  fontFamily: {
    pre: "var(--font-pretendard)",
    jet: "var(--font-jetbrains-mono)",
    D2: "var(--font-D2)",
    SB: "var(--font-SB)",
  },

  fontSize: {
    55: "5.5rem",
    40: "4rem",
    36: "3.6rem",
    35: "3.5rem",
    32: "3.2rem",
    30: "3rem",
    28: "2.8rem",
    22: "2.2rem",
    21: "2.1rem",
    20: "2rem",
    18: "1.8rem",
    17: "1.7rem",
    16: "1.6rem",
    15: "1.5rem",
    14: "1.4rem",
    13: "1.3rem",
    12: "1.2rem",
    10: "1rem",
  },
  lineHeight: {
    31: "31px",
    29: "29px",
    27: "27px",
    26: "26px",
    24: "24px",
  },
  fontWeight: {
    800: "800",
    700: "700",
    600: "600",
    500: "500",
    400: "400",
  },
  letterSpacing: {
    "000": "0",
    100: "-0.1px",
    200: "-0.2px",
    300: "-0.3px",
    400: "-0.4px",
    500: "-0.5px",
  },
} as const;

export type TypographyType = typeof typography;
