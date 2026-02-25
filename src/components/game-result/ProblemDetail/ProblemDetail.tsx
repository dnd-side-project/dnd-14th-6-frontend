import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import type { ReportDto } from "@/types/api";

import LoginOverlay from "../LoginOverlay/LoginOverlay";
import ResultCard from "../ResultCard/ResultCard";
import * as styles from "./ProblemDetail.css";

interface ProblemDetailProps {
  report: ReportDto;
  index: number;
  onLoginClick?: () => void;
}

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

export default function ProblemDetail({
  report,
  index,
  onLoginClick,
}: ProblemDetailProps) {
  const isLocked = report.text === null;

  return (
    <ResultCard className={styles.card}>
      {isLocked && onLoginClick && <LoginOverlay onClick={onLoginClick} />}
      <Flex direction="column" gap={2} className={styles.contentArea}>
        <Text variant="body1" color="coolgrey_40">
          문제 해설
        </Text>

        <Flex
          direction="column"
          gap={2}
          className={isLocked ? styles.contentBlurred : undefined}
        >
          <Flex gap={0.4} className={styles.problemText}>
            <Text
              as="span"
              variant="body8"
              color="coolgrey_40"
              style={{ whiteSpace: "nowrap" }}
            >
              {index}.
            </Text>
            <Text as="span" variant="body8" color="coolgrey_40">
              {parseCodeText(report.text ?? "")}
            </Text>
          </Flex>

          <Flex direction="column" gap={1.6} paddingLeft={2.6}>
            {/* 나의 답 */}
            <div className={styles.answerRow}>
              <Text
                as="span"
                variant="body8"
                color="coolgrey_80"
                className={styles.answerLabel}
              >
                나의 답
              </Text>
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
              </div>
            </div>

            {/* 정답 */}
            <div className={styles.answerRow}>
              <Text
                as="span"
                variant="body8"
                color="coolgrey_80"
                className={styles.answerLabel}
              >
                정답
              </Text>
              <div className={styles.answerBox}>
                <span className={styles.answerText({ correct: true })}>
                  {report.answer ?? ""}
                </span>
              </div>
            </div>

            {/* 해설 */}
            <div className={styles.explanationRow}>
              <Text
                as="span"
                variant="body8"
                color="coolgrey_80"
                className={styles.explanationLabel}
              >
                해설
              </Text>
              <Text as="span" variant="body8" color="coolgrey_40">
                {parseCodeText(report.explanation ?? "")}
              </Text>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </ResultCard>
  );
}
