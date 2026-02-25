import IcClose from "@/assets/icons/mono/IcClose";
import IcRefresh from "@/assets/icons/mono/IcRefresh";

import * as styles from "./CircleIconButton.css";

interface CircleIconButtonProps {
  variant: "refresh" | "close";
  onClick?: () => void;
  className?: string;
}

const iconMap = {
  refresh: <IcRefresh size={20} color="currentColor" />,
  close: <IcClose size={16} color="currentColor" />,
} as const;

export default function CircleIconButton({
  variant,
  onClick,
  className,
}: CircleIconButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button}${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {iconMap[variant]}
    </button>
  );
}
