import React from 'react';
import WaterItem from '../WaterItem/WaterItem.jsx';

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
  ];

  return (
    <div>
      {arr.map(({ time, amount }) => (
        <WaterItem key={time} amount={amount} time={time} />
      ))}
    </div>
  );
};

export default WaterList;
