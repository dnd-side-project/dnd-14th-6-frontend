"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { CategoryType } from "@/components/game/Category/Category";
import type { LevelType } from "@/components/game/Level/Level";
import { ROUTES } from "@/constants/routes";
import type { GameSession, SetupStep } from "@/types/game";
import { GAME_SESSION_KEY } from "@/types/game";
import * as styles from "./page.css";

const HISTORY_STATE_KEY = "gameSetupStep";

export default function GamePage() {
  const router = useRouter();
  const [step, setStep] = useState<SetupStep>("category");
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [level, setLevel] = useState<LevelType | null>(null);

  useEffect(() => {
    window.history.replaceState({ [HISTORY_STATE_KEY]: "category" }, "");

    const handlePopState = (e: PopStateEvent) => {
      const state = e.state?.[HISTORY_STATE_KEY] as SetupStep | undefined;
      if (state) {
        setStep(state);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const goToStep = (nextStep: SetupStep) => {
    window.history.pushState({ [HISTORY_STATE_KEY]: nextStep }, "");
    setStep(nextStep);
  };

  const handleCategorySelect = (selected: CategoryType) => {
    setCategory(selected);
    goToStep("difficulty");
  };

  const handleLevelSelect = (selected: LevelType) => {
    setLevel(selected);
  };

  const handleStartGame = () => {
    if (!category || !level) return;
    const session: GameSession = { category, level };
    sessionStorage.setItem(GAME_SESSION_KEY, JSON.stringify(session));
    router.push(ROUTES.GAME_PLAY);
  };

  if (step === "category") {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>카테고리 선택</h1>
        <p className={styles.description}>플레이할 카테고리를 선택하세요.</p>
        <div className={styles.nav}>
          {(["git", "linux", "docker"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              className={category === cat ? styles.btn : styles.btnOutline}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === "difficulty") {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>난이도 선택</h1>
        <p className={styles.description}>
          {category?.toUpperCase()} — 난이도를 선택하세요.
        </p>
        <div className={styles.nav}>
          {(["easy", "normal", "hard", "random"] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              className={level === lv ? styles.btn : styles.btnOutline}
              onClick={() => handleLevelSelect(lv)}
            >
              {lv.charAt(0).toUpperCase() + lv.slice(1)}
            </button>
          ))}
        </div>
        {level ? (
          <div className={styles.startButtonArea}>
            <button
              type="button"
              className={styles.btn}
              onClick={handleStartGame}
            >
              게임 시작
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  // TODO: 튜토리얼 화면 구현
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>튜토리얼</h1>
      <p className={styles.description}>게임 방법을 안내합니다.</p>
      <div className={styles.nav}>
        <button type="button" className={styles.btn} onClick={handleStartGame}>
          게임 시작
        </button>
      </div>
    </div>
  );
}
