import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@/styles/theme.css";

export const buttonStyle = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.6rem",
    padding: "1.6rem",
    borderRadius: vars.radius.s,
    border: "none",
    cursor: "pointer",
    width: "34.4rem",
    transition: "transform 0.2s ease",
    selectors: {
      "&:hover": {
        transform: "scale(1.06)",
      },
    },
  },
  variants: {
    provider: {
      github: {
        position: "relative",
        background: vars.gradient.login_github,
        boxShadow: vars.effect.login_github,
        backdropFilter: "blur(84px)",
        height: "5rem",
        selectors: {
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            padding: "0 0.25px",
            background: vars.gradient.glass_outstroke,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
        },
      },
      google: {
        backgroundColor: vars.color.coolgrey_10,
        height: "4.8rem",
      },
    },
  },
});
