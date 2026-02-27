import { forwardRef, type Ref, type SVGProps } from "react";

const IcPageRight = (
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
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M16.0834 15L12.2757 18.7248C12.1356 18.8667 12.0581 19.0568 12.0598 19.2541C12.0616 19.4514 12.1425 19.6401 12.2851 19.7796C12.4277 19.9191 12.6207 19.9983 12.8223 20C13.024 20.0017 13.2183 19.9258 13.3634 19.7888L17.715 15.532C17.8592 15.3909 17.9402 15.1995 17.9402 15C17.9402 14.8005 17.8592 14.6091 17.715 14.468L13.3634 10.2112C13.2183 10.0742 13.024 9.99831 12.8223 10C12.6207 10.0017 12.4277 10.0809 12.2851 10.2204C12.1425 10.3599 12.0616 10.5486 12.0598 10.7459C12.0581 10.9432 12.1356 11.1333 12.2757 11.2752L16.0834 15V15Z"
      fill="#6D7B86"
    />
  </svg>
);
const ForwardRef = forwardRef(IcPageRight);
export default ForwardRef;
