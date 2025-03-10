import React from 'react';
import css from './WaterDetailedInfo.module.css';
import UserPanel from '../WaterUserPanel/UserPanel/UserPanel.jsx';
import DailyInfo from '../WaterUserInfo/DailyInfo/DailyInfo.jsx';

const WaterDetailedInfo = () => {
  return (
    <div>
      <div className="container">
        <section className={css.section}>
          <UserPanel />
          <DailyInfo />
        </section>
      </div>
    </div>
  );
};

export default WaterDetailedInfo;
