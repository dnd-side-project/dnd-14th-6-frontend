import type { HTMLAttributes } from "react";
import * as styles from "./FoulLine.css";

type FoulLineVariant = "default" | "error";

interface FoulLineProps extends HTMLAttributes<HTMLDivElement> {
  variant?: FoulLineVariant;
}

export default function FoulLine({
  variant = "default",
  className,
  ...rest
}: FoulLineProps) {
  return (
    <div
      className={`${styles.wrapper}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <div className={styles.line[variant]} />
    </div>
  );
}
