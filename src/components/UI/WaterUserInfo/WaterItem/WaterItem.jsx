import React from 'react';
import css from './WaterItem.module.css';

const WaterItem = ({ amount, time }) => {
  return (
    <div className={css.cardWrapper}>
      <svg className={css.cup}>
        <use href="/images/icons.svg#icon-cup"></use>
      </svg>
      <div className={css.infoWrapper}>
        <p className={css.amount}>{amount} ml</p>
        <p className={css.time}>{time} AM</p>
      </div>
      <div className={css.svgWrapper}>
        <svg className={css.svg}>
          <use href="/images/icons.svg#icon-edit-2"></use>
        </svg>
        <svg className={css.svg}>
          <use href="/images/icons.svg#icon-trash"></use>
        </svg>
      </div>
    </div>
  );
};

export default WaterItem;
