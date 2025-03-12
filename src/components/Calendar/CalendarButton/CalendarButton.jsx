import css from "./CalendarButton.module.css";

const CalendarButton = ({day, amount}) => {

  const dailyNorm = 1500;
  const persents = Math.round(amount/dailyNorm*100);
  console.log('persents :>> ', persents);

  return (
    <ul className={css.calendarList}>
      <div className={css.itemBox}>
      <button className={css.buttonDay}>{day}</button>
      <span className={css.infoText}>{`${persents}%`}</span>
      </div>
    </ul>
  );
};

export default  CalendarButton;