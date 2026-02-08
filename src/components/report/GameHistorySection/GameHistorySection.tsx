"use client";

import { useCallback, useState } from "react";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import { MOCK_HISTORY_ITEMS } from "@/constants/history-table";
import type { SearchFilterValue } from "@/types/report";
import HistoryList from "../History/HistoryList/HistoryList";
import SearchBar from "../SearchBar/SearchBar";
import SearchFilterDropdown from "../SearchFilter/Dropdown/SearchFilterDropdown";

const INITIAL_FILTER: SearchFilterValue = {
  startDate: null,
  endDate: null,
  categories: [],
  difficulties: [],
};

const isFilterSelected = (filter: SearchFilterValue): boolean => {
  return (
    filter.startDate !== null ||
    filter.endDate !== null ||
    filter.categories.length > 0 ||
    filter.difficulties.length > 0
  );
};

const GameHistorySection = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] =
    useState<SearchFilterValue>(INITIAL_FILTER);
  const [appliedFilter, setAppliedFilter] =
    useState<SearchFilterValue>(INITIAL_FILTER);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  const handleFilterApply = useCallback(() => {
    setAppliedFilter(filterValue);
  }, [filterValue]);

  const handleFilterReset = useCallback(() => {
    setFilterValue(INITIAL_FILTER);
    setAppliedFilter(INITIAL_FILTER);
  }, []);

  return (
    <Flex width={"100%"} direction="column" gap={1.8}>
      <Flex width={"100%"} justify="spaceBetween" align="center">
        <Text variant="heading1" color="coolgrey_10">
          게임 히스토리
        </Text>
        <Flex align="center" gap={1.6}>
          <SearchBar value={searchValue} onChange={handleSearchChange} />
          <SearchFilterDropdown
            selected={isFilterSelected(appliedFilter)}
            value={filterValue}
            onChange={setFilterValue}
            onApply={handleFilterApply}
            onReset={handleFilterReset}
          />
        </Flex>
      </Flex>
      <HistoryList
        items={MOCK_HISTORY_ITEMS}
        totalItems={MOCK_HISTORY_ITEMS.length}
        searchKeyword={searchValue}
      />
    </Flex>
  );
};

export default GameHistorySection;
