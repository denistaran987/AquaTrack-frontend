import React from 'react';
import UserBar from '../UserBar/UserBar.jsx';
import css from './UserPanel.module.css';
import { selectUserName } from '../../../../redux/user/selectors.js';
import { useSelector } from 'react-redux';

const UserPanel = () => {
  const name = useSelector(selectUserName);

  const userName = name !== ' ' ? name : 'User';

  return (
    <div className={css.UserPanelWrapper}>
      <h2 className={css.title}>
        Hello<span className={css.titleSpan}>, {userName}!</span>
      </h2>
      <UserBar name={userName} />
    </div>
  );
};

export default UserPanel;
