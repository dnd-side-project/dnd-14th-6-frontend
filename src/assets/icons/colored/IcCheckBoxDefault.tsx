import { forwardRef, type Ref, type SVGProps } from "react";

const IcCheckBoxDefault = (
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
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M12 1.5C12.275 1.5 12.5 1.725 12.5 2V12C12.5 12.275 12.275 12.5 12 12.5H2C1.725 12.5 1.5 12.275 1.5 12V2C1.5 1.725 1.725 1.5 2 1.5H12ZM2 0C0.896875 0 0 0.896875 0 2V12C0 13.1031 0.896875 14 2 14H12C13.1031 14 14 13.1031 14 12V2C14 0.896875 13.1031 0 12 0H2Z"
      fill="#9EA4AA"
    />
  </svg>
);
const ForwardRef = forwardRef(IcCheckBoxDefault);
export default ForwardRef;
