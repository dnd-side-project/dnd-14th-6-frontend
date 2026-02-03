import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { textColors, textVariants } from "./Text.css";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: keyof typeof textVariants;
  color?: keyof typeof textColors | "inherit";
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Text = ({
  variant = "body5",
  color = "black",
  children,
  style,
  className,
  ...rest
}: TextProps) => {
  const isInherit = color === "inherit";
  const colorClass = color && !isInherit ? textColors[color] : "";

  const combinedClassName = [textVariants[variant], colorClass, className]
    .filter(Boolean)
    .join(" ");

  const inlineStyle: CSSProperties | undefined = isInherit
    ? { color: "inherit", ...style }
    : style;

  return (
    <p className={combinedClassName} style={inlineStyle} {...rest}>
      {children}
    </p>
  );
};

export default Text;
