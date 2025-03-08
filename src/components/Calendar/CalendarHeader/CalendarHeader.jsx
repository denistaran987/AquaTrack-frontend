import { useState } from "react";

const CalendarHeader = ({monthsName, year, monthForvards}) => {

  return (
    <div >
      <h2>Month</h2>
      <button>{"<"}</button>
      <h3> {monthsName}, {year}</h3>
      <button onClick={monthForvards}>{">"}</button>
    </div>
  );
};

export default  CalendarHeader;