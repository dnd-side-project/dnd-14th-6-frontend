import { keyframes, style } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const container = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  zIndex: 10,
  animation: `${fadeIn} 150ms ease-out forwards`,
  willChange: "opacity",
});

export const lottie = style({
  width: 200,
  height: 200,
});
