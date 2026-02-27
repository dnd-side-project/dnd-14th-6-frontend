import { forwardRef, type Ref, type SVGProps } from "react";

const IcThird = (
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
    viewBox="0 0 64 47"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g filter="url(#filter0_di_2614_19417)">
      <path
        d="M19.9532 38.1822C13.4148 38.1822 8.77847 34.5761 8.69922 29.4247H15.515C15.5546 31.3268 17.4567 32.6741 19.9928 32.6741C22.5289 32.6741 24.3517 31.2079 24.3121 29.1473C24.3517 27.0867 22.41 25.5809 19.3984 25.5809H16.6245V20.7464H19.3984C22.0138 20.7464 23.8366 19.3595 23.8366 17.2989C23.8366 15.3572 22.2912 13.9703 19.9928 13.9703C17.6548 13.9703 15.7924 15.3176 15.7528 17.3386H9.25399C9.33324 12.2663 13.8507 8.69995 20.0324 8.69995C26.1746 8.69995 30.375 12.2267 30.3354 16.9027C30.375 20.1124 27.9974 22.3711 24.7084 22.8467V23.0448C29.1069 23.5599 31.4449 26.096 31.4053 29.6624C31.4449 34.6158 26.6501 38.1822 19.9532 38.1822Z"
        fill="url(#paint0_linear_2614_19417)"
      />
    </g>
    <g filter="url(#filter1_di_2614_19417)">
      <path
        d="M50.1145 37.9972C46.918 37.9972 44.3555 35.4875 44.3555 30.6267C44.3555 25.5809 47.0765 23.2561 50.0881 23.2561C52.3865 23.2561 53.6017 24.6034 54.1565 25.8979H54.2621V18.6594H58.7003V37.7859H54.2885V35.4611H54.1565C53.5753 36.7556 52.3072 37.9972 50.1145 37.9972ZM51.6204 34.5101C53.3375 34.5101 54.3414 32.9778 54.3414 30.6002C54.3414 28.2227 53.3639 26.7433 51.6204 26.7433C49.8768 26.7433 48.9257 28.2755 48.9257 30.6002C48.9257 32.9778 49.9032 34.5101 51.6204 34.5101Z"
        fill="url(#paint1_linear_2614_19417)"
      />
    </g>
    <g filter="url(#filter2_di_2614_19417)">
      <path
        d="M34.3945 37.7859V23.4411H38.727V26.03H38.8591C39.3875 24.1544 40.6555 23.2297 42.2406 23.2297C42.6633 23.2297 43.1388 23.309 43.5087 23.3882V27.2717C43.086 27.1396 42.2934 27.0603 41.7387 27.0603C40.0743 27.0603 38.8591 28.2227 38.8591 29.9398V37.7859H34.3945Z"
        fill="url(#paint2_linear_2614_19417)"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_2614_19417"
        x={-0.000781059}
        y={-0.0000486374}
        width={40.107}
        height={46.8822}
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
        <feGaussianBlur stdDeviation={4.35} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.384314 0 0 0 0 0.921569 0 0 0 0 0.996078 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2614_19417"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2614_19417"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={-1} dy={1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0297484 0 0 0 0 0.636536 0 0 0 0 0.864652 0 0 0 0.68 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_2614_19417"
        />
      </filter>
      <filter
        id="filter1_di_2614_19417"
        x={39.1355}
        y={13.4394}
        width={24.7838}
        height={29.7778}
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
        <feGaussianBlur stdDeviation={2.61} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.384314 0 0 0 0 0.921569 0 0 0 0 0.996078 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2614_19417"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2614_19417"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={-0.6} dy={0.6} />
        <feGaussianBlur stdDeviation={0.3} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0297484 0 0 0 0 0.636536 0 0 0 0 0.864652 0 0 0 0.68 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_2614_19417"
        />
      </filter>
      <filter
        id="filter2_di_2614_19417"
        x={29.1745}
        y={18.0097}
        width={19.5533}
        height={24.9962}
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
        <feGaussianBlur stdDeviation={2.61} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.384314 0 0 0 0 0.921569 0 0 0 0 0.996078 0 0 0 0.8 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2614_19417"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2614_19417"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={-0.6} dy={0.6} />
        <feGaussianBlur stdDeviation={0.3} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0297484 0 0 0 0 0.636536 0 0 0 0 0.864652 0 0 0 0.68 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_2614_19417"
        />
      </filter>
      <linearGradient
        id="paint0_linear_2614_19417"
        x1={20.0721}
        y1={2.84402}
        x2={20.0721}
        y2={45.676}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9F9FF" />
        <stop offset={1} stopColor="#A0E7FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2614_19417"
        x1={46.5614}
        y1={15.4682}
        x2={46.5614}
        y2={41.1673}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9F9FF" />
        <stop offset={1} stopColor="#A0E7FF" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_2614_19417"
        x1={46.5599}
        y1={15.4682}
        x2={46.5599}
        y2={41.1674}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9F9FF" />
        <stop offset={1} stopColor="#A0E7FF" />
      </linearGradient>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(IcThird);
export default ForwardRef;
