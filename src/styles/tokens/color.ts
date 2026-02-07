export const color = {
  // Primary
  primary_default: "#62ebfe",
  primary_0: "#dafaff",
  primary_50: "#b9f6ff",
  primary_100_light: "#62ebfe99",
  primary_100: "#62ebfe",
  primary_150: "#5cddef",
  primary_200: "#2dc4d9",
  primary_250: "#1ca1b3",

  // Point
  point_01: "#ee1331",
  point_02: "#ff8787",
  point_03: "#ffcb5d",
  point_04: "#dd1f91",

  // Darkgreen
  darkgreen_0: "#31666d00",
  darkgreen_50: "#31666d5e",
  darkgreen_100: "#31666d45",
  darkgreen_150: "#10616c80",

  // Coolgrey
  coolgrey_0: "#ffffff33",
  coolgrey_10: "#ffffff",
  coolgrey_20: "#f7f8f9",
  coolgrey_30: "#e9f3feb2",
  coolgrey_40: "#e8ebed",
  coolgrey_50: "#c9cdd2",
  coolgrey_60: "#a7b4c31a",
  coolgrey_70: "#93a5b9b2",
  coolgrey_80: "#9ea4aa",
  coolgrey_90: "#72787f",
  coolgrey_100: "#6d7b86",
  coolgrey_110: "#454c53",
  coolgrey_120: "#30464f",
  coolgrey_130: "#394153",
  coolgrey_140: "#303747",
  coolgrey_150: "#2f333e",
  coolgrey_160: "#262c3a",
  coolgrey_170: "#26282b",
  coolgrey_180: "#201f2799",
  coolgrey_190: "#1a1c2480",
  coolgrey_200: "#191d26",
  coolgrey_210: "#18283833",
  coolgrey_220: "#1f222a",
  coolgrey_230: "#1b1d1f",
  coolgrey_240: "#1a1c24",

  black: "#111111",
} as const;

export type ColorToken = keyof typeof color;
