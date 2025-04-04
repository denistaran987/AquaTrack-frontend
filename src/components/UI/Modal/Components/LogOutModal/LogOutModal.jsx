import { useDispatch } from 'react-redux';
import css from './LogOutModal.module.css';
import toast from 'react-hot-toast';
import { toggleModal } from '../../../../../redux/modal/slice.js';
import { logout } from '../../../../../redux/auth/operations.js';
import { useTranslation } from 'react-i18next';

const LogOutModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const successStyle = { backgroundColor: '#9be1a0', fontWeight: 'medium' };
  const errorStyle = { backgroundColor: '#FFCCCC', fontWeight: 'medium' };
  const successIconTheme = { primary: 'white', secondary: 'black' };
  const errorIconTheme = { primary: 'white', secondary: 'red' };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(toggleModal());

      toast.success(t('notifications.log_out_finish'), {
        style: successStyle,
        iconTheme: successIconTheme,
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        style: errorStyle,
        iconTheme: errorIconTheme,
      });
    }
  };

  return (
    <div className={css.modalContent}>
      <h2 className={css.modalTitle}>{t('common.log_out')}</h2>
      <p className={css.modalText}>{t('logOutModal.text')}</p>
      <div className={css.modalActions}>
        <button className={css.confirmBtn} onClick={handleLogout}>
          {t('common.log_out')}
        </button>
        <button className={css.cancelBtn} onClick={() => dispatch(toggleModal())}>
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
