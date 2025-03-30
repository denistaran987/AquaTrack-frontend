import { memo, useState } from 'react';
import css from './CalendarPagination.module.css';
import { useTranslation } from 'react-i18next';

const CalendarHeader = ({ monthsName, year, monthForwards, monthPrevious, setIsChart }) => {
  const { t } = useTranslation();
  const [isCalendar, setIsCalender] = useState(true);

  const handleClick = () => {
    setIsChart(prev => !prev);
    setIsCalender(!isCalendar);
  };

  return (
    <div className={css.monthBox}>
      <div className={css.oneMonthContainer}>
        <h2 className={css.monthTitle}>
          {isCalendar ? t('CalendarPagination.month') : t('CalendarPagination.statistics')}
        </h2>

        <div className={css.oneMonthWrapper}>
          <button className={css.buttonPrevious} type="button" onClick={monthPrevious}>
            <svg className={css.iconPrevious}>
              <use href="/images/icons.svg#icon-left"></use>
            </svg>
          </button>
          <span className={css.monthDescription}>
            {monthsName}, {year}
          </span>
          <button className={css.buttonNext} type="button" onClick={monthForwards}>
            <svg className={css.iconNext}>
              <use href="/images/icons.svg#icon-right"></use>
            </svg>
          </button>
        </div>

        <button className={css.button} type="button" onClick={handleClick}>
          <svg className={css.iconChart}>
            <use xlinkHref={`/images/icons.svg#icon-pie-chart`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default memo(CalendarHeader);
