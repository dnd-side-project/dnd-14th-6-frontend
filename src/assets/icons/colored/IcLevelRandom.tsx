import { forwardRef, useId, type Ref, type SVGProps } from "react";

const STAR_1 =
  "M18.5555 8.66212C19.4219 5.96026 23.2448 5.96026 24.1113 8.66212C26.0064 14.5717 30.3745 19.3671 36.0821 21.804L36.2591 21.8796C38.668 22.9081 38.668 26.3227 36.2591 27.3512L36.0821 27.4268C30.3745 29.8637 26.0064 34.6591 24.1113 40.5687C23.2448 43.2706 19.4219 43.2706 18.5555 40.5687C16.6603 34.6591 12.2922 29.8637 6.58459 27.4268L6.40758 27.3512C3.99872 26.3227 3.99872 22.9081 6.40758 21.8796L6.5846 21.804C12.2922 19.3671 16.6603 14.5717 18.5555 8.66212Z";
const STAR_2 =
  "M61.2224 8.66212C62.0889 5.96026 65.9118 5.96026 66.7783 8.66212C68.6734 14.5717 73.0415 19.3671 78.7491 21.804L78.9261 21.8796C81.335 22.9081 81.335 26.3227 78.9261 27.3512L78.7491 27.4268C73.0415 29.8637 68.6734 34.6591 66.7783 40.5687C65.9118 43.2706 62.0889 43.2706 61.2224 40.5687C59.3273 34.6591 54.9592 29.8637 49.2516 27.4268L49.0746 27.3512C46.6657 26.3227 46.6657 22.9081 49.0746 21.8796L49.2516 21.804C54.9592 19.3671 59.3273 14.5717 61.2224 8.66212Z";
const STAR_3 =
  "M103.888 8.66212C104.755 5.96026 108.578 5.96026 109.444 8.66212C111.339 14.5717 115.708 19.3671 121.415 21.804L121.592 21.8796C124.001 22.9081 124.001 26.3227 121.592 27.3512L121.415 27.4268C115.708 29.8637 111.339 34.6591 109.444 40.5687C108.578 43.2706 104.755 43.2706 103.888 40.5687C101.993 34.6591 97.6252 29.8637 91.9176 27.4268L91.7406 27.3512C89.3317 26.3227 89.3317 22.9081 91.7406 21.8796L91.9176 21.804C97.6252 19.3671 101.993 14.5717 103.888 8.66212Z";

const IcLevelRandom = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => {
  const uid = useId();
  const gPink = `${uid}gPink`;
  const gGold = `${uid}gGold`;
  const gTeal = `${uid}gTeal`;

  return (
    <svg
      width={128}
      height={49}
      viewBox="0 0 128 49.2308"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path d={STAR_1} fill={`url(#${gPink})`} />
      <path d={STAR_2} fill={`url(#${gGold})`} />
      <path d={STAR_3} fill={`url(#${gTeal})`} />
      <defs>
        <linearGradient
          id={gPink}
          x1="20.5128"
          y1="12.8205"
          x2="22.2222"
          y2="47.8633"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DD1F91" />
          <stop offset="1" stopColor="#F68BAB" />
        </linearGradient>
        <linearGradient
          id={gGold}
          x1="63.2483"
          y1="13.6752"
          x2="64.0003"
          y2="49.2308"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD781" />
          <stop offset="1" stopColor="#FFF2D7" />
        </linearGradient>
        <linearGradient
          id={gTeal}
          x1="103.823"
          y1="2.41759"
          x2="127.968"
          y2="5.01776"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#62EBFE" />
          <stop offset="1" stopColor="#B9F6FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const ForwardRef = forwardRef(IcLevelRandom);
export default ForwardRef;
