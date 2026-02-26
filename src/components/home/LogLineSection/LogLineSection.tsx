"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Text from "@/components/common/Text/Text";
import { LOG_LINES } from "@/constants/log-lines";
import LogLineItem from "./LogLineItem";
import * as styles from "./LogLineSection.css";

const getGapClassName = (gap?: "header") => {
  if (gap === "header") return styles.headerGap;
  return undefined;
};

const LINE_PAUSE = 80;

const FIRST_NUMBERED_INDEX = LOG_LINES.findIndex(
  (l) => l.displayNumber !== undefined,
);

const CURSOR_LINE_NUMBER =
  Math.max(...LOG_LINES.map((l) => l.displayNumber ?? 0)) + 1;

const LogLineSection = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const verticalLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRefs.current[FIRST_NUMBERED_INDEX];
    const line = verticalLineRef.current;
    if (!slot || !line) return;

    const updateTop = () => {
      line.style.top = `${slot.offsetTop}px`;
    };
    updateTop();

    const observer = new ResizeObserver(updateTop);
    observer.observe(slot);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (let i = 0; i < slotRefs.current.length; i++) {
      const slot = slotRefs.current[i];
      if (!slot) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTargetCount((prev) => Math.max(prev, i + 1));
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -20% 0px" },
      );

      observer.observe(slot);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (completedCount < visibleCount) return;
    if (visibleCount >= targetCount) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, LINE_PAUSE);

    return () => clearTimeout(timer);
  }, [completedCount, visibleCount, targetCount]);

  const handleTypingComplete = useCallback(() => {
    setCompletedCount((prev) => prev + 1);
  }, []);

  const allTyped = completedCount >= LOG_LINES.length;

  return (
    <section className={styles.section}>
      <div ref={verticalLineRef} className={styles.verticalLine} />

      <div className={styles.content}>
        {LOG_LINES.map((line, i) => {
          const { id, gap, ...lineProps } = line;
          const isVisible = i < visibleCount;

          return (
            <div
              key={id}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className={[styles.lineSlot, getGapClassName(gap)]
                .filter(Boolean)
                .join(" ")}
            >
              {isVisible && (
                <LogLineItem
                  {...lineProps}
                  onTypingComplete={handleTypingComplete}
                />
              )}
            </div>
          );
        })}

        {allTyped && (
          <div className={styles.cursorRow}>
            <div className={styles.cursorNumberArea}>
              <Text as="span" variant="body13" color="coolgrey_110">
                {CURSOR_LINE_NUMBER}
              </Text>
            </div>
            <div className={styles.cursorArea}>
              <div className={styles.cursorBlock} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LogLineSection;
