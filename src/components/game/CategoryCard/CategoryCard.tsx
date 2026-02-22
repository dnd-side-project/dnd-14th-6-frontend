import Image from "next/image";

import * as styles from "./CategoryCard.css";

export interface CategoryCardProps {
  name: string;
  iconUrl: string;
  onClick?: () => void;
}

const CategoryCard = ({ name, iconUrl, onClick }: CategoryCardProps) => {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <Image src={iconUrl} alt={name} width={140} height={140} />
      </div>
      <span className={styles.label}>{name}</span>
    </button>
  );
};

export default CategoryCard;
