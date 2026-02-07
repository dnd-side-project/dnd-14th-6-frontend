"use client";

import IcArrowLeft from "@/assets/icons/colored/IcArrowLeft";
import IcArrowRight from "@/assets/icons/colored/IcArrowRight";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import { DAYS_OF_WEEK } from "@/constants/date";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isDateInRange,
  isSameDay,
  isToday,
} from "@/utils/date";
import * as styles from "./Calendar.css";

type DayState = "default" | "today" | "rangeStart" | "rangeEnd" | "inRange";
type RangePosition = "none" | "start" | "middle" | "end" | "single";
type WeekEdge = "none" | "left" | "right";

export interface MonthGridProps {
  year: number;
  month: number;
  startDate: Date | null;
  endDate: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const getWeekEdge = (
  date: Date,
  startDate: Date | null,
  endDate: Date | null,
): WeekEdge => {
  if (!startDate || !endDate) return "none";
  if (!isDateInRange(date, startDate, endDate)) return "none";

  const dow = date.getDay(); // 0=Sun ... 6=Sat
  if (dow === 0) return "left";
  if (dow === 6) return "right";
  return "none";
};

const MonthGrid = ({
  year,
  month,
  startDate,
  endDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: MonthGridProps) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const getDayState = (day: number): DayState => {
    const date = new Date(year, month, day);

    if (startDate && isSameDay(date, startDate)) return "rangeStart";
    if (endDate && isSameDay(date, endDate)) return "rangeEnd";
    if (startDate && endDate && isDateInRange(date, startDate, endDate))
      return "inRange";
    if (isToday(date)) return "today";
    return "default";
  };

  const getRangePosition = (day: number): RangePosition => {
    const date = new Date(year, month, day);

    if (!startDate || !endDate) return "none";
    if (isSameDay(startDate, endDate))
      return isSameDay(date, startDate) ? "single" : "none";
    if (isSameDay(date, startDate)) return "start";
    if (isSameDay(date, endDate)) return "end";
    if (isDateInRange(date, startDate, endDate)) return "middle";
    return "none";
  };

  const emptyBefore = Array.from({ length: firstDay }, (_, i) => `before-${i}`);
  const dayNumbers = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const totalCells = firstDay + daysInMonth;
  const weeks = Math.ceil(totalCells / 7);
  const trailingEmpty = weeks * 7 - totalCells;

  const emptyAfter = Array.from(
    { length: trailingEmpty },
    (_, i) => `after-${i}`,
  );

  return (
    <div className={styles.monthSection}>
      <Flex align="center" justify="spaceBetween" marginBottom={1.2}>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={onPrevMonth}
        >
          <IcArrowLeft size={12} />
        </button>

        <Text variant="body7" color="coolgrey_10">
          {monthLabel}
        </Text>

        <button
          type="button"
          className={styles.navigationButton}
          onClick={onNextMonth}
        >
          <IcArrowRight size={12} />
        </button>
      </Flex>

      <div className={styles.dayGrid}>
        {DAYS_OF_WEEK.map((dow) => (
          <div key={dow} className={styles.dayOfWeekCell}>
            <Text as="span" variant="body9" color="coolgrey_80">
              {dow}
            </Text>
          </div>
        ))}

        {emptyBefore.map((key) => (
          <div key={key} className={styles.emptyCell} />
        ))}

        {dayNumbers.map((day) => {
          const date = new Date(year, month, day);

          const state = getDayState(day);
          const rangePosition = getRangePosition(day);
          const weekEdge = getWeekEdge(date, startDate, endDate);

          return (
            <div
              key={day}
              className={styles.dayCellWrapper({ rangePosition, weekEdge })}
            >
              <button
                type="button"
                className={styles.dayNumber({ state })}
                onClick={() => onSelectDate(date)}
              >
                {day}
              </button>
            </div>
          );
        })}

        {emptyAfter.map((key) => (
          <div key={key} className={styles.emptyCell} />
        ))}
      </div>
    </div>
  );
};

export default MonthGrid;
