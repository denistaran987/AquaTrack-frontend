import React, { useState } from 'react';
import css from './UserBar.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';

const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={css.wrapper}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.button}>
        <p className={css.name}>Nadia</p>
        <img className={css.image} src="/public/images/avatar_1.jpg" alt="User image" />
        <svg className={css.svg}>
          <use href="/images/icons.svg#icon-right"></use>
        </svg>
      </button>
      <UserBarPopover isOpen={isOpen} />
    </div>
  );
};

export default UserBar;
