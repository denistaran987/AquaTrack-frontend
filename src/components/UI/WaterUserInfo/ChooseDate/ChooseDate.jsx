import React from 'react';
import css from './ChooseDate.module.css';
import { selectWaterCurrentDate } from '../../../../redux/water/selectors.js';
import { useSelector } from 'react-redux';

const ChooseDate = () => {
  const dateString = useSelector(selectWaterCurrentDate);

  const date = new Date(dateString);
  console.log(date);
  const today = new Date();

  const isToday =
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate();

  const formattedDate = isToday
    ? 'Today'
    : `${date.toLocaleDateString('en-GB', {
        day: 'numeric',
        timeZone: 'UTC',
      })}, ${date.toLocaleDateString('en-GB', {
        month: 'long',
        timeZone: 'UTC',
      })}`;

  return <p className={css.text}>{formattedDate}</p>;
};

export default ChooseDate;
