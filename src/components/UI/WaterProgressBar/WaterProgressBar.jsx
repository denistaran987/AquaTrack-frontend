import React from 'react';
import s from './WaterProgressBar.module.css';

const WaterProgressBar = ({ progress }) => {
  return (
    <div className={s.progressBar}>
      <h2 className={s.today}>Today</h2>
      <span
        className={s.activePercent}
        style={{
          left: `calc(${progress}px * 1.72)`,
          color: progress === 100 && '#9be1a0',
        }}
      >{`${progress}%`}</span>
      <div className={s.progressBarContainer}>
        <div className={s.progressBarFiller} style={{ width: `${progress}%` }}></div>
        <div className={s.circle} style={{ left: `calc(${progress}% - 10px)` }}></div>
      </div>
      <div className={s.progressBarLabels}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default WaterProgressBar;
