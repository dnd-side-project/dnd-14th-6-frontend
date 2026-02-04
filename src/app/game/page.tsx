"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Step } from "@/types/game";
import { STEP_LABELS, STEPS } from "@/types/game";
import * as styles from "../page.css";
import * as gameStyles from "./page.css";

export default function GamePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("category");
  const currentIndex = STEPS.indexOf(step);

  const goNext = () => {
    if (step === "end") {
      const hasBadge = true; // TODO: 실제 조건으로 교체
      if (hasBadge) {
        setStep("badge");
      } else {
        router.push("/game/result");
      }
      return;
    }
    if (step === "badge") {
      router.push("/game/result");
      return;
    }
    setStep(STEPS[currentIndex + 1]);
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임</h1>
      <div className={gameStyles.stepCard}>
        <p className={gameStyles.stepCount}>
          {currentIndex + 1} / {STEPS.length}
        </p>
        <p className={gameStyles.stepLabel}>{STEP_LABELS[step]}</p>
      </div>
      <div className={styles.nav}>
        {currentIndex > 0 && step !== "playing" && (
          <button
            type="button"
            onClick={goPrev}
            className={gameStyles.btnOutline}
          >
            이전
          </button>
        )}
        <button type="button" onClick={goNext} className={gameStyles.btn}>
          {step === "badge"
            ? "결과 보기"
            : step === "end"
              ? "다음"
              : "다음 단계"}
        </button>
      </div>
    </div>
  );
}
