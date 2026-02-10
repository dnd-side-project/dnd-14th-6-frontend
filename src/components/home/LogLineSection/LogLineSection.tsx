"use client";

import { useEffect, useRef, useState } from "react";
import Text from "@/components/common/Text/Text";
import type { LogLineItemProps } from "./LogLineItem";
import LogLineItem from "./LogLineItem";
import * as itemStyles from "./LogLineItem.css";
import * as styles from "./LogLineSection.css";

interface LogLine extends LogLineItemProps {
  id: string;
  gap?: "header" | "section";
}

const LOG_LINES: LogLine[] = [
  {
    id: "header-1",
    variant: "header",
    text: "# Orbit에 오신 것을 환영합니다!",
  },
  {
    id: "header-2",
    variant: "header",
    text: "# 나만의 학습 궤도를 만들어 보세요.",
  },
  {
    id: "intro",
    displayNumber: 1,
    variant: "label",
    label: "INTRO",
    text: ": CLI skill level undefined",
    gap: "header",
  },
  {
    id: "intro-desc",
    displayNumber: 2,
    variant: "description",
    text: "타이핑으로 배우는 실전 커맨드 훈련",
    indented: true,
  },
  {
    id: "error",
    displayNumber: 3,
    variant: "label",
    label: "ERROR",
    text: ": Commands known, execution incorrect.",
  },
  {
    id: "error-desc",
    displayNumber: 4,
    variant: "description",
    text: "# 아는 것 같은데 실제로 쓰면 자꾸 틀림",
    indented: true,
  },
  {
    id: "warning",
    displayNumber: 5,
    variant: "label",
    label: "WARNING",
    text: ": CLI reliance on external references",
  },
  {
    id: "warning-desc",
    displayNumber: 6,
    variant: "description",
    text: "# 터미널 앞에서 매번 AI와 구글링에 의존함",
    indented: true,
  },
  {
    id: "notice",
    displayNumber: 7,
    variant: "label",
    label: "NOTICE",
    text: ": CLI skill level undefined",
  },
  {
    id: "notice-desc",
    displayNumber: 8,
    variant: "description",
    text: "# CLI를 제대로 익히고 현재 실력을 명확히 확인받고 싶음",
    indented: true,
  },
  { id: "empty-9", displayNumber: 9, variant: "empty" },
  {
    id: "comment-1",
    displayNumber: 10,
    variant: "description",
    text: "# 알긴 아는데\u2026 맨날 다시 찾는 그 명령어.",
    indented: true,
  },
  {
    id: "comment-2",
    displayNumber: 11,
    variant: "description",
    text: "# CLI를 '아는 사람'에서 '쓰는 사람'으로.",
    indented: true,
  },
  { id: "empty-12", displayNumber: 12, variant: "empty" },
  {
    id: "status",
    displayNumber: 13,
    variant: "label",
    label: "STATUS",
    text: ": Learning session initializing\u2026",
    indented: true,
  },
  { id: "empty-14", displayNumber: 14, variant: "empty" },
  {
    id: "system-ready",
    displayNumber: 13,
    variant: "bold",
    text: "SYSTEM READY",
    gap: "section",
  },
  {
    id: "system-desc",
    displayNumber: 14,
    variant: "description",
    text: "# 실무 기반 시나리오 타이핑 훈련을 시작합니다.",
    indented: true,
    descriptionColor: "coolgrey_50",
  },
  {
    id: "training",
    displayNumber: 15,
    variant: "bold",
    text: "Training Flow",
  },
  {
    id: "flow-1",
    displayNumber: 16,
    variant: "description",
    text: "1. 실무 시나리오가 순차적으로 내려옵니다.",
    indented: true,
  },
  {
    id: "flow-2",
    displayNumber: 17,
    variant: "description",
    text: "2. 시나리오에 해당하는 명령어를 입력하세요.",
    indented: true,
  },
  {
    id: "flow-3",
    displayNumber: 18,
    variant: "description",
    text: "3. 맞춤형 분석 리포트로 게임 결과를 받아 보세요.",
    indented: true,
  },
];

const getGapClassName = (gap?: "header" | "section") => {
  if (gap === "header") return styles.headerGap;
  if (gap === "section") return styles.sectionGap;
  return undefined;
};

const LINE_REVEAL_DELAY = 120;

const FIRST_NUMBERED_INDEX = LOG_LINES.findIndex(
  (l) => l.displayNumber !== undefined,
);

const LogLineSection = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const verticalLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = slotRefs.current[FIRST_NUMBERED_INDEX];
    if (slot && verticalLineRef.current) {
      verticalLineRef.current.style.top = `${slot.offsetTop}px`;
    }
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
    if (visibleCount >= targetCount) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, LINE_REVEAL_DELAY);

    return () => clearTimeout(timer);
  }, [visibleCount, targetCount]);

  const allVisible = visibleCount >= LOG_LINES.length;

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
              {isVisible && <LogLineItem {...lineProps} />}
            </div>
          );
        })}

        {allVisible && (
          <div className={styles.cursorRow}>
            <div className={itemStyles.lineNumberArea}>
              <Text as="span" variant="body13" color="coolgrey_110">
                19
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
