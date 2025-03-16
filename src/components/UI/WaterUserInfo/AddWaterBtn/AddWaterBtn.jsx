import React from 'react';
import css from './AddWaterBtn.module.css';
import { setPosition, toggleModal } from '../../../../redux/modal/slice.js';
import { useDispatch } from 'react-redux';

const AddWaterBtn = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(toggleModal('add'), dispatch(setPosition('null')))}
      className={css.button}
    >
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
