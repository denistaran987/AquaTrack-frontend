import css from './CalendarHeader.module.css';

const CalendarHeader = ({ monthsName, year, monthForvards, monthPrevios }) => {
  return (
    <div className={css.monthBox}>

      <h2 className={css.monthTitle}>Month</h2>
      
      <div className={css.oneMonthContainer}>
        <div className={css.oneMonthWrapper}>
          <button className={css.buttonPrevious} type="button" onClick={monthPrevios}>
            <svg className={css.iconPrevious}>
              <use href="/images/icons.svg#icon-left"></use>
            </svg>
          </button>
          <span className={css.monthDescription}>
            {' '}
            {monthsName}, {year}
          </span>
          <button className={css.buttonNext} type="button" onClick={monthForvards}>
            <svg className={css.iconNext}>
              <use href="/images/icons.svg#icon-right"></use>
            </svg>
          </button>
        </div>
        <button className={css.buttonNext} type="button" onClick={monthForvards}>
          <svg className={css.iconChart}>
            <use xlinkHref={`/images/icons.svg#icon-pie-chart`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
