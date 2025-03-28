import React from 'react';
import css from './WaterItem.module.css';
import { useDispatch } from 'react-redux';
import { setPosition, toggleModal } from '../../../../redux/modal/slice.js';
import { setId } from '../../../../redux/water/slice.js';
import { useTranslation } from 'react-i18next';

const WaterItem = ({ id, amount, date }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const time = new Date(date);
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  });

  return (
    <div className={css.cardWrapper}>
      <svg className={css.cup}>
        <use href="/images/icons.svg#icon-cup"></use>
      </svg>
      <div className={css.infoWrapper}>
        <p className={css.amount}>
          {amount} {t('waterUserInfo.ml')}
        </p>
        <p className={css.time}>{formattedTime}</p>
      </div>
      <div className={css.svgWrapper}>
        <button
          onClick={() =>
            dispatch(toggleModal('edit'), dispatch(setPosition('null')), dispatch(setId(id)))
          }
        >
          <svg className={css.svg}>
            <use href="/images/icons.svg#icon-edit-2"></use>
          </svg>
        </button>
        <button
          onClick={() =>
            dispatch(toggleModal('deleteWater'), dispatch(setPosition('null')), dispatch(setId(id)))
          }
        >
          <svg className={css.svg}>
            <use href="/images/icons.svg#icon-trash"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
