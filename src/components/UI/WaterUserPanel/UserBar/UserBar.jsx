import React, { useState, useEffect, useRef } from 'react';
import css from './UserBar.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover.jsx';
import { clsx } from 'clsx';
import { useSelector } from 'react-redux';
import { selectUserAvatarUrl } from '../../../../redux/user/selectors.js';

const UserBar = ({ name }) => {
  const userAvatarUrl = useSelector(selectUserAvatarUrl);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!userAvatarUrl) return null;

  const formattedUserName = name.length > 10 ? `${name.slice(0, 10)}...` : `${name}`;

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={css.button}>
        <p className={css.name}>{formattedUserName}</p>
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
