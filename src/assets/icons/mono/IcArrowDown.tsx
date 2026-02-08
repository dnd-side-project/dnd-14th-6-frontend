import { forwardRef, type Ref, type SVGProps } from "react";
import { type ColorToken, color as colorTokens } from "@/styles/tokens/color";

type IconColor = ColorToken | "currentColor" | (string & {});
const IcArrowDown = (
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
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        d="M9.33333 1.00016L5.16667 5.5835L1 1.00016"
        stroke="#93A5B9"
        strokeOpacity={0.7}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const ForwardRef = forwardRef(IcArrowDown);
export default ForwardRef;
