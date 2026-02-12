import { globalStyle, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";
import { fontStyles } from "@/styles/tokens/fontStyles";

export const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "11.4rem",
    padding: "0 6rem",
    backgroundColor: vars.color.coolgrey_210,
    backdropFilter: "blur(9.9px)",
  },
  variants: {
    fixed: {
      true: {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
      },
      false: {
        position: "relative",
      },
    },
  },
  defaultVariants: {
    fixed: true,
  },
});

export const leftSection = style({
  flex: 1,
});

export const rightSection = style({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
});

export const navItem = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "10rem",
    padding: "0.8rem 2rem",
    borderRadius: vars.radius.max,
    textDecoration: "none",
    transition: "color 0.2s ease, background-color 0.2s ease",
  },
  variants: {
    active: {
      true: {
        ...fontStyles.caption12,
        color: vars.color.coolgrey_20,
        backgroundColor: vars.color.coolgrey_120,
      },
      false: {
        ...fontStyles.caption13,
        color: vars.color.coolgrey_80,
        selectors: {
          "&:hover": {
            ...fontStyles.caption9,
            color: vars.color.coolgrey_50,
          },
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const loginLink = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1.2rem 2rem",
  background: vars.gradient.main_background,
  borderRadius: vars.radius.max,
  boxShadow: `inset 1px 1px 4px 0px ${vars.color.primary_250}`,
  backdropFilter: "blur(4px)",
  textDecoration: "none",
  cursor: "pointer",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      borderRadius: "inherit",
      padding: "0.2px",
      background: vars.gradient.glass_outstroke,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      maskComposite: "exclude",
      pointerEvents: "none",
      transition: "padding 0.2s ease",
    },
    "&:hover": {
      transform: "scale(1.09)",
      boxShadow: `inset 1.088px 1.088px 2.721px ${vars.color.primary_250}, inset 0px 4.354px 20.246px #62ebfe70`,
    },
    "&:hover::before": {
      padding: "0.5px",
    },
  },
});

globalStyle(`${loginLink}:hover span`, {
  fontWeight: 600,
});

export const profileSection = style({
  display: "flex",
  alignItems: "center",
  gap: "1.8rem",
});

const profileBase = {
  position: "relative" as const,
  width: "4.8rem",
  height: "4.8rem",
  borderRadius: vars.radius.max,
  background: vars.gradient.main_background,
  boxShadow: `inset 1px 1px 4px 0px ${vars.color.primary_250}`,
};

const profileBorderBefore = {
  content: '""',
  position: "absolute" as const,
  inset: 0,
  borderRadius: "inherit",
  padding: "0.2px",
  background: vars.gradient.glass_outstroke,
  WebkitMask:
    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor" as const,
  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  maskComposite: "exclude" as const,
  pointerEvents: "none" as const,
};

export const profileImage = style({
  ...profileBase,
  objectFit: "cover",
  selectors: {
    "&::before": profileBorderBefore,
  },
});

export const profilePlaceholder = style({
  ...profileBase,
  selectors: {
    "&::before": profileBorderBefore,
  },
});
