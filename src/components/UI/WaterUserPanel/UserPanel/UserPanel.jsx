import React from 'react';
import UserBar from '../UserBar/UserBar.jsx';
import css from './UserPanel.module.css';
import { selectUserName } from '../../../../redux/user/selectors.js';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const UserPanel = () => {
  const name = useSelector(selectUserName);
  const { t } = useTranslation();
  const userName = name !== ' ' ? name : t('notifications.user_name');
  const formattedUserName = userName.length > 10 ? `${userName.slice(0, 10)}...!` : `${userName} !`;

  return (
    <div className={css.UserPanelWrapper}>
      <h2 className={css.title}>
        {t('notifications.hello')}
        <span className={css.titleSpan}>, {formattedUserName}</span>
      </h2>
      <UserBar name={userName} />
    </div>
  );
};

export default UserPanel;
