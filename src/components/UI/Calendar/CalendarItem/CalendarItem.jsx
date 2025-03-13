import { useDispatch, useSelector } from 'react-redux';
import css from './CalendarItem.module.css';
import { selectWaterNorm } from '../../../../redux/user/selectors';
import { getWaterByDay } from '../../../../redux/water/operations';
import { selectWaterCurrentDate } from '../../../../redux/water/selectors';
import { memo, useEffect, useMemo } from 'react';

const CalendarItem = ({ day, totalDayWater, isCurrentDate, token, date }) => {
  const dispatch = useDispatch();
  const dailyNorm = useSelector(selectWaterNorm);
  const currentDate = useSelector(selectWaterCurrentDate);

  const persents = useMemo(
    () => (totalDayWater ? Math.round((totalDayWater / dailyNorm) * 100) : 0),
    [totalDayWater, dailyNorm]
  );

  const dayStyle =
      isCurrentDate
        ? `${css.buttonDay} ${css.currentDay}`
        : persents >= 100
        ? `${css.buttonDay} ${css.normed}`
        : css.buttonDay;

  const getDayData = () => {
    dispatch(getWaterByDay({ date, token }));
  };

  useEffect(() => {
    if (!currentDate) {
      dispatch(
        getWaterByDay({ date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(), token })
      );
    }
  }, [currentDate]);

  return (
    <ul className={css.calendarList}>
      <div className={css.itemBox}>
        <button className={dayStyle} onClick={getDayData}>
          {day}
        </button>
        <span className={css.infoText}>{`${persents}%`}</span>
      </div>
    </ul>
  );
};

export default memo(CalendarItem);
