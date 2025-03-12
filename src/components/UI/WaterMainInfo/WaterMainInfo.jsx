import React from 'react';
import s from './WaterMainInfo.module.css';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';

const WaterMainInfo = () => {
  const handleAddWaterClick = () => {
    console.log('Open WaterModal');
  };

  return (
    <section className={s.container}>
      <h2 className={s.title}>AQUATRACK</h2>
      <div className={s.bottle}></div>
      <WaterDailyNorma />
      <AddWaterBtn onClick={handleAddWaterClick} />
    </section>
  );
};

export default WaterMainInfo;
