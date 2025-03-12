import { useEffect, useState } from 'react';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar.jsx';
import React from 'react';
import clsx from 'clsx';
import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/UI/WaterMainInfo/WaterMainInfo';

const TrackerPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(65);
  }, []);

  return ( 
    <div className="section">
      <div className={clsx('container', s['homepage-wrapper'])}>
        <WaterMainInfo />
        <ProgressBar progress={progress} />
      </div>
    </div>
  );
};

export default TrackerPage;
