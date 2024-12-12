import React, { memo, useCallback, useMemo, useState } from "react";
import { DateRangePickerProps } from "./dateRangePickerTypes";
import {
  formatDate,
  generateCalendar,
  getWeekends,
  isToday,
  isWeekend,
} from "../../utils";
import { DATE_FORMAT } from "../../constants";
import CalendarHeader from "./CalendarHeader";
import DateBtn from "./DateBtn";
import "./datePickerStyles.css";

const DateRangePicker = ({ onChange, preDefinedRanges = [] }: DateRangePickerProps) => {
  const today = useMemo(() => new Date(), []); // Prevents re-creation of today's date on each render
  const [startDate, setStartDate] = useState<string | null>(formatDate(today, DATE_FORMAT));
  const [endDate, setEndDate] = useState<string | null>(formatDate(today, DATE_FORMAT));
  const [currMonth, setCurrMonth] = useState<number>(today.getMonth());
  const [currYr, setCurrYr] = useState<number>(today.getFullYear());
  const [calendarView, toggleView] = useState<boolean>(true);

  // Handles month and year changes with memoized logic
  // const handleMonthChange = useCallback((val: number) => {
  //   setCurrMonth((prevMonth) => {
  //     const newMonth = prevMonth + val;
  //     const newYearAdjustment = newMonth < 0 ? -1 : newMonth > 11 ? 1 : 0;
  //     setCurrYr((prevYear) => prevYear + newYearAdjustment);
  //     return (newMonth + 12) % 12;
  //   });
  // }, []);

  const displayCurrentDate = useCallback(() => {
    setCurrMonth(today.getMonth());
    setCurrYr(today.getFullYear());
  }, [today]);

  const handleDateClick = useCallback(
    (date: Date | null) => {
      if (!date || isWeekend(date)) return;

      const formattedDate = formatDate(date, DATE_FORMAT);
      let newStartDate = startDate;
      let newEndDate = endDate;

      if (!startDate || (startDate && endDate)) {
        newStartDate = formattedDate;
        newEndDate = null;
      } else {
        const parsedStartDate = new Date(startDate);
        if (date >= parsedStartDate) {
          newEndDate = formattedDate;
        } else {
          newStartDate = formattedDate;
          newEndDate = null;
        }
      }

      setStartDate(newStartDate);
      setEndDate(newEndDate);

      if (newStartDate && newEndDate) {
        const weekends = getWeekends(newStartDate, newEndDate, DATE_FORMAT);
        onChange([newStartDate, newEndDate], weekends);
      }
    },
    [startDate, endDate, onChange]
  );

  const getBtnClass = useCallback(
    (date: Date | null) => {
      if (!date) return "isDisabled";

      const formattedDate = formatDate(date, DATE_FORMAT);
      const isSelected =
        formattedDate &&
        startDate &&
        (formattedDate === startDate ||
          (endDate && formattedDate >= startDate && formattedDate <= endDate));
      const isDisabled = isWeekend(date);
      const isCurrentDate = isToday(date);

      return `${isDisabled ? "isDisabled" : isSelected ? "isSelected" : "isActive"} ${
        isCurrentDate ? "isCurrent" : ""
      }`;
    },
    [startDate, endDate]
  );

  const handlePredefinedRange = useCallback(
    (start: string, end: string) => {
      setStartDate(start);
      setEndDate(end);
      const weekends = getWeekends(start, end, DATE_FORMAT);
      onChange([start, end], weekends);
      const stDt = new Date(start)
      const enDt = new Date(end)
      setCurrMonth(stDt.getMonth());
      setCurrYr(enDt.getFullYear());
    },
    [onChange]
  );

  const renderCalendar = useMemo(() => {
    const calendar = generateCalendar(currMonth, currYr);
    return (
      <div className={`calendar ${calendarView ? "show" : "hide"}`}>
        {calendar.map((date, index) => (
          <DateBtn
            key={index}
            date={date}
            cb={handleDateClick}
            disabled={date ? isWeekend(date) : false}
            styles={getBtnClass(date)}
          />
        ))}
      </div>
    );
  }, [currMonth, currYr, calendarView, handleDateClick, getBtnClass]);

  return (
    <>
      <CalendarHeader
        monthNo={currMonth}
        yearNo={currYr}
        onMonthChange={(month: number) => setCurrMonth(month)}
        onYearChange={setCurrYr}
        onToggle={toggleView}
        onCurrentDate={displayCurrentDate}
      />
      {renderCalendar}
      <hr />
      {preDefinedRanges.length > 0 && (
        <div className="predefined-ranges">
          {preDefinedRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handlePredefinedRange(range.startDate, range.endDate)}
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(DateRangePicker);
