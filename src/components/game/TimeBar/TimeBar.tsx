import * as styles from "./TimeBar.css";

const RED_THRESHOLD = 0.2;

interface TimeBarProps {
  currentTime: number;
  totalTime: number;
}

export default function TimeBar({ currentTime, totalTime }: TimeBarProps) {
  const ratio =
    totalTime > 0 ? Math.max(0, Math.min(1, currentTime / totalTime)) : 0;
  const variant = ratio <= RED_THRESHOLD ? "red" : "default";

  return (
    <div className={styles.track}>
      <div
        className={styles.fill[variant]}
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  );
}
