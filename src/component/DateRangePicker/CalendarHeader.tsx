import React, { useCallback, useState } from "react";
import {CalendarHeaderProps} from "./dateRangePickerTypes"
import "./calendarHeaderStyles.css"
import { MONTH_NAMES } from "../../constants";

const CalendarHeader = ({
  monthNo,
  yearNo,
  onMonthChange,
  onYearChange,
  onToggle,
  onCurrentDate,
}: CalendarHeaderProps) => {
  const [isMonthGridOpen, setIsMonthGridOpen] = useState(false);

  //Toggle the Month grid display
  const toggleMonthGrid = useCallback(() => {
    onToggle(isMonthGridOpen)
    setIsMonthGridOpen((prev) => !prev);
  },[onToggle]);

  // Handle Month selection from grid
  const handleMonthClick = useCallback((monthIndex: number) => {
    onMonthChange(monthIndex);
    setIsMonthGridOpen(false);
    onToggle(true)
  },[onMonthChange, onToggle]);

  //Increment or decrement the year
  const handleYearChange = useCallback((direction: "prev" | "next") => {
    const newYear = direction === "prev" ? yearNo - 1 : yearNo + 1;
    onYearChange(newYear);
  },[yearNo, onYearChange]);

  //Increment or decrement the month and adjusting the year if necessary
  const handleMonthChange = useCallback((direction: "prev" | "next") => {
    let newMonth = direction === "prev" ? monthNo - 1 : monthNo + 1;
    let newYr = yearNo;
    if(newMonth < 0){
      newMonth = 11;
      newYr--;
    }else if(newMonth > 11){
      newMonth = 0;
      newYr++;
    }
    onMonthChange(newMonth);
    onYearChange(newYr)
  },[monthNo, yearNo, onMonthChange, onYearChange]);

  return (
    <div className="calendar-header">
      <div className="controls">
        {/**Button to jump to the current date */}
        <button className="today-btn" onClick={onCurrentDate}>
          Today
        </button>
        {/**Month controls */}
        <div className="month-display">
          <button className="arrow" onClick={() => handleMonthChange("prev")}>
            {"<"}
          </button>
          <button className="month-name" onClick={toggleMonthGrid}>
            {MONTH_NAMES[monthNo]}
          </button>
          <button className="arrow" onClick={() => handleMonthChange("next")}>
            {">"}
          </button>
      </div>
        {/* Year controls */}
        <div className="year-display">
          <button className="arrow" onClick={() => handleYearChange("prev")}>
            {"<"}
          </button>
          <span className="year">
            {yearNo}
          </span>
          <button className="arrow" onClick={() => handleYearChange("next")}>
            {">"}
          </button>
        </div>
      </div>
      
      {/**Month Grid */}
      {isMonthGridOpen && (
        <div className="month-grid">
          {MONTH_NAMES.map((month, index) => (
            <button 
              key={month} 
              onClick={() => handleMonthClick(index)}
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarHeader;
