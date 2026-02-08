import { forwardRef, type Ref, type SVGProps } from "react";

const IcArrowUp = (
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
    viewBox="0 0 11 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M9.33333 5.58333L5.16667 1L1 5.58333"
      stroke="#93A5B9"
      strokeOpacity={0.7}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(IcArrowUp);
export default ForwardRef;
