"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import CommandDropdown from "./CommandDropdown";
import * as styles from "./CommandInput.css";

export interface Command {
  label: string;
  href: string;
}

const COMMANDS: Command[] = [
  { label: "/start", href: "/game" },
  { label: "/report", href: "/report" },
  { label: "/ranking", href: "/report/ranking" },
  { label: "/setting", href: "/" },
];

const CommandInput = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.startsWith(inputValue.toLowerCase()),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveIndex(0);
  };

  const handleFocus = () => {
    setIsOpen(true);
    setActiveIndex(0);
  };

  const handleSelect = useCallback(
    (href: string) => {
      setIsOpen(false);
      setInputValue("");
      router.push(href);
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredCommands.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(
          (prev) =>
            (prev - 1 + filteredCommands.length) % filteredCommands.length,
        );
        break;
      case "Enter":
        e.preventDefault();
        handleSelect(filteredCommands[activeIndex].href);
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!wrapperRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 150);
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.inputBorder}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="> type /start to begin"
        />
      </div>
      {isOpen && filteredCommands.length > 0 && (
        <CommandDropdown
          commands={filteredCommands}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          onHover={setActiveIndex}
        />
      )}
    </div>
  );
};

export default CommandInput;
