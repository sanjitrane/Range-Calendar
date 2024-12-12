import React, { useCallback, useMemo, useState } from "react";
import DateRangePicker from "./component/DateRangePicker/DateRangePicker";
import { getDateRange } from "./utils";
import { DATE_FORMAT } from "./constants";
import "./styles.css";


const App = ()=>{
  const [selectedRange, setSelectedRange] = useState<[string,string]>(['','']);
  const [weekendDates, setWeekendDates] = useState<string[]>(['']);

  const handleChange = useCallback((
    selectedRange: [string, string],
    weekendDates: string[]
  ) => {
    setSelectedRange(selectedRange)
    setWeekendDates(weekendDates)
  },[]);

  const predefinedRanges = useMemo(()=>[
    {
      label: "Last 7 Days",
      startDate: getDateRange(7, DATE_FORMAT).startDate,
      endDate: getDateRange(7, DATE_FORMAT).endDate,
    },
    {
      label: "Last 30 Days",
      startDate: getDateRange(30, DATE_FORMAT).startDate,
      endDate: getDateRange(30, DATE_FORMAT).endDate,
    },
  ],[]);

  const datePickerProps = useMemo(()=>({
    onChange: handleChange,
    preDefinedRanges:predefinedRanges
  }),[handleChange, predefinedRanges])

  return (<>
  <h1>Range Calendar</h1>
  <div className="calendar-wrapper">
  <DateRangePicker {...datePickerProps}/>
  </div>
  <div>
    <code>{`Selected Range: ${selectedRange.join(', ')}`}</code>
  </div>
  <div>
    <code>{`Weekend Dates: ${weekendDates.join(', ')}`}</code>
  </div>
  </>)
}

export default App;