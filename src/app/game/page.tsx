"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { CategoryType } from "@/components/game/Category/Category";
import CategoryCard from "@/components/game/CategoryCard/CategoryCard";
import type { LevelType } from "@/components/game/Level/Level";
import LevelCard from "@/components/game/LevelCard/LevelCard";
import ProblemCard from "@/components/game/ProblemCard/ProblemCard";
import StepIndicator from "@/components/game/StepIndicator/StepIndicator";
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

  const startGame = useCallback(() => {
    if (!category || !level) return;
    const session: GameSession = { category, level };
    sessionStorage.setItem(GAME_SESSION_KEY, JSON.stringify(session));
    router.push(ROUTES.GAME_PLAY);
  }, [category, level, router]);

  useEffect(() => {
    if (step !== "tutorial") return;
    window.addEventListener("keydown", startGame);
    return () => window.removeEventListener("keydown", startGame);
  }, [step, startGame]);

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
    goToStep("tutorial");
  };

  if (step === "category") {
    return (
      <div className={styles.categoryWrapper}>
        <div className={styles.guide}>
          <StepIndicator currentStep={1} totalSteps={2} />
          <p className={styles.categoryTitle}>카테고리를 선택해 주세요</p>
        </div>
        <div className={styles.categoryCards}>
          {(["linux", "git", "docker"] as const).map((cat) => (
            <CategoryCard
              key={cat}
              category={cat}
              onClick={() => handleCategorySelect(cat)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === "difficulty") {
    return (
      <div className={styles.categoryWrapper}>
        <div className={styles.guide}>
          <StepIndicator currentStep={2} totalSteps={2} />
          <p className={styles.categoryTitle}>난이도를 선택해 주세요</p>
        </div>
        <div className={styles.levelCards}>
          {(["easy", "normal", "hard", "random"] as const).map((lv) => (
            <LevelCard
              key={lv}
              level={lv}
              onClick={() => handleLevelSelect(lv)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: game tutorial screen - click anywhere to start
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled via window event listener
    <div
      className={level === "random" ? styles.tutorialWrapperRandom : styles.tutorialWrapper}
      onClick={startGame}
    >
      <div className={styles.tutorialGuide}>
        <div className={styles.tutorialBadge}>
          <span className={styles.tutorialBadgeText}>Tutorial</span>
        </div>
        <p className={styles.tutorialTitle}>
          하늘에서 떨어지는 문제를 제한 시간 내에 해결하세요
        </p>
      </div>

      {level === "random" ? (
        <div className={styles.randomContent}>
          <div className={styles.keyboardSectionRandom}>
            <p className={styles.sectionLabel}>방향키</p>
            <div className={styles.keyboardSmall}>
              <div className={styles.keyRowSmall}>
                <div className={styles.keyComboSmall}>
                  <div className={styles.keyBtnShiftSmall}>Shift</div>
                  <span className={styles.keyPlusSmall}>+</span>
                  <div className={styles.keyBtnTabSmall}>Tab</div>
                </div>
                <span className={styles.descChip}>문제 왼쪽 이동</span>
              </div>
              <div className={styles.keyRowSmall}>
                <div className={styles.keyComboSmall}>
                  <div className={styles.keyBtnTabSmall}>Tab</div>
                </div>
                <span className={styles.descChip}>문제 오른쪽 이동</span>
              </div>
              <div className={styles.keyRowSmall}>
                <div className={styles.keyComboSmall}>
                  <div className={styles.keyBtnAltSmall}>Alt</div>
                  <span className={styles.keyPlusSmall}>+</span>
                  <div className={styles.keyBtnTabSmall}>Tab</div>
                </div>
                <span className={styles.descChip}>입력창 선택</span>
              </div>
            </div>
          </div>

          <div className={styles.verticalDivider} />

          <div className={styles.scoringSection}>
            <p className={styles.sectionLabel}>난이도별 배점</p>
            <div className={styles.scoringRows}>
              <div className={styles.scoringRow}>
                <div className={styles.scoringLeft}>
                  <div className={styles.scoringDotHard} />
                  <span className={styles.scoringLabel}>Hard</span>
                </div>
                <span className={styles.scoringScore}>50점</span>
              </div>
              <div className={styles.scoringRow}>
                <div className={styles.scoringLeft}>
                  <div className={styles.scoringDotNormal} />
                  <span className={styles.scoringLabel}>Normal</span>
                </div>
                <span className={styles.scoringScore}>30점</span>
              </div>
              <div className={styles.scoringRow}>
                <div className={styles.scoringLeft}>
                  <div className={styles.scoringDotEasy} />
                  <span className={styles.scoringLabel}>Easy</span>
                </div>
                <span className={styles.scoringScore}>10점</span>
              </div>
            </div>
            <div className={styles.decorCard1}>
              <ProblemCard category="Branch" level="hard" />
            </div>
            <div className={styles.decorCard2}>
              <ProblemCard category="Branch"  level="normal" />
            </div>
            <div className={styles.decorCard3}>
              <ProblemCard category="Branch" level="easy" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.keyboardLarge}>
          <div className={styles.keyRow}>
            <div className={styles.keyCombo}>
              <div className={styles.keyBtnShift}>Shift</div>
              <span className={styles.keyPlus}>+</span>
              <div className={styles.keyBtnTab}>Tab</div>
            </div>
            <span className={styles.descText}>문제 왼쪽 이동</span>
          </div>
          <div className={styles.keyRow}>
            <div className={styles.keyCombo}>
              <div className={styles.keyBtnTab}>Tab</div>
            </div>
            <span className={styles.descText}>문제 오른쪽 이동</span>
          </div>
          <div className={styles.keyRow}>
            <div className={styles.keyCombo}>
              <div className={styles.keyBtnAlt}>Alt</div>
              <span className={styles.keyPlus}>+</span>
              <div className={styles.keyBtnTab}>Tab</div>
            </div>
            <span className={styles.descText}>입력창 선택</span>
          </div>
        </div>
      )}
    </div>
  );
}
