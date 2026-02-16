"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import FoulLine from "@/components/game/FoulLine/FoulLine";
import GameHeader from "@/components/game/GameHeader/GameHeader";
import ProblemInput from "@/components/game/ProblemInput/ProblemInput";
import type { CategoryType } from "@/components/game/Category/Category";
import type { LevelType } from "@/components/game/Level/Level";
import type { ScoreLevelType } from "@/components/game/ScoreTable/ScoreTable";
import type { Step } from "@/types/game";
import { STEP_LABELS, STEPS } from "@/types/game";
import * as styles from "./page.css";

const TOTAL_TIME = 60;

const DEFAULT_SCORES: Record<ScoreLevelType, number> = {
  hard: 50,
  normal: 30,
  easy: 10,
};

export default function GamePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("playing");
  const currentIndex = STEPS.indexOf(step);

  // ── playing state ──
  const [category] = useState<CategoryType>("git");
  const [level] = useState<LevelType>("easy");
  const [score, setScore] = useState(0);
  const [currentTime] = useState(TOTAL_TIME);
  const [answer, setAnswer] = useState("");

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

  const handleSubmit = () => {
    if (!answer.trim()) return;
    // TODO: 정답 판정 로직
    setScore((prev) => prev + 10);
    setAnswer("");
  };

  // ── playing 화면 ──
  if (step === "playing") {
    return (
      <div className={styles.playingWrapper}>
        <GameHeader
          category={category}
          level={level}
          score={score}
          scores={DEFAULT_SCORES}
          currentTime={currentTime}
          totalTime={TOTAL_TIME}
        />

        <div className={styles.gameArea}>
          {/* TODO: ProblemCard 애니메이션 영역 */}
        </div>

        <div className={styles.foulLineArea}>
          <FoulLine />
        </div>

        <div className={styles.inputArea}>
          <ProblemInput
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  }

  // ── 다른 step 화면 (기존 placeholder) ──
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임</h1>
      <div className={styles.stepCard}>
        <p className={styles.stepCount}>
          {currentIndex + 1} / {STEPS.length}
        </p>
        <p className={styles.stepLabel}>{STEP_LABELS[step]}</p>
      </div>
      <div className={styles.nav}>
        {currentIndex > 0 && (
          <button type="button" onClick={goPrev} className={styles.btnOutline}>
            이전
          </button>
        )}
        <button type="button" onClick={goNext} className={styles.btn}>
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
