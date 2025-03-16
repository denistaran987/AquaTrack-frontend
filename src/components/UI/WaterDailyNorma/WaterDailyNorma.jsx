import React from 'react';
import s from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectUserDailyNorm } from '../../../redux/user/selectors';

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectUserDailyNorm);
  const dayliNormaLitr = (dailyNorma / 1000).toFixed(1);
  return (
    <div className={s.waterDailyNorma}>
      <span className={s.normaValue}>{dayliNormaLitr} L</span>
      <span className={s.normaText}>My daily norma</span>
    </div>
  );
};

export default WaterDailyNorma;
