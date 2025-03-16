import React from 'react';
import css from './WaterDetailedInfo.module.css';
import UserPanel from '../WaterUserPanel/UserPanel/UserPanel.jsx';
import DailyInfo from '../WaterUserInfo/DailyInfo/DailyInfo.jsx';
import CalendarContainer from '../Calendar/CalendarContainer/CalendarContainer';

const WaterDetailedInfo = () => {
  return (
    <section className={css.section}>
      <UserPanel />
      <DailyInfo />
      <CalendarContainer/>
    </section>
  );
};

export default WaterDetailedInfo;
