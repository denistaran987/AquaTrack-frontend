import React from 'react';

import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/UI/WaterMainInfo/WaterMainInfo';

const TrackerPage = () => {
  return (
    <div className={s.container}>
      <WaterMainInfo />
    </div>
  );
};

export default TrackerPage;
