import React, { useEffect, useState } from 'react';
import s from './WaterProgressBar.module.css';
import { useSelector } from 'react-redux';
import { selectTodayProgress } from '../../../redux/water/selectors';
import { selectWaterNorm } from '../../../redux/user/selectors';
import { useTranslation } from 'react-i18next';

const WaterProgressBar = () => {
  const progress = useSelector(selectTodayProgress);
  const dailyNorm = useSelector(selectWaterNorm);
  const { t } = useTranslation();
  const getProgressBarWidthCoefficient = () => {
    if (window.innerWidth >= 768) {
      return 2.55;
    } else {
      return 1.74;
    }
  };

  const todayProgress = progress ? Math.min(Math.round((progress / dailyNorm) * 100), 100) : 0;

  const [progressBarWidthCoefficient, setProgressBarWidthCoefficient] = useState(
    getProgressBarWidthCoefficient()
  );

  useEffect(() => {
    const handleResize = () => {
      setProgressBarWidthCoefficient(getProgressBarWidthCoefficient());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={s.progressBar}>
      <h2 className={s.today}>{t('waterMAinInfo.today_norma')}</h2>
      <span
        className={s.activePercent}
        style={{
          left: `calc(${todayProgress}px * ${progressBarWidthCoefficient})`,
          color: todayProgress >= 100 && '#9be1a0',
        }}
      >{`${todayProgress}%`}</span>
      <div className={s.progressBarContainer}>
        <div className={s.progressBarFiller} style={{ width: `${todayProgress}%` }}></div>
        <div className={s.circle} style={{ left: `calc(${todayProgress}% - 10px)` }}></div>
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
