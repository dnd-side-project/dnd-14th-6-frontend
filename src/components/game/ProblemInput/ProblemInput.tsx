"use client";

import type { InputHTMLAttributes, KeyboardEvent, Ref } from "react";
import * as styles from "./ProblemInput.css";

interface ProblemInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  ref?: Ref<HTMLInputElement>;
  onSubmit?: () => void;
}

const ProblemInput = ({
  ref,
  onSubmit,
  onKeyDown,
  placeholder = "정답을 입력해 주세요",
  ...props
}: ProblemInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
    onKeyDown?.(e);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <input
          ref={ref}
          className={styles.input}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          type="text"
          {...props}
        />
        <span className={styles.hint}>PRESS ENTER ↵</span>
      </div>
    </div>
  );
};

export default ProblemInput;
