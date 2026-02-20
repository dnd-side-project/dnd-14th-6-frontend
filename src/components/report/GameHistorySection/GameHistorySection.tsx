"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Flex from "@/components/common/Flex/Flex";

import Text from "@/components/common/Text/Text";
import {
  SORT_FIELD_TO_API,
  type SortField,
  type SortOrder,
  VALID_SORT_FIELDS,
  VALID_SORT_ORDERS,
} from "@/constants/history-table";
import { useGetGameHistoriesQuery } from "@/hooks/query/useGetGameHistoriesQuery";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { SearchFilterValue } from "@/types/report";
import { formatDate } from "@/utils/date";
import HistoryList from "../History/HistoryList/HistoryList";
import SearchBar from "../SearchBar/SearchBar";
import SearchFilterDropdown from "../SearchFilter/Dropdown/SearchFilterDropdown";

const ITEMS_PER_PAGE = 5;

const parseInitialFilter = (
  sp: URLSearchParams,
): { applied: SearchFilterValue; value: SearchFilterValue } => {
  const startDate = sp.get("startDate");
  const endDate = sp.get("endDate");
  const categories = sp.get("categories");
  const difficulties = sp.get("difficulties");

  const filter: SearchFilterValue = {
    startDate: startDate ? new Date(`${startDate}T00:00:00`) : null,
    endDate: endDate ? new Date(`${endDate}T00:00:00`) : null,
    categories: categories ? categories.split(",") : [],
    difficulties: difficulties ? difficulties.split(",") : [],
  };

  return { applied: filter, value: filter };
};

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

interface GameHistorySectionProps {
  userId: string;
}

const GameHistorySection = ({ userId }: GameHistorySectionProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("search") ?? "",
  );
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  const [initialFilter] = useState(() => parseInitialFilter(searchParams));
  const [filterValue, setFilterValue] = useState<SearchFilterValue>(
    initialFilter.value,
  );
  const [appliedFilter, setAppliedFilter] = useState<SearchFilterValue>(
    initialFilter.applied,
  );

  const [sortField, setSortField] = useState<SortField | null>(() => {
    const sf = searchParams.get("sortField");
    return VALID_SORT_FIELDS.includes(sf as SortField)
      ? (sf as SortField)
      : null;
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    const so = searchParams.get("sortOrder");
    return VALID_SORT_ORDERS.includes(so as (typeof VALID_SORT_ORDERS)[number])
      ? (so as "asc" | "desc")
      : null;
  });
  const [currentPage, setCurrentPage] = useState(() =>
    Math.max(1, Number(searchParams.get("page")) || 1),
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (currentPage > 1) params.set("page", String(currentPage));
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (sortField) params.set("sortField", sortField);
    if (sortField && sortOrder) params.set("sortOrder", sortOrder);
    if (appliedFilter.startDate)
      params.set("startDate", formatDate(appliedFilter.startDate));
    if (appliedFilter.endDate)
      params.set("endDate", formatDate(appliedFilter.endDate));
    if (appliedFilter.categories.length > 0)
      params.set("categories", appliedFilter.categories.join(","));
    if (appliedFilter.difficulties.length > 0)
      params.set("difficulties", appliedFilter.difficulties.join(","));

    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    window.history.replaceState(null, "", url);
  }, [
    currentPage,
    debouncedSearch,
    sortField,
    sortOrder,
    appliedFilter,
    pathname,
  ]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
      setCurrentPage(1);
    },
    [],
  );

  const handleFilterApply = useCallback(() => {
    setAppliedFilter(filterValue);
    setCurrentPage(1);
  }, [filterValue]);

  const handleFilterReset = useCallback(() => {
    setFilterValue(INITIAL_FILTER);
    setAppliedFilter(INITIAL_FILTER);
    setCurrentPage(1);
  }, []);

  const handleSort = useCallback(
    (field: SortField, direction: "asc" | "desc") => {
      setCurrentPage(1);
      if (sortField === field && sortOrder === direction) {
        setSortField(null);
        setSortOrder(null);
      } else {
        setSortField(field);
        setSortOrder(direction);
      }
    },
    [sortField, sortOrder],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const queryParams = useMemo(
    () => ({
      userId,
      page: currentPage,
      size: ITEMS_PER_PAGE,
      sortBy: sortField ? SORT_FIELD_TO_API[sortField] : ("playedAt" as const),
      sortOrder: sortField
        ? ((sortOrder ?? "desc") as "asc" | "desc")
        : ("desc" as const),
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(appliedFilter.startDate && {
        startDate: formatDate(appliedFilter.startDate),
      }),
      ...(appliedFilter.endDate && {
        endDate: formatDate(appliedFilter.endDate),
      }),
      ...(appliedFilter.categories.length > 0 && {
        categories: appliedFilter.categories.join(","),
      }),
      ...(appliedFilter.difficulties.length > 0 && {
        difficultyModes: appliedFilter.difficulties.join(","),
      }),
    }),
    [userId, currentPage, sortField, sortOrder, debouncedSearch, appliedFilter],
  );

  const { data } = useGetGameHistoriesQuery(queryParams);

  return (
    <Flex width={"100%"} direction="column" gap={1.8}>
      <Flex width={"100%"} justify="spaceBetween" align="center">
        <Text variant="heading1" color="coolgrey_10">
          게임 히스토리
        </Text>
        <Flex align="center" gap={1.6}>
          <SearchBar value={searchInput} onChange={handleSearchChange} />
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
        items={data?.sessions ?? []}
        totalItems={data?.metadata.totalItems ?? 0}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        searchKeyword={debouncedSearch}
      />
    </Flex>
  );
};

export default GameHistorySection;
