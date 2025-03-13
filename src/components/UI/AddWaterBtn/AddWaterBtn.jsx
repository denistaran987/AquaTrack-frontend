import React from 'react';
import s from './AddWaterBtn.module.css';

const AddWaterBtn = ({ onClick }) => {
  return (
    <button className={s.addWaterBtn} onClick={onClick}>
      + Add water
    </button>
  );
};

export default AddWaterBtn;
