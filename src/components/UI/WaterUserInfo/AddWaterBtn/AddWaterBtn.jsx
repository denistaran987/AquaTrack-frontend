import React from 'react';
import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  return (
    <button className={css.button}>
      <div className={css.svgWrapper}>
        <svg width="20" height="20" className={css.svg}>
          <use href="/images/icons.svg#icon-plus"></use>
        </svg>
      </div>
      <p className={css.text}>Add water</p>
    </button>
  );
};

export default AddWaterBtn;
