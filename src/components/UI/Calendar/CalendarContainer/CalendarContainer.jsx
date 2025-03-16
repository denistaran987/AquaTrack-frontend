import Calendar from '../Calendar/Calendar';
import CalendarHeader from '../CalendarPagination/CalendarPagination';
import css from './CalendarContainer.module.css';
import useGetPaginationData from '../hooks/useGetPaginationData';
import { useState } from 'react';
import ChartContainer from '../ChartContainer/ChartContainer';

const CalendarContainer = () => {
  const [monthNumber, year, monthForwards, monthPrevious, monthsName] = useGetPaginationData();
  const [isChart, setIsChart] = useState(false);
  return (
    <div className={css.monthInfo}>
      <CalendarHeader
        setIsChart={setIsChart}
        monthPrevious={monthPrevious}
        monthForwards={monthForwards}
        monthsName={monthsName}
        year={year}
      />
      {!isChart && <Calendar monthNumber={monthNumber} year={year} />}
      {isChart && <ChartContainer />}
    </div>
  );
};

export default CalendarContainer;
