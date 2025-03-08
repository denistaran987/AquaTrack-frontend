import { useState } from "react";
import CalendarBody from "../CalendarBody/CalendarBody";
import CalendarHeader from "../CalendarHeader/CalendarHeader";

const CalendarContainer = () => {

  const currentDate = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
   
  const [monthNumber,setMonthNumber]=useState(currentDate.getMonth());
  const [year,setYear]=useState(currentDate.getFullYear());


  const monthForvards = () => { 
    if(monthNumber === 11){
      setMonthNumber(0)
      setYear(prev => prev+1)
    }
    else setMonthNumber(prev => prev+1)
  }


  return (
    <div>
     <CalendarHeader monthForvards={monthForvards} monthsName={months[monthNumber]} year={year} />
     <CalendarBody monthNumber={monthNumber} year={year} />
    </div>
  );
};

export default CalendarContainer;
