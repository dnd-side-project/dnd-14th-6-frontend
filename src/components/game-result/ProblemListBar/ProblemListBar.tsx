"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ReportDto } from "@/types/api";

import ProblemListItem from "../ProblemListItem/ProblemListItem";
import * as styles from "./ProblemListBar.css";

interface ProblemListBarProps {
  reports: ReportDto[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const THUMB_PERCENT = 10;

export default function ProblemListBar({
  reports,
  selectedIndex,
  onSelect,
}: ProblemListBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [showThumb, setShowThumb] = useState(false);

  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 5) {
      setShowThumb(false);
      return;
    }
    setShowThumb(true);
    const ratio = el.scrollTop / maxScroll;
    setThumbTop(ratio * (100 - THUMB_PERCENT));
  }, []);

  useEffect(() => {
    updateThumb();
  }, [updateThumb]);

  const containerClass = [styles.container, showThumb && styles.hasScroll]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={scrollRef} className={containerClass} onScroll={updateThumb}>
      {reports.map((report, index) => (
        <ProblemListItem
          key={report.problemId}
          index={index + 1}
          subCategory={report.subCategory}
          isSelected={index === selectedIndex}
          onClick={() => onSelect(index)}
        />
      ))}
      {showThumb && (
        <div className={styles.scrollTrack}>
          <div
            className={styles.scrollThumb}
            style={{ top: `${thumbTop}%`, height: `${THUMB_PERCENT}%` }}
          />
        </div>
      )}
    </div>
  );
}
