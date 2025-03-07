import React from 'react';
import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  return (
    <button className={css.button}>
      <svg width="30" height="30" className={css.svg}>
        <use href="/public/images/icons.svg#icon-plus"></use>
      </svg>
      <p className={css.text}>Add water</p>
    </button>
  );
};

export default AddWaterBtn;
