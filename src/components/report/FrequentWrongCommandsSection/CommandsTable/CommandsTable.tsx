import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import type { FrequentWrongCommand } from "@/types/report";
import * as styles from "./CommandsTable.css";

interface CommandsTableProps {
  commands: FrequentWrongCommand[];
  hoveredIndex: number | null;
  onHoverIndex: (index: number | null) => void;
}

export default function CommandsTable({
  commands,
  hoveredIndex,
  onHoverIndex,
}: CommandsTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.header}>
        <div className={styles.headerRank}>
          <Text variant="body7" color="primary_default">
            순위
          </Text>
        </div>
        <div className={styles.headerCommand}>
          <Text variant="body7" color="primary_default">
            명령어
          </Text>
        </div>
        <div className={styles.headerCount}>
          <Text variant="body7" color="primary_default">
            횟수
          </Text>
        </div>
      </div>
      <div className={styles.tableBody}>
        {commands.map((command, index) => (
          <Flex
            key={`${command.mainCategory}-${command.subCategory}`}
            align="center"
            className={
              styles.row[hoveredIndex === index ? "hovered" : "default"]
            }
            onMouseEnter={() => onHoverIndex(index)}
            onMouseLeave={() => onHoverIndex(null)}
          >
            <div className={styles.rowIndex}>
              <Text variant="body8" color="coolgrey_80">
                {index + 1}
              </Text>
            </div>
            <div className={styles.rowCommand}>
              <Text variant="body7" color="coolgrey_10">
                {command.subCategory}
              </Text>
            </div>
            <div className={styles.rowCount}>
              <Text variant="body7" color="coolgrey_10">
                {command.wrongCount}
              </Text>
            </div>
          </Flex>
        ))}
      </div>
    </div>
  );
}
