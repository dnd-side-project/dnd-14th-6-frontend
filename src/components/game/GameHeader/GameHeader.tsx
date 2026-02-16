import { IcGameHint } from "@/assets/icons/colored";
import type { CategoryType } from "@/components/game/Category/Category";
import type { LevelType } from "@/components/game/Level/Level";
import LevelCell from "@/components/game/LevelCell/LevelCell";
import ScoreCell from "@/components/game/ScoreCell/ScoreCell";
import ScoreTable from "@/components/game/ScoreTable/ScoreTable";
import type { ScoreLevelType } from "@/components/game/ScoreTable/ScoreTable";
import TimeBar from "@/components/game/TimeBar/TimeBar";
import type { TimerVariant } from "@/components/game/Timer/Timer";
import Timer from "@/components/game/Timer/Timer";
import * as styles from "./GameHeader.css";

const RED_THRESHOLD = 0.2;

interface GameHeaderProps {
  category: CategoryType;
  level: LevelType;
  score: number;
  scores?: Record<ScoreLevelType, number>;
  currentTime: number;
  totalTime: number;
}

export default function GameHeader({
  category,
  level,
  score,
  scores,
  currentTime,
  totalTime,
}: GameHeaderProps) {
  const ratio = totalTime > 0 ? currentTime / totalTime : 0;
  const timerVariant: TimerVariant = ratio <= RED_THRESHOLD ? "red" : "default";

  return (
    <div className={styles.wrapper}>
      <div className={styles.statusBar}>
        <div className={styles.statusRow}>
          <LevelCell category={category} level={level} />
          <ScoreCell score={score} />
        </div>
        <div className={styles.timeRow}>
          <Timer variant={timerVariant} />
          <div className={styles.timeBar}>
            <TimeBar currentTime={currentTime} totalTime={totalTime} />
          </div>
        </div>
      </div>
      <div className={styles.bottomRow}>
        {scores && <ScoreTable scores={scores} />}
        <button type="button" className={styles.hintButton}>
          <IcGameHint size={36} />
        </button>
      </div>
    </div>
  );
}
