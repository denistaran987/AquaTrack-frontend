import { memo } from 'react';
import css from './CalendarPagination.module.css';

const CalendarHeader = ({ monthsName, year, monthForwards, monthPrevious, setIsChart }) => {
  return (
    <div className={css.monthBox}>
      <div className={css.oneMonthContainer}>
        <h2 className={css.monthTitle}>Month</h2>

        <div className={css.oneMonthWrapper}>
          <button className={css.buttonPrevious} type="button" onClick={monthPrevious}>
            <svg className={css.iconPrevious}>
              <use href="/images/icons.svg#icon-left"></use>
            </svg>
          </button>
          <span className={css.monthDescription}>
            {' '}
            {monthsName}, {year}
          </span>
          <button className={css.buttonNext} type="button" onClick={monthForwards}>
            <svg className={css.iconNext}>
              <use href="/images/icons.svg#icon-right"></use>
            </svg>
          </button>
        </div>
        <button className={css.button} type="button" onClick={() => setIsChart(prev => !prev)}>
          <svg className={css.iconChart}>
            <use xlinkHref={`/images/icons.svg#icon-pie-chart`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default memo(CalendarHeader);
