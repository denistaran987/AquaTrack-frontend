import React from 'react';
import UserBar from '../UserBar/UserBar.jsx';
import css from './UserPanel.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';
import { selectUserName } from '../../../../redux/user/selectors.js';
import { useSelector } from 'react-redux';

const UserPanel = () => {
  const name = useSelector(selectUserName);
  return (
    <div className={css.UserPanelWrapper}>
      <h2 className={css.title}>
        Hello<span className={css.titleSpan}>, {name}!</span>
      </h2>
      <UserBar name={name} />
    </div>
  );
};

export default UserPanel;
