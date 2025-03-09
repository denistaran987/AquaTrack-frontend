import React from 'react';
import s from './WaterMainInfo.module.css';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';

const WaterMainInfo = () => {
  const handleAddWaterClick = () => {
    console.log('Open WaterModal');
  };

  return (
    <section className={s.container}>
      <header className={s.header}>
        <h2 className={s.title}>AQUATRACK</h2>
      </header>
      <div className={s.bottleWrapper}>
        <div className={s.bottle}></div>
        <WaterDailyNorma />
      </div>

      <button className={s.addWaterBtn} onClick={handleAddWaterClick}>
        + Add water
      </button>
    </section>
  );
};

export default WaterMainInfo;
