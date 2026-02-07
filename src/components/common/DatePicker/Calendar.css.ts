import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const calendarPopup = style({
  backgroundColor: vars.color.coolgrey_150,
  borderRadius: vars.radius.s,
  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  padding: "2rem 1.6rem",
  gap: "2rem",
});

export const monthSection = style({
  width: "25.8rem",
});

export const navigationButton = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0.7rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const dayGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
});

export const dayOfWeekCell = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "3.6rem",
});

export const emptyCell = style({
  height: "3.6rem",
});

export const dayCellWrapper = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "3.6rem",
  },
  variants: {
    rangePosition: {
      none: {},
      start: {
        selectors: {
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translateY(-50%)",
            width: "50%",
            height: "3.4rem",
            backgroundColor: vars.color.coolgrey_120,
          },
        },
      },
      middle: {
        selectors: {
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            width: "100%",
            height: "3.4rem",
            backgroundColor: vars.color.coolgrey_120,
          },
        },
      },
      end: {
        selectors: {
          "&::before": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translateY(-50%)",
            width: "50%",
            height: "3.4rem",
            backgroundColor: vars.color.coolgrey_120,
          },
        },
      },
      single: {},
    },
    weekEdge: {
      none: {},
      left: {},
      right: {},
    },
  },

  compoundVariants: [
    {
      variants: { rangePosition: "middle", weekEdge: "left" },
      style: {
        selectors: {
          "&::before": {
            borderRadius: "8px 0 0 8px",
          },
        },
      },
    },
    {
      variants: { rangePosition: "middle", weekEdge: "right" },
      style: {
        selectors: {
          "&::before": {
            borderRadius: "0 8px 8px 0",
          },
        },
      },
    },
  ],

  defaultVariants: {
    rangePosition: "none",
    weekEdge: "none",
  },
});

export const dayNumber = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "3.6rem",
    height: "3.6rem",
    borderRadius: "100px",
    cursor: "pointer",
    position: "relative",
    zIndex: 1,
    background: "none",
    border: "none",
    ...fontStyles.body10,
    color: vars.color.coolgrey_80,
    transition: "background-color 0.15s, color 0.15s",
    selectors: {
      "&:hover": {
        backgroundColor: vars.color.coolgrey_130,
        color: vars.color.coolgrey_40,
      },
    },
  },
  variants: {
    state: {
      default: {},
      today: {
        color: vars.color.primary_default,
      },
      rangeStart: {
        backgroundColor: vars.color.primary_250,
        color: vars.color.coolgrey_40,
        ...fontStyles.body9,
        selectors: {
          "&:hover": {
            backgroundColor: vars.color.primary_250,
            color: vars.color.coolgrey_40,
          },
        },
      },
      rangeEnd: {
        backgroundColor: vars.color.primary_250,
        color: vars.color.coolgrey_40,
        ...fontStyles.body9,
        selectors: {
          "&:hover": {
            backgroundColor: vars.color.primary_250,
            color: vars.color.coolgrey_40,
          },
        },
      },
      inRange: {
        color: vars.color.coolgrey_40,
        ...fontStyles.body9,
        selectors: {
          "&:hover": {
            backgroundColor: "transparent",
            color: vars.color.coolgrey_40,
          },
        },
      },
    },
  },
  defaultVariants: {
    state: "default",
  },
});
