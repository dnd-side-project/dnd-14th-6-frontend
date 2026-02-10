import Text from "@/components/common/Text/Text";
import * as styles from "./LogLineItem.css";

export type LineVariant = "header" | "label" | "description" | "empty" | "bold";

export interface LogLineItemProps {
  displayNumber?: number;
  variant: LineVariant;
  label?: string;
  text?: string;
  indented?: boolean;
  descriptionColor?: "coolgrey_80" | "coolgrey_50";
  className?: string;
}

const LogLineItem = ({
  displayNumber,
  variant,
  label,
  text,
  indented = false,
  descriptionColor = "coolgrey_80",
  className,
}: LogLineItemProps) => {
  const rowClassName = [
    styles.row,
    variant === "header" && styles.headerRow,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClassName = [
    styles.contentArea,
    indented && styles.indentedContent,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rowClassName}>
      <div className={styles.lineNumberArea}>
        {displayNumber !== undefined && (
          <Text as="span" variant="body13" color="coolgrey_110">
            {displayNumber}
          </Text>
        )}
      </div>
      <div className={contentClassName}>
        {variant === "header" && (
          <Text as="span" variant="body17" color="primary_150">
            {text}
          </Text>
        )}
        {variant === "label" && (
          <>
            <Text as="span" variant="body12" color="coolgrey_20">
              {label}
            </Text>
            <Text as="span" variant="body12" color="coolgrey_40">
              {text}
            </Text>
          </>
        )}
        {variant === "description" && (
          <Text as="span" variant="body17" color={descriptionColor}>
            {text}
          </Text>
        )}
        {variant === "bold" && (
          <Text as="span" variant="body12" color="coolgrey_20">
            {text}
          </Text>
        )}
      </div>
    </div>
  );
};

export default LogLineItem;
