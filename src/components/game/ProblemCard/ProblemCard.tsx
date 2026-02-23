import * as styles from "./ProblemCard.css";

export type ProblemCardVariant = "default" | "selected" | "error";
export type ProblemCardLevel = "easy" | "normal" | "hard";

export interface ProblemCardProps {
  category: string;
  text?: string;
  variant?: ProblemCardVariant;
  level?: ProblemCardLevel;
  onClick?: () => void;
}

const ProblemCard = ({
  category,
  text,
  variant = "default",
  level = "easy",
  onClick,
}: ProblemCardProps) => {
  const isHeadOnly = text === undefined;
  return (
    <button
      type="button"
      className={styles.container({
        variant,
        shape: isHeadOnly ? "headOnly" : "full",
      })}
      onClick={onClick}
    >
      <div className={isHeadOnly ? styles.innerHeadOnly : styles.inner}>
        <div className={styles.categorySection}>
          <span className={styles.categoryText({ level })}>{category}</span>
        </div>
        {text !== undefined && (
          <>
            <div className={styles.divider({ variant })} />
            <div className={styles.bodySection}>
              <span className={styles.bodyText}>{text}</span>
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export default ProblemCard;
