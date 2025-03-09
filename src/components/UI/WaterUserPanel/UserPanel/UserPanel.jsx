import React from 'react';
import UserBar from '../UserBar/UserBar.jsx';
import css from './UserPanel.module.css';

const UserPanel = () => {
  return (
    <div className={css.UserPanelWrapper}>
      <h2 className={css.title}>
        Hello<span className={css.titleSpan}>, Nadia!</span>
      </h2>
      <UserBar />
    </div>
  );
};

export default UserPanel;
