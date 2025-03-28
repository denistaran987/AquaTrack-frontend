import React from 'react';
import s from './AddWaterBtn.module.css';
import { useDispatch } from 'react-redux';
import { setPosition, toggleModal } from '../../../redux/modal/slice';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <button
      className={s.addWaterBtn}
      onClick={() => dispatch(toggleModal('add'), dispatch(setPosition('null')))}
    >
      {t('waterMAinInfo.add_water')}
    </button>
  );
};

export default AddWaterBtn;
