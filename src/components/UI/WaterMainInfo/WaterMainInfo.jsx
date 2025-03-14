import React, { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import s from './WaterMainInfo.module.css';
import WaterDailyNorma from '../WaterDailyNorma/WaterDailyNorma';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import WaterProgressBar from '../WaterProgressBar/WaterProgressBar';

const WaterMainInfo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(65);
  }, []);

  return (
    <section className={s.section}>
      <Logo />
      <div className={s.bottle}></div>
      <WaterDailyNorma />
      <AddWaterBtn />
      <WaterProgressBar progress={progress} />
    </section>
  );
};

export default WaterMainInfo;
