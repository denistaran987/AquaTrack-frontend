import React from 'react';
import WaterItem from '../WaterItem/WaterItem.jsx';
import css from './WaterList.module.css';
import WaterPlaceholder from '../WaterListPlaceholder/WaterListPlaceholder.jsx';
// import { useSelector } from 'react-redux';

const WaterList = () => {
  // const waterNotesArray = useSelector();
  const arr = [
    {
      amount: 250,
      time: '7:00',
    },
    {
      amount: 250,
      time: '7:00',
    },
    {
      amount: '1L',
      time: '7:00',
    },
    {
      amount: 250,
      time: '7:00',
    },
    {
      amount: 250,
      time: '7:00',
    },
    {
      amount: 250,
      time: '7:00',
    },
  ];

  return (
    <div className={css.WaterListWrapper}>
      <ul className={css.waterList}>
        {arr.length === 0 ? (
          <WaterPlaceholder />
        ) : (
          arr.map(({ time, amount }) => (
            <li key={crypto.randomUUID()}>
              <WaterItem id={''} amount={amount} time={time} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WaterList;
