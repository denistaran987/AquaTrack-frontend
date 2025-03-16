import React from 'react';
import s from './AddWaterBtn.module.css';
import { useDispatch } from 'react-redux';
import { setPosition, toggleModal } from '../../../redux/modal/slice';

const AddWaterBtn = () => {
  const dispatch = useDispatch();
  return (
    <button
      className={s.addWaterBtn}
      onClick={() => dispatch(toggleModal('add'), dispatch(setPosition('null')))}
    >
      + Add water
    </button>
  );
};

export default AddWaterBtn;
