import css from './UserBarPopover.module.css';
import clsx from 'clsx';
import { setPosition, toggleModal } from '../../../../redux/modal/slice.js';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const UserBarPopover = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
          <p>{t('common.setting')}</p>
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
          <p>{t('common.log_out')}</p>
        </button>
      </li>
    </ul>
  );
};

export default UserBarPopover;
