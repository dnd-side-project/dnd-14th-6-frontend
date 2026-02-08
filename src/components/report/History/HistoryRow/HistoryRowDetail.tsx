"use client";

import IcCopy from "@/assets/icons/colored/IcCopy";

import type { Problem } from "@/types/history";
import * as styles from "./HistoryRowDetail.css";

interface HistoryRowDetailProps {
  problems: Problem[];
}

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

const parseCodeText = (text: string) => {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <span key={part} className={styles.codeTag}>
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};

const HistoryRowDetail = ({ problems }: HistoryRowDetailProps) => {
  return (
    <div className={styles.container}>
      {problems.map((problem) => (
        <div key={problem.id} className={styles.problemSection}>
          <div className={styles.problemText}>
            {parseCodeText(problem.description)}
          </div>

          <div className={styles.answersSection}>
            <div className={styles.answerRow}>
              <span className={styles.answerLabel}>나의 답</span>
              <div className={styles.answerBox}>
                <span className={styles.answerText({ correct: true })}>
                  {problem.userAnswers.map((answer, index) => (
                    <span
                      key={`${answer.text}-${index}`}
                      className={styles.answerText({
                        correct: answer.isCorrect,
                      })}
                    >
                      {answer.text}
                      {index < problem.userAnswers.length - 1 && "\n"}
                    </span>
                  ))}
                </span>
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={() =>
                    handleCopy(
                      problem.userAnswers.map((a) => a.text).join("\n"),
                    )
                  }
                >
                  <IcCopy size={22} />
                </button>
              </div>
            </div>

            <div className={styles.answerRow}>
              <span className={styles.answerLabel}>정답</span>
              <div className={styles.answerBox}>
                <span className={styles.answerText({ correct: true })}>
                  {problem.correctAnswer}
                </span>
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={() => handleCopy(problem.correctAnswer)}
                >
                  <IcCopy size={22} />
                </button>
              </div>
            </div>

            <div className={styles.explanationSection}>
              <span className={styles.explanationLabel}>해설</span>
              <span className={styles.explanationText}>
                {parseCodeText(problem.explanation)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryRowDetail;
