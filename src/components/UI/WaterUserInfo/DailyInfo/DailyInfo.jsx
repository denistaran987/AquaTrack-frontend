import React from 'react';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import WaterList from '../WaterList/WaterList.jsx';

import css from './DailyInfo.module.css';

const DailyInfo = () => {
  return (
    <div className={css.DailyInfoWrapper}>
      <div className={css.waterInfoWrapper}>
        <ChooseDate />
        <AddWaterBtn />
      </div>
      <WaterList />
    </div>
  );
};

export default DailyInfo;
