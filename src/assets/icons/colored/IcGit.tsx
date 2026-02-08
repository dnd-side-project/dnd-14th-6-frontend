import { forwardRef, type Ref, type SVGProps } from "react";

const IcGit = (
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
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_20_3343)">
      <g filter="url(#filter0_d_20_3343)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.7341 15.2745L17.7262 3.26528C17.3938 2.93404 16.9436 2.74805 16.4743 2.74805C16.005 2.74805 15.5548 2.93404 15.2223 3.26528L12.7295 5.7609L15.892 8.9234C16.2649 8.79695 16.6658 8.77768 17.049 8.86779C17.4323 8.9579 17.7827 9.15377 18.0601 9.43312C18.3376 9.71247 18.5312 10.0641 18.6187 10.448C18.7062 10.8319 18.6843 11.2326 18.5553 11.6047L21.6037 14.653C22.0592 14.4965 22.5547 14.5007 23.0074 14.6651C23.4602 14.8295 23.8429 15.1441 24.0919 15.5565C24.3408 15.9689 24.4409 16.4541 24.3754 16.9314C24.31 17.4086 24.0829 17.849 23.7322 18.1791C23.3814 18.5092 22.9281 18.7092 22.4478 18.7456C21.9675 18.782 21.4892 18.6528 21.0927 18.3793C20.6961 18.1059 20.4052 17.7048 20.2686 17.2429C20.1319 16.781 20.1576 16.2862 20.3415 15.841L17.498 12.9975V20.4789C17.93 20.6927 18.2757 21.0481 18.4775 21.4859C18.6793 21.9237 18.7249 22.4174 18.6067 22.8847C18.4886 23.3521 18.2139 23.7648 17.8283 24.0541C17.4427 24.3435 16.9696 24.4919 16.4879 24.4747C16.0062 24.4575 15.5449 24.2757 15.1809 23.9596C14.817 23.6435 14.5724 23.2122 14.4879 22.7376C14.4034 22.263 14.4841 21.7738 14.7166 21.3516C14.9491 20.9293 15.3193 20.5994 15.7655 20.417V12.8683C15.5079 12.7631 15.2738 12.608 15.0766 12.4118C14.8794 12.2155 14.7231 11.9822 14.6167 11.7251C14.5103 11.4681 14.456 11.1925 14.4568 10.9144C14.4576 10.6362 14.5136 10.3609 14.6215 10.1045L11.5043 6.98465L3.27085 15.2168C2.93918 15.5493 2.75293 15.9998 2.75293 16.4694C2.75293 16.939 2.93918 17.3895 3.27085 17.722L15.2787 29.7285C15.6112 30.0598 16.0614 30.2458 16.5307 30.2458C17 30.2458 17.4501 30.0598 17.7826 29.7285L29.7341 17.777C30.0658 17.4445 30.252 16.994 30.252 16.5244C30.252 16.0548 30.0658 15.6043 29.7341 15.2718"
          fill="#62EBFE"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_20_3343"
        x={0.85293}
        y={0.848047}
        width={31.299}
        height={31.298}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={0.95} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.384314 0 0 0 0 0.921569 0 0 0 0 0.996078 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_20_3343"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_20_3343"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_20_3343">
        <rect width={33} height={33} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(IcGit);
export default ForwardRef;
