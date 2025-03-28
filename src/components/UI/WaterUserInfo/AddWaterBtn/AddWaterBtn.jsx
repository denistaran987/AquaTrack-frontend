import React from 'react';
import css from './AddWaterBtn.module.css';
import { setPosition, toggleModal } from '../../../../redux/modal/slice.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
      <p className={css.text}>{t('common.add_water')}</p>
    </button>
  );
};

export default AddWaterBtn;
