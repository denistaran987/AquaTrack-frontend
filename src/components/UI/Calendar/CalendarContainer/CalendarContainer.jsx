import CalendarBody from '../CalendarBody/CalendarBody';
import CalendarHeader from '../CalendarHeader/CalendarHeader';
import css from './CalendarContainer.module.css';
import useGetPaginationData from '../hooks/useGetPaginationData';
import { useState } from 'react';
import ChartContainer from '../ChartContainer/ChartContainer';

const CalendarContainer = () => {
  const [monthNumber, year, monthForvards, monthPrevios, monthsName] = useGetPaginationData();
  const [isChart, setIsChart] = useState(false);
  return (
    <div className={css.monthInfo}>
      <CalendarHeader
        setIsChart={setIsChart}
        monthPrevios={monthPrevios}
        monthForvards={monthForvards}
        monthsName={monthsName}
        year={year}
      />
      {!isChart && <CalendarBody monthNumber={monthNumber} year={year} />}
      {isChart && <ChartContainer />}
    </div>
  );
};

export default CalendarContainer;
