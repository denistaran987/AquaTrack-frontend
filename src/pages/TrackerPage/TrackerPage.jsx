import React from 'react';

import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/UI/WaterMainInfo/WaterMainInfo';
import CalendarContainer from '../../components/UI/Calendar/CalendarContainer/CalendarContainer';


const TrackerPage = () => {
  return (
    <div className={s.container}>
      <WaterMainInfo />
       <CalendarContainer/>
    </div>
  );
};

export default TrackerPage;
