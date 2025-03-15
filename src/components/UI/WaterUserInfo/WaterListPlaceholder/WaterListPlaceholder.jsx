import css from './WaterListPlaceholder.module.css';

const WaterPlaceholder = () => {
  return (
    <div className={css.placeholderContainer}>
      <h2 className={css.title}>Your list is empty</h2>
      <p className={css.text}>Hydration is important! Add your first entry and stay healthy.</p>
    </div>
  );
};

export default WaterPlaceholder;
