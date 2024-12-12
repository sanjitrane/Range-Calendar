export interface DateRangePickerProps{
  onChange: (selectedRange:[string, string], weekendDates:string[])=>void;
  preDefinedRanges?: {label: string, startDate: string, endDate:string}[];
}

export interface CalendarHeaderProps {
  monthNo: number;
  yearNo: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onToggle:(val:boolean)=>void;
  onCurrentDate:()=>void;
}

export interface DateBtnProps{
  date: Date,
  cb:(date:Date)=>void,
  disabled?:boolean,
  styles?:string

}