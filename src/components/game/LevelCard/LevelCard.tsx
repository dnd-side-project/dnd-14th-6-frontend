import type { ComponentType } from "react";

import IcLevelEasy from "@/assets/icons/colored/IcLevelEasy";
import IcLevelHard from "@/assets/icons/colored/IcLevelHard";
import IcLevelNormal from "@/assets/icons/colored/IcLevelNormal";
import IcLevelRandom from "@/assets/icons/colored/IcLevelRandom";
import type { LevelType } from "@/components/game/Level/Level";

import * as styles from "./LevelCard.css";

export type LevelCardVariant = "default" | "selected" | "inactive";

export interface LevelCardProps {
  level: LevelType;
  variant?: LevelCardVariant;
  onClick?: () => void;
}

const LEVEL_ICON: Record<LevelType, ComponentType> = {
  easy: IcLevelEasy,
  normal: IcLevelNormal,
  hard: IcLevelHard,
  random: IcLevelRandom,
};

const LEVEL_LABEL: Record<LevelType, string> = {
  easy: "Easy",
  normal: "Normal",
  hard: "Hard",
  random: "Random",
};

const LevelCard = ({
  level,
  variant = "default",
  onClick,
}: LevelCardProps) => {
  const Icon = LEVEL_ICON[level];

  return (
    <button
      type="button"
      className={styles.card({ variant })}
      onClick={onClick}
    >
      <span className={styles.label({ variant })}>{LEVEL_LABEL[level]}</span>
      <div className={styles.iconWrapper}>
        <Icon />
      </div>
    </button>
  );
};

export default LevelCard;
