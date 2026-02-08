import { style } from "@vanilla-extract/css";

export const footer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2.9rem",
  width: "100%",
  paddingTop: "2.9rem",
  paddingBottom: "7.2rem",
});

export const divider = style({
  width: "18.75rem",
  height: "0.0625rem",
  opacity: 0.48,
  background:
    "linear-gradient(90deg, rgba(255, 255, 255, 0.02) -1%, rgba(255, 255, 255, 0.10) 28.13%, rgba(255, 255, 255, 0.65) 52.9%, rgba(255, 255, 255, 0.10) 71.94%, rgba(255, 255, 255, 0.02) 100%)",
});
