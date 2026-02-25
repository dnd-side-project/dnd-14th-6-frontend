import { forwardRef, type Ref, type SVGProps } from "react";
import { type ColorToken, color as colorTokens } from "@/styles/tokens/color";

type IconColor = ColorToken | "currentColor" | (string & {});
const IcClose = (
  {
    size = 24,
    color = "currentColor",
    style,
    ...props
  }: Omit<SVGProps<SVGSVGElement>, "color"> & {
    size?: number | string;
    color?: IconColor;
  },
  ref: Ref<SVGSVGElement>,
) => {
  const resolvedColor =
    color === "currentColor"
      ? "currentColor"
      : color in colorTokens
        ? colorTokens[color as ColorToken]
        : color;
  return (
    <svg
      style={{
        ...style,
        color: resolvedColor,
      }}
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M1.75 18.75L17.75 1.75M1.75 1.75L17.75 18.75"
        stroke="currentColor"
        strokeOpacity={0.7}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </svg>
  );
};
const ForwardRef = forwardRef(IcClose);
export default ForwardRef;
