import { memo } from "react";
import {DateBtnProps} from "./dateRangePickerTypes";

const DateBtn = ({date, cb, disabled=false, styles=''}:DateBtnProps)=>{
  return (
    <button
      onClick={()=>cb(date)}
      disabled={disabled}
      className={styles}
    >
      {date ? date.getDate() : ""}
    </button>
  )
}

export default memo(DateBtn,
  (prevProps, nextProps) => 
    prevProps.date === nextProps.date &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.styles === nextProps.styles
  );