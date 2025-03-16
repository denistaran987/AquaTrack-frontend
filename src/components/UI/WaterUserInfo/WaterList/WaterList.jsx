import React from 'react';
import WaterItem from '../WaterItem/WaterItem.jsx';
import css from './WaterList.module.css';
import WaterPlaceholder from '../WaterListPlaceholder/WaterListPlaceholder.jsx';
import { useSelector } from 'react-redux';
import { selectConsumedWaterData } from '../../../../redux/water/selectors.js';

const WaterList = () => {
  const waterNotesArray = useSelector(selectConsumedWaterData);

  return (
    <div className={css.WaterListWrapper}>
      <ul className={css.waterList}>
        {waterNotesArray.length === 0 ? (
          <WaterPlaceholder />
        ) : (
          waterNotesArray.map(({ _id, time, amount }) => (
            <li key={crypto.randomUUID()}>
              <WaterItem id={_id} amount={amount} time={time} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WaterList;
