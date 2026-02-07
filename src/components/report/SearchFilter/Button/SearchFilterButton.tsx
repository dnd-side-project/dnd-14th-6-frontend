import type { ButtonHTMLAttributes } from "react";
import Text from "@/components/common/Text/Text";
import { searchFilterButton } from "./SearchFilterButton.css";

interface SearchFilterButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant: "ok" | "reset";
}

const LABEL = {
  ok: "확인",
  reset: "초기화",
} as const;

const TEXT_VARIANT = {
  ok: "body6",
  reset: "body8",
} as const;

const SearchFilterButton = ({
  variant,
  className,
  ...rest
}: SearchFilterButtonProps) => {
  const combinedClassName = [searchFilterButton({ variant }), className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={combinedClassName} {...rest}>
      <Text
        as="span"
        variant={TEXT_VARIANT[variant]}
        color={variant === "ok" ? "coolgrey_250" : "coolgrey_20"}
      >
        {LABEL[variant]}
      </Text>
    </button>
  );
};

export default SearchFilterButton;
