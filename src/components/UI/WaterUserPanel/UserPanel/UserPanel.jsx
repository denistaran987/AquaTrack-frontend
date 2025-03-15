import React from 'react';
import UserBar from '../UserBar/UserBar.jsx';
import css from './UserPanel.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';

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
