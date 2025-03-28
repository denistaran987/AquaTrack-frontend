import React from 'react';
import css from './ChooseDate.module.css';
import { selectWaterCurrentDate } from '../../../../redux/water/selectors.js';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const ChooseDate = () => {
  const dateString = useSelector(selectWaterCurrentDate);
  const { t } = useTranslation();

  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  const utcDate = new Date(now.getTime() - offset);
  const formatDate = utcDate.toISOString().slice(0, 10);
  const formattedDateString = dateString.slice(0, 10);

  const today = formattedDateString === formatDate;

  const date = parseISO(dateString);

  const formattedDate = today
    ? t('waterMAinInfo.today_norma')
    : `${date.toLocaleDateString('en-GB', {
        day: 'numeric',
        timeZone: 'UTC',
      })}, ${date.toLocaleDateString(i18next.language, {
        month: 'long',
        timeZone: 'UTC',
      })}`;

  if (formattedDate === 'Invalid Date, Invalid Date') return;
  return <p className={css.text}>{formattedDate}</p>;
};

export default ChooseDate;
