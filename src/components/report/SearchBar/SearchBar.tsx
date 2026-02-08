import { type InputHTMLAttributes, useState } from "react";
import { IcSearch } from "@/assets/icons/colored";
import { icon, input, wrapper } from "./SearchBar.css";

interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "검색",
  onFocus,
  onBlur,
  ...rest
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const showIcon = !focused && value.length === 0;

  return (
    <div className={wrapper}>
      {showIcon && <IcSearch size={20} className={icon} />}
      <input
        type="text"
        className={input}
        value={value}
        onChange={onChange}
        placeholder={showIcon ? placeholder : undefined}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
    </div>
  );
};

export default SearchBar;
