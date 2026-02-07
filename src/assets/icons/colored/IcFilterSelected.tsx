import { forwardRef, type Ref, type SVGProps } from "react";

const IcFilterSelected = (
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
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <rect width={50} height={50} rx={6} fill="url(#paint0_linear_1334_5590)" />
    <g clipPath="url(#clip0_1334_5590)">
      <path
        d="M12.1981 17.7888C12.5338 17.0767 13.2459 16.624 14.0342 16.624H36.0069C36.7953 16.624 37.5073 17.0767 37.843 17.7888C38.1787 18.5009 38.077 19.3401 37.5785 19.9504L28.2758 31.3182V37.7829C28.2758 38.3983 27.9299 38.9629 27.3755 39.2375C26.8211 39.5122 26.165 39.4563 25.6716 39.085L22.4164 36.6436C22.0044 36.3384 21.7654 35.8552 21.7654 35.3415V31.3182L12.4575 19.9454C11.9641 19.3401 11.8573 18.4958 12.1981 17.7888Z"
        fill="#E8EBED"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1334_5590"
        x1={0}
        y1={25}
        x2={50}
        y2={25}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1CA1B3" />
        <stop offset={1} stopColor="#2D565C" />
      </linearGradient>
      <clipPath id="clip0_1334_5590">
        <path d="M12 14.999H38.0417V41.0407H12V14.999Z" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(IcFilterSelected);
export default ForwardRef;
