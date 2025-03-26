import React from 'react';
import css from './ChooseDate.module.css';
import { selectWaterCurrentDate } from '../../../../redux/water/selectors.js';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';

const ChooseDate = () => {
  const dateString = useSelector(selectWaterCurrentDate);

  const now = new Date();
  const offset = now.getTimezoneOffset() * 60 * 1000;
  const utcDate = new Date(now.getTime() - offset);
  const formatDate = utcDate.toISOString().slice(0, 10);
  const formattedDateString = dateString.slice(0, 10);

  const today = formattedDateString === formatDate;

  const date = parseISO(dateString);

  const formattedDate = today
    ? 'Today'
    : `${date.toLocaleDateString('en-GB', {
        day: 'numeric',
        timeZone: 'UTC',
      })}, ${date.toLocaleDateString('en-GB', {
        month: 'long',
        timeZone: 'UTC',
      })}`;

  if (formattedDate === 'Invalid Date, Invalid Date') return;
  return <p className={css.text}>{formattedDate}</p>;
};

export default ChooseDate;
