import React, { useEffect } from 'react';
import clsx from 'clsx';
import s from './TrackerPage.module.css';
import WaterMainInfo from '../../components/UI/WaterMainInfo/WaterMainInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpenModal } from '../../redux/modal/selector';
import Modal from '../../components/UI/Modal/Modal';
import SettingsModal from '../../components/UI/Modal/Components/SettingsModal/SettingsModal';
import DeleteWaterModal from '../../components/UI/Modal/Components/DeleteWaterModal/DeleteWaterModal';
import LogOutModal from '../../components/UI/Modal/Components/LogOutModal/LogOutModal';
import { toggleModal } from '../../redux/modal/slice';
import { fetchUserInfo } from '../../redux/user/operations';
import { selectToken } from '../../redux/auth/selectors';
import WaterDetailedInfo from '../../components/UI/WaterDetailedInfo/WaterDetailedInfo.jsx';
import WaterModal from '../../components/UI/Modal/Components/WaterModal/WaterModal';
import { selectWaterCurrentDate } from '../../redux/water/selectors.js';
import { getWaterByDay } from '../../redux/water/operations.js';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  const token = useSelector(selectToken);
  const currentDate = useSelector(selectWaterCurrentDate);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (!currentDate && token) {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60 * 1000;
      const utcDate = new Date(now.getTime() - offset);
      const formattedDate = utcDate.toISOString();

      dispatch(getWaterByDay({ date: formattedDate, token }));
    }
  }, [dispatch, token, currentDate]);

  return (
    <div className="section">
      <div className={clsx('container', s['homepage-wrapper'])}>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} toggleModal={() => dispatch(toggleModal())}>
          {isOpen === 'deleteWater' && <DeleteWaterModal />}
          {isOpen === 'logout' && <LogOutModal />}
          {isOpen === 'settings' && <SettingsModal />}
          {isOpen === 'add' && <WaterModal type={'add'} />}
          {isOpen === 'edit' && <WaterModal type={'edit'} />}
        </Modal>
      )}
    </div>
  );
};

export default TrackerPage;
