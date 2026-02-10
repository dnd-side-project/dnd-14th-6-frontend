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
}

const LogLineItem = ({
  displayNumber,
  variant,
  label,
  text,
  indented = false,
  descriptionColor = "coolgrey_80",
}: LogLineItemProps) => {
  const rowClassName = [styles.row, variant === "header" && styles.headerRow]
    .filter(Boolean)
    .join(" ");

  const contentClassName = [
    styles.contentArea,
    indented && styles.indentedContent,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    switch (variant) {
      case "header":
        return (
          <Text as="span" variant="body17" color="primary_150">
            {text}
          </Text>
        );
      case "label":
        return (
          <>
            <Text as="span" variant="body12" color="coolgrey_20">
              {label}
            </Text>
            <Text as="span" variant="body12" color="coolgrey_40">
              {text}
            </Text>
          </>
        );
      case "description":
        return (
          <Text as="span" variant="body17" color={descriptionColor}>
            {text}
          </Text>
        );
      case "bold":
        return (
          <Text as="span" variant="body12" color="coolgrey_20">
            {text}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <div className={rowClassName}>
      <div className={styles.lineNumberArea}>
        {displayNumber !== undefined && (
          <Text as="span" variant="body13" color="coolgrey_110">
            {displayNumber}
          </Text>
        )}
      </div>
      <div className={contentClassName}>{renderContent()}</div>
    </div>
  );
};

export default LogLineItem;
