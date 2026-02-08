import type { ReactNode } from "react";
import { mark as markStyle } from "./HighlightText.css";

interface HighlightTextProps {
  text: string;
  keyword: string;
}

const HighlightText = ({ text, keyword }: HighlightTextProps): ReactNode => {
  if (!keyword.trim()) {
    return text;
  }

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedKeyword})`, "gi"));

  return parts.map((part, index) => {
    const key = `${index}-${part}`;
    if (part.toLowerCase() === keyword.toLowerCase()) {
      return (
        <mark key={key} className={markStyle}>
          {part}
        </mark>
      );
    }
    return part;
  });
};

export default HighlightText;
