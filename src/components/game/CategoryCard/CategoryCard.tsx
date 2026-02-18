import type { ComponentType } from "react";

import IcDockerCard from "@/assets/icons/colored/IcDockerCard";
import IcGitCard from "@/assets/icons/colored/IcGitCard";
import IcLinuxCard from "@/assets/icons/colored/IcLinuxCard";
import type { CategoryType } from "@/components/game/Category/Category";

import * as styles from "./CategoryCard.css";

export type CategoryCardVariant = "default" | "selected" | "inactive";

export interface CategoryCardProps {
  category: CategoryType;
  variant?: CategoryCardVariant;
  onClick?: () => void;
}

const CATEGORY_ICON: Record<
  CategoryType,
  ComponentType<{ size?: number | string }>
> = {
  linux: IcLinuxCard,
  git: IcGitCard,
  docker: IcDockerCard,
};

const CATEGORY_LABEL: Record<CategoryType, string> = {
  linux: "Linux",
  git: "Git",
  docker: "Docker",
};

const CategoryCard = ({
  category,
  variant = "default",
  onClick,
}: CategoryCardProps) => {
  const Icon = CATEGORY_ICON[category];

  return (
    <button
      type="button"
      className={styles.card({ variant })}
      onClick={onClick}
    >
      <div className={styles.iconWrapper}>
        <Icon size={140} />
      </div>
      <span className={styles.label({ variant })}>{CATEGORY_LABEL[category]}</span>
    </button>
  );
};

export default CategoryCard;
