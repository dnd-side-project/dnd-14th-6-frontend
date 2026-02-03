import { recipe } from "@vanilla-extract/recipes";

export const flexStyle = recipe({
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
      rowReverse: { flexDirection: "row-reverse" },
      columnReverse: { flexDirection: "column-reverse" },
    },
    align: {
      flexStart: { alignItems: "flex-start" },
      flexEnd: { alignItems: "flex-end" },
      center: { alignItems: "center" },
      stretch: { alignItems: "stretch" },
      baseline: { alignItems: "baseline" },
    },
    justify: {
      flexStart: { justifyContent: "flex-start" },
      flexEnd: { justifyContent: "flex-end" },
      center: { justifyContent: "center" },
      spaceBetween: { justifyContent: "space-between" },
      spaceAround: { justifyContent: "space-around" },
      spaceEvenly: { justifyContent: "space-evenly" },
    },
    wrap: {
      nowrap: { flexWrap: "nowrap" },
      wrap: { flexWrap: "wrap" },
      wrapReverse: { flexWrap: "wrap-reverse" },
    },
    grow: {
      0: { flexGrow: 0 },
      1: { flexGrow: 1 },
    },
    shrink: {
      0: { flexShrink: 0 },
      1: { flexShrink: 1 },
    },
  },
  defaultVariants: {
    direction: "row",
    align: "stretch",
    justify: "flexStart",
    wrap: "nowrap",
  },
});
