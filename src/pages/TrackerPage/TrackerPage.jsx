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
import { setPosition, toggleModal } from '../../redux/modal/slice';
import { fetchUserInfo } from '../../redux/user/operations';
import { selectToken } from '../../redux/auth/selectors';
import WaterModal from '../../components/UI/Modal/Components/WaterModal/WaterModal';

const TrackerPage = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpenModal);
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(fetchUserInfo(token));
  }, [dispatch, token]);

  return (
    <div className="section">
      <div className={clsx('container', s['homepage-wrapper'])}>
        <WaterMainInfo />
      </div>
      <button
        type="button"
        onClick={() => dispatch(toggleModal('deleteWater'), dispatch(setPosition('null')))}
      >
        Open DeleteWaterModal
      </button>
      <button
        type="button"
        onClick={() => dispatch(toggleModal('logout'), dispatch(setPosition('null')))}
      >
        Open Logout
      </button>
      <button
        type="button"
        onClick={() => dispatch(toggleModal('edit'), dispatch(setPosition('null')))}
      >
        Open EditWaterModal
      </button>
      <button
        type="button"
        onClick={() => dispatch(toggleModal('settings'), dispatch(setPosition('top')))}
      >
        Open Settings Modal
      </button>
      {isOpen && (
        <Modal isOpen={isOpen} toggleModal={() => dispatch(toggleModal())}>
          {isOpen === 'deleteWater' && <DeleteWaterModal />}
          {isOpen === 'logout' && <LogOutModal />}
          {isOpen === 'settings' && <SettingsModal />}
          {isOpen === 'add' && <WaterModal />}
          {isOpen === 'edit' && <WaterModal type={'edit'} />}
        </Modal>
      )}
    </div>
  );
};

export default TrackerPage;
