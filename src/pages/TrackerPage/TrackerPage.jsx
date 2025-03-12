import React from 'react';
import clsx from 'clsx';
import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/UI/WaterMainInfo/WaterMainInfo';

const TrackerPage = () => {
  return (
    <div className="section">
      <div className={clsx('container', s['homepage-wrapper'])}>
        <WaterMainInfo />
      </div>
    </div>
  );
};

export default TrackerPage;
