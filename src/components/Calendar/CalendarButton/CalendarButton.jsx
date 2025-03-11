import css from "./CalendarButton.module.css";

const CalendarButton = ({day, amount}) => {

  const dailyNorm = 1500;
  const persents = Math.round(amount/dailyNorm*100);
  console.log('persents :>> ', persents);

  return (
    <div className={css.itemBox}>
      <button>{day}</button>
      <span>{`${persents}%`}</span>
    </div>
  );
};

export default  CalendarButton;