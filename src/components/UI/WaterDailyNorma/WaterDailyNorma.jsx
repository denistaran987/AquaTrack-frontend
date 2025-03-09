import React from 'react';
import s from './WaterDailyNorma.module.css';

const WaterDailyNorma = ({ dailyNorma = 1.5 }) => {
  return (
    <div className={s.waterDailyNorma}>
      <span className={s.normaValue}>{dailyNorma} L</span>
      <span className={s.normaText}>My daily norma</span>
    </div>
  );
};

export default WaterDailyNorma;
