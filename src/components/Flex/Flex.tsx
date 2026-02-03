import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";
import { flexStyle } from "./Flex.css";

type FlexDirection = "row" | "column" | "rowReverse" | "columnReverse";
type FlexAlign = "flexStart" | "flexEnd" | "center" | "stretch" | "baseline";
type FlexJustify =
  | "flexStart"
  | "flexEnd"
  | "center"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";
type FlexWrap = "nowrap" | "wrap" | "wrapReverse";
type FlexAlignSelf =
  | "auto"
  | "flexStart"
  | "flexEnd"
  | "center"
  | "stretch"
  | "baseline";

type SpacingValue = number | string;

const alignSelfMap: Record<FlexAlignSelf, CSSProperties["alignSelf"]> = {
  auto: "auto",
  flexStart: "flex-start",
  flexEnd: "flex-end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
};

const toRem = (value: SpacingValue | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === "number") return `${value}rem`;
  return value;
};

const buildSpacingStyles = (
  props: Partial<Record<string, SpacingValue>>,
): CSSProperties => {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) {
      styles[key] = toRem(value) as string;
    }
  }
  return styles;
};

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  wrap?: FlexWrap;
  grow?: 0 | 1;
  shrink?: 0 | 1;
  flex?: CSSProperties["flex"];
  alignSelf?: FlexAlignSelf;
  gap?: SpacingValue;
  width?: SpacingValue;
  height?: SpacingValue;
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingRight?: SpacingValue;
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginRight?: SpacingValue;
  children?: ReactNode;
}

const Flex = ({
  as: Component = "div",
  direction,
  align,
  justify,
  wrap,
  grow,
  shrink,
  flex,
  alignSelf,
  gap,
  width,
  height,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  style,
  className,
  children,
  ...rest
}: FlexProps) => {
  const inlineStyle: CSSProperties = {
    ...(flex !== undefined && { flex }),
    ...(alignSelf !== undefined && { alignSelf: alignSelfMap[alignSelf] }),
    ...buildSpacingStyles({
      gap,
      width,
      height,
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
    }),
    ...style,
  };

  const combinedClassName = [
    flexStyle({ direction, align, justify, wrap, grow, shrink }),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={combinedClassName} style={inlineStyle} {...rest}>
      {children}
    </Component>
  );
};

export default Flex;
