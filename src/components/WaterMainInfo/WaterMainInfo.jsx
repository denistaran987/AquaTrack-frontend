import React from 'react';
import s from './WaterMainInfo.module.css';

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

        <div className={s.waterDailyNorma}>
          <span className={s.normaValue}>1.5 L</span>
          <span className={s.normaText}>My daily norma</span>
        </div>
      </div>

      <button className={s.addWaterBtn} onClick={handleAddWaterClick}>
        + Add water
      </button>
    </section>
  );
};

export default WaterMainInfo;
