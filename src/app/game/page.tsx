"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = ["category", "difficulty", "tutorial", "playing", "end", "badge"] as const;
type Step = (typeof STEPS)[number];

const STEP_LABELS: Record<Step, string> = {
  category: "카테고리 선택",
  difficulty: "난이도 선택",
  tutorial: "튜토리얼",
  playing: "게임 진행 중",
  end: "게임 종료",
  badge: "뱃지 획득",
};

export default function GamePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("category");
  const currentIndex = STEPS.indexOf(step);

  const goNext = () => {
    if (step === "end") {
      // 뱃지 조건 충족 시 badge로, 아니면 바로 결과로
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
    <div>
      <h1>게임</h1>
      <p>
        현재 단계: <strong>{STEP_LABELS[step]}</strong>
      </p>
      <p style={{ color: "#888", fontSize: 14 }}>
        ({currentIndex + 1} / {STEPS.length})
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        {currentIndex > 0 && step !== "playing" && (
          <button type="button" onClick={goPrev}>
            이전
          </button>
        )}
        <button type="button" onClick={goNext}>
          {step === "badge" ? "결과 보기" : step === "end" ? "다음" : "다음 단계"}
        </button>
      </div>
    </div>
  );
}
