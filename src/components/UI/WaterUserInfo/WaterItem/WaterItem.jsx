import React from 'react';
import css from './WaterItem.module.css';
import { useDispatch } from 'react-redux';
import { setPosition, toggleModal } from '../../../../redux/modal/slice.js';

const WaterItem = ({ id, amount, time }) => {
  const dispatch = useDispatch();
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
        <button onClick={() => dispatch(toggleModal('edit'), dispatch(setPosition('null')))}>
          <svg className={css.svg}>
            <use href="/images/icons.svg#icon-edit-2"></use>
          </svg>
        </button>
        <button onClick={() => dispatch(toggleModal('deleteWater'), dispatch(setPosition('null')))}>
          <svg className={css.svg}>
            <use href="/images/icons.svg#icon-trash"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
