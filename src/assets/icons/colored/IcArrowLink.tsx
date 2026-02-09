import { forwardRef, type Ref, type SVGProps } from "react";

const IcArrowLink = (
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
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_31_2542)">
      <path
        d="M4.99927 19L17.9993 6"
        stroke="#6D7B86"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 17.7012V6.00117H6.30005"
        stroke="#6D7B86"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_31_2542">
        <rect
          width={24}
          height={24}
          fill="white"
          transform="matrix(1 0 0 -1 0 24)"
        />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(IcArrowLink);
export default ForwardRef;
