export const formatDate = (date:Date, format:string)=>{
  switch(format){
    case 'YYYY-MM-DD':
      return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
    case 'MM-DD-YYYY':
      return `${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}-${date.getFullYear()}`;
    case 'DD-MM-YYYY':
      return `${String(date.getDate()).padStart(2,"0")}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;
    case 'YYYY/MM/DD':
      return `${date.getFullYear()}/${String(date.getMonth()+1).padStart(2,"0")}/${String(date.getDate()).padStart(2,"0")}`;
    case 'MM/DD/YYYY':
      return `${String(date.getMonth()+1).padStart(2,"0")}/${String(date.getDate()).padStart(2,"0")}/${date.getFullYear()}`;
    case 'DD':
      return `${String(date.getDate()).padStart(2,"0")}`;
    case 'MM':
      return `${String(date.getMonth()+1).padStart(2,"0")}`;
    default:
      return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  }
}

export const isWeekend = (date: Date)=>{
  const day = date.getDay();
  return day===0 || day === 6;
}

export const getWeekends = (startDate:string, endDate:string, format:string)=>{
  const allDates: Date[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      allDates.push(new Date(d));
    }
  return allDates.filter(isWeekend).map((date:Date) => formatDate(date, format));
}

export const isToday = (date: Date)=>{
  return date.setHours(0,0,0,0) === new Date().setHours(0,0,0,0)

}

export const generateCalendar = (month: number, year:number)=>{
  const noOfDays:number = new Date(year, month + 1, 0).getDate();
  const calendar:(Date|null)[] = [];
  const firstDay:number = new Date(year, month, 1).getDay();

  for(let i = 0; i < firstDay; i++){
    calendar.push(null);
  }

  for(let i = 1; i <= noOfDays; i++){
    calendar.push(new Date(year, month, i));
  }
  return calendar;
}

export const getDateRange = (days: number, format:string)=>{
  const now = new Date();
  const endDate = now;
  const startDate = new Date();
  startDate.setDate(now.getDate() - days + 1)
  return {
    startDate: formatDate(startDate, format),
    endDate: formatDate(endDate, format)
  }
}

