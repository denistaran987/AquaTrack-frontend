import css from "./CalendarButton.module.css";

const CalendarButton = ({day}) => {
  return (
    <div className={css.itemBox}>
      <button>{day}</button>
      <span>{"50%"}</span>
    </div>
  );
};

export default  CalendarButton;