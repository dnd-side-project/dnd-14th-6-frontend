import { forwardRef, type Ref, type SVGProps } from "react";
import { IcTimerDefault, IcTimerRed } from "@/assets/icons/colored";

export type TimerVariant = "default" | "red";

interface TimerProps extends SVGProps<SVGSVGElement> {
  variant?: TimerVariant;
  size?: number | string;
}

const TIMER_ICONS = {
  default: IcTimerDefault,
  red: IcTimerRed,
} as const;

const Timer = (
  { variant = "default", size = 24, ...props }: TimerProps,
  ref: Ref<SVGSVGElement>,
) => {
  const Icon = TIMER_ICONS[variant];
  return <Icon ref={ref} size={size} {...props} />;
};

const ForwardRef = forwardRef(Timer);
export default ForwardRef;
