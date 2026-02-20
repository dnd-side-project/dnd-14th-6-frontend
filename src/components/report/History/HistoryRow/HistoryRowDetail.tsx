"use client";

import IcCopy from "@/assets/icons/colored/IcCopy";

import type { ReportDto } from "@/types/api";
import * as styles from "./HistoryRowDetail.css";

interface HistoryRowDetailProps {
  reports: ReportDto[];
}

const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

const parseCodeText = (text: string) => {
  const parts = text.split(/(`[^`]+`)/g);
  let offset = 0;
  return parts.map((part) => {
    const key = `code-${offset}`;
    offset += part.length;
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <span key={key} className={styles.codeTag}>
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};

const HistoryRowDetail = ({ reports }: HistoryRowDetailProps) => {
  return (
    <div className={styles.container}>
      {reports.map((report, index) => (
        <div key={report.problemId} className={styles.problemSection}>
          <div className={styles.problemText}>
            {index + 1}. {parseCodeText(report.text ?? "")}
          </div>

          <div className={styles.answersSection}>
            <div className={styles.answerRow}>
              <span className={styles.answerLabel}>나의 답</span>
              <div className={styles.answerBox}>
                <span className={styles.answerText({ correct: true })}>
                  {report.inputs.length > 0
                    ? report.inputs.map((input, inputIndex) => (
                        <span
                          key={`${input.input}-${inputIndex}`}
                          className={styles.answerText({
                            correct: input.isCorrect,
                          })}
                        >
                          {input.input}
                          {inputIndex < report.inputs.length - 1 && "\n"}
                        </span>
                      ))
                    : "\u00A0"}
                </span>
                {report.inputs.length > 0 && (
                  <button
                    type="button"
                    className={styles.copyButton}
                    onClick={() =>
                      handleCopy(report.inputs.map((i) => i.input).join("\n"))
                    }
                  >
                    <IcCopy size={22} />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.answerRow}>
              <span className={styles.answerLabel}>정답</span>
              <div className={styles.answerBox}>
                <span className={styles.answerText({ correct: true })}>
                  {report.answer ?? ""}
                </span>
                <button
                  type="button"
                  className={styles.copyButton}
                  onClick={() => handleCopy(report.answer ?? "")}
                >
                  <IcCopy size={22} />
                </button>
              </div>
            </div>

            <div className={styles.explanationSection}>
              <span className={styles.explanationLabel}>해설</span>
              <span className={styles.explanationText}>
                {parseCodeText(report.explanation ?? "")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryRowDetail;
