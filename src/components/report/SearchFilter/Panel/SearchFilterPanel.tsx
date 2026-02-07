import DatePicker from "@/components/common/DatePicker/DatePicker";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import type { SearchFilterValue } from "@/types/report";
import SearchFilterButton from "../Button/SearchFilterButton";
import CheckBox from "../CheckBox/CheckBox";
import * as styles from "./SearchFilterPanel.css";

const CATEGORIES = ["Git", "Docker", "Linux"] as const;
const DIFFICULTIES = ["Easy", "Normal", "Hard"] as const;

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

  const handleCategoryToggle = (category: string) => {
    const next = value.categories.includes(category)
      ? value.categories.filter((c) => c !== category)
      : [...value.categories, category];
    onChange({ ...value, categories: next });
  };

  const handleDifficultyToggle = (difficulty: string) => {
    const next = value.difficulties.includes(difficulty)
      ? value.difficulties.filter((d) => d !== difficulty)
      : [...value.difficulties, difficulty];
    onChange({ ...value, difficulties: next });
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
              <Flex direction="column" gap={1.2}>
                {CATEGORIES.map((category) => (
                  <CheckBox
                    key={category}
                    label={category}
                    selected={value.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                ))}
              </Flex>
            </Flex>

            <Flex direction="column" gap={0.9} align="flexStart">
              <Text variant="caption1" color="coolgrey_80">
                난이도
              </Text>
              <Flex direction="column" gap={1.2}>
                {DIFFICULTIES.map((difficulty) => (
                  <CheckBox
                    key={difficulty}
                    label={difficulty}
                    selected={value.difficulties.includes(difficulty)}
                    onChange={() => handleDifficultyToggle(difficulty)}
                  />
                ))}
              </Flex>
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
