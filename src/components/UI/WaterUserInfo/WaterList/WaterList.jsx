import React from 'react';
import WaterItem from '../WaterItem/WaterItem.jsx';
import css from './WaterList.module.css';

const WaterList = () => {
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
    {
      amount: 250,
      time: '7:00',
    },
  ];

  return (
    <div className={css.WaterListWrapper}>
      {/* <SimpleBar
        style={{
          overflowX: 'auto',
          paddingBottom: '35px',
        }}
      > */}
      <div className={css.waterList}>
        {arr.map(({ time, amount }) => (
          <WaterItem key={crypto.randomUUID()} amount={amount} time={time} />
        ))}
      </div>
      {/* </SimpleBar> */}
    </div>
  );
};

export default WaterList;
