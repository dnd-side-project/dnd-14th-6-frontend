import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { textColors, textVariants } from "./Text.css";

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  as?: ElementType;
  variant?: keyof typeof textVariants;
  color?: keyof typeof textColors | "inherit";
  children: ReactNode;
}

const Text = ({
  as: Component = "p",
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
    <Component className={combinedClassName} style={inlineStyle} {...rest}>
      {children}
    </Component>
  );
};

export default Text;
