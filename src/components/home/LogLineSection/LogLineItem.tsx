import { useEffect, useRef, useState } from "react";
import Text from "@/components/common/Text/Text";
import * as styles from "./LogLineItem.css";

export type LineVariant = "header" | "label" | "description" | "empty" | "bold";

export interface LogLineItemProps {
  displayNumber?: number;
  variant: LineVariant;
  label?: string;
  text?: string;
  indented?: boolean;
  descriptionColor?: "coolgrey_85" | "coolgrey_55";
}

const TYPING_SPEED = 35;

const LogLineItem = ({
  displayNumber,
  variant,
  label,
  text,
  indented = false,
  descriptionColor = "coolgrey_85",
  onTypingComplete,
}: LogLineItemProps & { onTypingComplete?: () => void }) => {
  const fullText =
    variant === "label" ? `${label ?? ""}${text ?? ""}` : (text ?? "");
  const [typedLength, setTypedLength] = useState(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onTypingComplete);
  onCompleteRef.current = onTypingComplete;

  useEffect(() => {
    if (variant === "empty" || fullText.length === 0) {
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    if (typedLength >= fullText.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    const timer = setTimeout(() => {
      setTypedLength((prev) => prev + 1);
    }, TYPING_SPEED);

    return () => clearTimeout(timer);
  }, [typedLength, fullText, variant]);

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
            {fullText.slice(0, typedLength)}
          </Text>
        );
      case "label": {
        const labelLen = label?.length ?? 0;
        return (
          <>
            <Text as="span" variant="body12" color="coolgrey_45">
              {fullText.slice(0, Math.min(typedLength, labelLen))}
            </Text>
            <Text as="span" variant="body12" color="coolgrey_45">
              {typedLength > labelLen
                ? fullText.slice(labelLen, typedLength)
                : ""}
            </Text>
          </>
        );
      }
      case "description":
        return (
          <Text as="span" variant="body17" color={descriptionColor}>
            {fullText.slice(0, typedLength)}
          </Text>
        );
      case "bold":
        return (
          <Text as="span" variant="body12" color="coolgrey_45">
            {fullText.slice(0, typedLength)}
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
          <Text as="span" variant="body13" color="coolgrey_115">
            {displayNumber}
          </Text>
        )}
      </div>
      <div className={contentClassName}>{renderContent()}</div>
    </div>
  );
};

export default LogLineItem;
