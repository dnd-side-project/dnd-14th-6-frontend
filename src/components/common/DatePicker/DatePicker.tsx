"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import IcCalendar from "@/assets/icons/mono/IcCalendar";
import Flex from "@/components/common/Flex/Flex";
import Text from "@/components/common/Text/Text";
import { formatDate } from "@/utils/date";
import Calendar from "./Calendar";
import * as styles from "./DatePicker.css";

interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (startDate: Date | null, endDate: Date | null) => void;
  placeholder?: string;
  inline?: boolean;
}

const DatePicker = ({
  startDate,
  endDate,
  onChange,
  placeholder = "날짜를 선택하세요",
  inline = false,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionPhase, setSelectionPhase] = useState<"start" | "end">(
    "start",
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inline) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, inline]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        setSelectionPhase("start");
      }
      return !prev;
    });
  }, []);

  const handleSelectDate = useCallback(
    (date: Date) => {
      if (selectionPhase === "start") {
        onChange(date, null);
        setSelectionPhase("end");
      } else {
        if (startDate && date < startDate) {
          onChange(date, startDate);
        } else {
          onChange(startDate, date);
        }
        setSelectionPhase("start");
      }
    },
    [selectionPhase, startDate, onChange],
  );

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        className={styles.triggerContainer}
        onClick={handleToggle}
      >
        <Flex align="center" justify="spaceBetween" className={styles.inputBox}>
          <Text
            as="span"
            variant="body8"
            color={startDate ? "coolgrey_20" : "coolgrey_80"}
          >
            {startDate ? formatDate(startDate) : placeholder}
          </Text>
          <IcCalendar
            size={24}
            color={startDate ? "coolgrey_40" : "coolgrey_80"}
          />
        </Flex>
        <Text as="span" variant="body7" color="coolgrey_50">
          ~
        </Text>
        <Flex align="center" justify="spaceBetween" className={styles.inputBox}>
          <Text
            as="span"
            variant="body8"
            color={endDate ? "coolgrey_20" : "coolgrey_80"}
          >
            {endDate ? formatDate(endDate) : placeholder}
          </Text>
          <IcCalendar
            size={24}
            color={endDate ? "coolgrey_40" : "coolgrey_80"}
          />
        </Flex>
      </button>
      {isOpen &&
        (inline ? (
          <div className={styles.inlineCalendar}>
            <Calendar
              startDate={startDate}
              endDate={endDate}
              onSelectDate={handleSelectDate}
            />
          </div>
        ) : (
          <div className={styles.popover}>
            <Calendar
              startDate={startDate}
              endDate={endDate}
              onSelectDate={handleSelectDate}
            />
          </div>
        ))}
    </div>
  );
};

export default DatePicker;
