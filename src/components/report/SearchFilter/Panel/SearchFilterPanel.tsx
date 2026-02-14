import DatePicker from "@/components/common/DatePicker/DatePicker";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import type { SearchFilterValue } from "@/types/report";
import SearchFilterButton from "../Button/SearchFilterButton";
import CheckBox from "../CheckBox/CheckBox";
import * as styles from "./SearchFilterPanel.css";

const CATEGORIES = ["Git", "Docker", "Linux"] as const;
const DIFFICULTIES = ["Easy", "Normal", "Hard", "Random"] as const;

interface SearchFilterPanelProps {
  value: SearchFilterValue;
  onChange: (value: SearchFilterValue) => void;
  onApply: () => void;
  onReset: () => void;
}

const SearchFilterPanel = ({
  value,
  onChange,
  onApply,
  onReset,
}: SearchFilterPanelProps) => {
  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    onChange({ ...value, startDate, endDate });
  };

  const handleArrayToggle = (
    field: "categories" | "difficulties",
    item: string,
  ) => {
    const currentArray = value[field];
    const nextArray = currentArray.includes(item)
      ? currentArray.filter((i) => i !== item)
      : [...currentArray, item];
    onChange({ ...value, [field]: nextArray });
  };

  return (
    <div className={styles.panel}>
      <Flex direction="column" gap={2.9} align="flexStart">
        <Text variant="heading4" color="coolgrey_20">
          검색 필터
        </Text>

        <Flex direction="column" gap={2.7}>
          <Flex direction="column" gap={0.5} align="flexStart">
            <Text variant="caption1" color="coolgrey_80">
              기간
            </Text>
            <DatePicker
              startDate={value.startDate}
              endDate={value.endDate}
              onChange={handleDateChange}
              inline
            />
          </Flex>

          <div className={styles.category}>
            <Flex direction="column" gap={0.9} align="flexStart">
              <Text variant="caption1" color="coolgrey_80">
                카테고리
              </Text>
              <Flex direction="column" gap={1}>
                {CATEGORIES.map((category) => (
                  <CheckBox
                    key={category}
                    label={category}
                    selected={value.categories.includes(category)}
                    onChange={() => handleArrayToggle("categories", category)}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex direction="column" gap={0.9} align="flexStart">
              <Text variant="caption1" color="coolgrey_80">
                난이도
              </Text>
              <div className={styles.difficultyGrid}>
                {DIFFICULTIES.map((difficulty) => (
                  <CheckBox
                    key={difficulty}
                    label={difficulty}
                    selected={value.difficulties.includes(difficulty)}
                    onChange={() =>
                      handleArrayToggle("difficulties", difficulty)
                    }
                  />
                ))}
              </div>
            </Flex>
          </div>
        </Flex>
      </Flex>

      <Flex direction="column" gap={2.4} align="flexEnd" marginTop={2.9}>
        <div className={styles.divider} />
        <Flex gap={1.4}>
          <SearchFilterButton variant="reset" onClick={onReset} />
          <SearchFilterButton variant="ok" onClick={onApply} />
        </Flex>
      </Flex>
    </div>
  );
};

export default SearchFilterPanel;
