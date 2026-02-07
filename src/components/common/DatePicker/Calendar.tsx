"use client";

import { useCallback, useMemo, useState } from "react";
import * as styles from "./Calendar.css";
import MonthGrid from "./MonthGrid";

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const Calendar = ({ startDate, endDate, onSelectDate }: CalendarProps) => {
  const [baseMonth, setBaseMonth] = useState(() => {
    const now = startDate ?? new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const rightMonth = useMemo(() => {
    const nextMonth = baseMonth.month + 1;
    return {
      year: nextMonth > 11 ? baseMonth.year + 1 : baseMonth.year,
      month: nextMonth > 11 ? 0 : nextMonth,
    };
  }, [baseMonth]);

  const handlePrevMonth = useCallback(() => {
    setBaseMonth((prev) => {
      const newMonth = prev.month - 1;
      return {
        year: newMonth < 0 ? prev.year - 1 : prev.year,
        month: newMonth < 0 ? 11 : newMonth,
      };
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setBaseMonth((prev) => {
      const newMonth = prev.month + 1;
      return {
        year: newMonth > 11 ? prev.year + 1 : prev.year,
        month: newMonth > 11 ? 0 : newMonth,
      };
    });
  }, []);

  return (
    <div className={styles.calendarPopup}>
      <MonthGrid
        year={baseMonth.year}
        month={baseMonth.month}
        startDate={startDate}
        endDate={endDate}
        onSelectDate={onSelectDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <MonthGrid
        year={rightMonth.year}
        month={rightMonth.month}
        startDate={startDate}
        endDate={endDate}
        onSelectDate={onSelectDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
    </div>
  );
};

export default Calendar;
