"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SearchFilterValue } from "@/types/report";
import SearchFilterPanel from "../Panel/SearchFilterPanel";
import SearchFilterTriggerIcon from "../TriggerIcon/SearchFilterTriggerIcon";
import * as styles from "./SearchFilterDropdown.css";

interface SearchFilterDropdownProps {
  selected: boolean;
  value: SearchFilterValue;
  onChange: (value: SearchFilterValue) => void;
  onApply: () => void;
  onReset: () => void;
}

const SearchFilterDropdown = ({
  selected,
  value,
  onChange,
  onApply,
  onReset,
}: SearchFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleApply = useCallback(() => {
    onApply();
    setIsOpen(false);
  }, [onApply]);

  return (
    <div ref={containerRef} className={styles.container}>
      <SearchFilterTriggerIcon selected={selected} onClick={handleToggle} />
      {isOpen && (
        <div className={styles.panelWrapper}>
          <SearchFilterPanel
            value={value}
            onChange={onChange}
            onApply={handleApply}
            onReset={onReset}
          />
        </div>
      )}
    </div>
  );
};

export default SearchFilterDropdown;
