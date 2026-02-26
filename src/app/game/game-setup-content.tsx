"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import CategoryCard from "@/components/game/CategoryCard/CategoryCard";
import { isValidLevel } from "@/components/game/Level/Level";
import LevelCard from "@/components/game/LevelCard/LevelCard";
import StepIndicator from "@/components/game/StepIndicator/StepIndicator";
import { ROUTES } from "@/constants/routes";
import { useGetGameOptionsSuspenseQuery } from "@/hooks/query/useGetGameOptionsQuery";
import { useSetupAudio } from "@/hooks/useSetupAudio";
import type { CategoryDto } from "@/types/api";
import type { GameSession } from "@/types/game";
import { GAME_SESSION_KEY } from "@/types/game";
import * as styles from "./page.css";

interface GameSetupContentProps {
  step?: string;
  category?: string;
}

export default function GameSetupContent({
  step,
  category,
}: GameSetupContentProps) {
  const { data: gameOptions } = useGetGameOptionsSuspenseQuery();
  const router = useRouter();
  const { playButtonClick } = useSetupAudio();

  const isValidCategory =
    category &&
    gameOptions.categories.some(
      (c) => c.name.toLowerCase() === category.toLowerCase(),
    );
  const currentStep =
    step === "difficulty" && isValidCategory ? "difficulty" : "category";

  const handleCategorySelect = (cat: CategoryDto) => {
    playButtonClick();
    router.replace(
      `${ROUTES.GAME}?step=difficulty&category=${encodeURIComponent(cat.name.toLowerCase())}`,
    );
  };

  const handleLevelSelect = (mode: string) => {
    playButtonClick();
    const matchedCategory = gameOptions.categories.find(
      (c) => c.name.toLowerCase() === (category ?? "").toLowerCase(),
    );
    const session: GameSession = {
      category: (category ?? "").toLowerCase(),
      categoryId: matchedCategory?.id ?? 0,
      level: mode.toLowerCase(),
    };
    sessionStorage.setItem(GAME_SESSION_KEY, JSON.stringify(session));
    router.replace(ROUTES.GAME_PLAY);
  };

  if (currentStep === "difficulty") {
    return (
      <div className={styles.categoryWrapper}>
        <Image
          src="/assets/images/game-options.png"
          alt=""
          fill
          className={styles.stepBackground}
        />
        <div className={styles.guide}>
          <StepIndicator currentStep={2} totalSteps={2} />
          <p className={styles.categoryTitle}>난이도를 선택해 주세요</p>
        </div>
        <div className={styles.levelCards}>
          {gameOptions.difficultyModes
            .map((mode) => mode.toLowerCase())
            .filter(isValidLevel)
            .map((level) => (
              <LevelCard
                key={level}
                level={level}
                onClick={() => handleLevelSelect(level)}
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.categoryWrapper}>
      <Image
        src="/assets/images/game-options.png"
        alt=""
        fill
        priority
        className={styles.stepBackground}
      />
      <div className={styles.guide}>
        <StepIndicator currentStep={1} totalSteps={2} />
        <p className={styles.categoryTitle}>카테고리를 선택해 주세요</p>
      </div>
      <div className={styles.categoryCards}>
        {gameOptions.categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            iconUrl={cat.iconUrl}
            onClick={() => handleCategorySelect(cat)}
          />
        ))}
      </div>
    </div>
  );
}
