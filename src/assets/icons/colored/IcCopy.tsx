import { forwardRef, type Ref, type SVGProps } from "react";

const IcCopy = (
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
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M19.25 14.6668V3.83349C19.25 2.72893 18.3546 1.8335 17.25 1.8335H8.25M13.5833 20.1668H5.66667C4.5621 20.1668 3.66667 19.2714 3.66667 18.1668V7.50016C3.66667 6.39559 4.5621 5.50016 5.66667 5.50016H13.5833C14.6879 5.50016 15.5833 6.3956 15.5833 7.50016V18.1668C15.5833 19.2714 14.6879 20.1668 13.5833 20.1668Z"
      stroke="#6D7B86"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(IcCopy);
export default ForwardRef;
