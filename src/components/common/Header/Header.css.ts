import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "11.4rem",
    padding: "0 5.6rem",
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

export const logoPlaceholder = style({
  width: "16.2rem",
  height: "5.4rem",
  backgroundColor: vars.color.coolgrey_120,
  borderRadius: vars.radius.s,
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.6rem 2.2rem",
  borderRadius: "99px",
});

export const navItem = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "9.4rem",
    padding: "0.7rem 2.4rem",
    borderRadius: "99px",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
  },
  variants: {
    active: {
      true: {
        backgroundColor: "rgba(58, 87, 103, 0.6)",
        backdropFilter: "blur(20px)",
      },
      false: {
        backgroundColor: "transparent",
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const rightSection = style({
  display: "flex",
  alignItems: "center",
  gap: "1.9rem",
});

export const loginButton = style({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "1.1rem 1.9rem",
  background: vars.gradient.main_background,
  border: "0.2px solid white",
  borderRadius: "99px",
  boxShadow: `inset 1px 1px 4px 0px ${vars.color.primary_250}`,
  cursor: "pointer",
});

export const profileSection = style({
  display: "flex",
  alignItems: "center",
  gap: "1.9rem",
});

export const profileImage = style({
  width: "4.8rem",
  height: "4.8rem",
  borderRadius: "99px",
  background: vars.gradient.main_background,
  border: "0.2px solid white",
  boxShadow: `inset 1px 1px 4px 0px ${vars.color.primary_250}`,
  objectFit: "cover",
});

export const profilePlaceholder = style({
  width: "4.8rem",
  height: "4.8rem",
  borderRadius: "99px",
  background: vars.gradient.main_background,
  border: "0.2px solid white",
  boxShadow: `inset 1px 1px 4px 0px ${vars.color.primary_250}`,
});
