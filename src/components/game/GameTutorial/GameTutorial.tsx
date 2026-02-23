import Image from "next/image";

import type { LevelType } from "@/components/game/Level/Level";
import ProblemCard from "@/components/game/ProblemCard/ProblemCard";
import * as styles from "./GameTutorial.css";

interface GameTutorialProps {
  level: LevelType;
  onStart: () => void;
}

const GameTutorial = ({ level, onStart }: GameTutorialProps) => {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: game tutorial screen - click anywhere to start
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled via window event listener
    <div
      className={level === "random" ? styles.wrapperRandom : styles.wrapper}
      onClick={onStart}
    >
      <Image
        src="/assets/images/game-tutorial.png"
        alt=""
        fill
        className={styles.stepBackground}
      />
      <div className={styles.guide}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>Tutorial</span>
        </div>
        <p className={styles.title}>
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
              <ProblemCard category="Branch" level="normal" />
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
};

export default GameTutorial;
