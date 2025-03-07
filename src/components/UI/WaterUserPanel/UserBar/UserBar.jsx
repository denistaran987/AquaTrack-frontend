import React from 'react';
import css from './UserBar.module.css';

const UserBar = () => {
  return (
    <button className={css.button}>
      <p className={css.name}>Nadia</p>
      <img className={css.image} src="/public/images/avatar_1.jpg" alt="User image" />
      <svg
        width="16"
        height="16"
        style={{ fill: 'none', stroke: 'white', transform: 'rotate(90deg)' }}
      >
        <use href="/images/icons.svg#icon-right"></use>
      </svg>
    </button>
  );
};

export default UserBar;
