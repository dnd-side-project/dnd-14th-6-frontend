import { forwardRef, type Ref, type SVGProps } from "react";

const IcClose = (
  {
    size = 24,
    ...props
  }: SVGProps<SVGSVGElement> & {
    size?: number | string;
  },
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <circle cx={18} cy={18} r={18} fill="#262C3A" />
    <path
      d="M10 27L26 10M10 10L26 27"
      stroke="#93A5B9"
      strokeOpacity={0.7}
      strokeWidth={3.5}
      strokeLinecap="round"
    />
  </svg>
);
const ForwardRef = forwardRef(IcClose);
export default ForwardRef;
