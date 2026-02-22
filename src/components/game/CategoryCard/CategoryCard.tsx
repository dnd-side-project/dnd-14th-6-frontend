import Image from "next/image";

import * as styles from "./CategoryCard.css";

export type CategoryCardVariant = "default" | "selected" | "inactive";

export interface CategoryCardProps {
  name: string;
  iconUrl: string;
  variant?: CategoryCardVariant;
  onClick?: () => void;
}

const CategoryCard = ({
  name,
  iconUrl,
  variant = "default",
  onClick,
}: CategoryCardProps) => {
  return (
    <button
      type="button"
      className={styles.card({ variant })}
      onClick={onClick}
    >
      <div className={styles.iconWrapper}>
        <Image src={iconUrl} alt={name} width={140} height={140} />
      </div>
      <span className={styles.label({ variant })}>{name}</span>
    </button>
  );
};

export default CategoryCard;
