import React, { useState } from 'react';
import css from './UserBar.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import { selectUserAvatarUrl } from '../../../../redux/user/selectors.js';

const UserBar = ({ name }) => {
  const userAvatarUrl = useSelector(selectUserAvatarUrl);
  const [isOpen, setIsOpen] = useState(false);

  if (!userAvatarUrl) return;

  return (
    <div className={css.wrapper}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.button}>
        <p className={css.name}>{name}</p>
        <img className={css.image} src={userAvatarUrl} alt="User image" />
        <svg className={clsx(css.svg, isOpen && css.svgOpen)}>
          <use href="/images/icons.svg#icon-right"></use>
        </svg>
      </button>
      <UserBarPopover isOpen={isOpen} />
    </div>
  );
};

export default UserBar;
