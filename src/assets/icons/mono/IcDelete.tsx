import { forwardRef, type Ref, type SVGProps } from "react";

const IcDelete = (
  {
    size = 24,
    color = "currentColor",
    ...props
  }: SVGProps<SVGSVGElement> & {
    size?: number | string;
    color?: string;
  },
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M17 7L7 17M7 7L17 17"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(IcDelete);
export default ForwardRef;
