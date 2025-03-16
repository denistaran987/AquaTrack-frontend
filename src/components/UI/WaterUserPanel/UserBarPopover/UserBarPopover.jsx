import css from './UserBarPopover.module.css';
import clsx from 'clsx';
import { setPosition, toggleModal } from '../../../../redux/modal/slice.js';
import { useDispatch } from 'react-redux';

const UserBarPopover = ({ isOpen }) => {
  const dispatch = useDispatch();
  return (
    <ul className={clsx(css.wrapper, isOpen && css.anim)}>
      <li>
        <button
          onClick={() => dispatch(toggleModal('settings'), dispatch(setPosition('top')))}
          type="button"
          className={css.item}
        >
          <svg width="16" height="16">
            <use href="/images/icons.svg#icon-settings"></use>
          </svg>
          <p>Setting</p>
        </button>
      </li>
      <li>
        <button
          onClick={() => dispatch(toggleModal('logout'), dispatch(setPosition('null')))}
          type="button"
          className={clsx(css.item, css['item-logout'])}
        >
          <svg width="16" height="16">
            <use href="/images/icons.svg#icon-log-out"></use>
          </svg>
          <p>Log out</p>
        </button>
      </li>
    </ul>
  );
};

export default UserBarPopover;
