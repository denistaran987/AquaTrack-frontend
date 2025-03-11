import css from './UserBarPopover.module.css';
import clsx from 'clsx';

const UserBarPopover = ({ isOpen }) => {
  return (
    <ul className={clsx(css.wrapper, isOpen && css.anim)}>
      <li>
        <button type="button" className={css.item}>
          <svg width="16" height="16">
            <use href="/public/images/icons.svg#icon-settings"></use>
          </svg>
          <p>Setting</p>
        </button>
      </li>
      <li>
        <button type="button" className={clsx(css.item, css['item-logout'])}>
          <svg width="16" height="16">
            <use href="/public/images/icons.svg#icon-log-out"></use>
          </svg>
          <p>Log out</p>
        </button>
      </li>
    </ul>
  );
};

export default UserBarPopover;
