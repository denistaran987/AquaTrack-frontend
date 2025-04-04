import React from 'react';
import s from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectUserDailyNorm } from '../../../redux/user/selectors';
import { useTranslation } from 'react-i18next';

const WaterDailyNorma = () => {
  const dailyNorma = useSelector(selectUserDailyNorm);
  const dayliNormaLitr = (dailyNorma / 1000).toFixed(1);
  const { t } = useTranslation();
  return (
    <div className={s.waterDailyNorma}>
      <span className={s.normaValue}>
        {dayliNormaLitr} {t('waterMAinInfo.l')}
      </span>
      <span className={s.normaText}>{t('waterMAinInfo.my_daily_norma')}</span>
    </div>
  );
};

export default WaterDailyNorma;
