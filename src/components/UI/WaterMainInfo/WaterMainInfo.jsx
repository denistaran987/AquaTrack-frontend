import React from 'react';
import Logo from '../Logo/Logo';
import s from './WaterMainInfo.module.css';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';

const WaterMainInfo = () => {
  return (
    <section className={s.section}>
      <Logo />
      <div className={s.bottle}></div>
      <WaterDailyNorma />
      <AddWaterBtn />
    </section>
  );
};

export default WaterMainInfo;
