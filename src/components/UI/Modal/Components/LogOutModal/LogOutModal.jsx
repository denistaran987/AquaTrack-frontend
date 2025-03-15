import { useDispatch } from 'react-redux';
import css from './LogOutModal.module.css';
import toast from 'react-hot-toast';
import { toggleModal } from '../../../../../redux/modal/slice.js';
import { logout } from '../../../../../redux/auth/operations.js';

const LogOutModal = () => {
  const dispatch = useDispatch();

  const successStyle = { backgroundColor: '#9be1a0', fontWeight: 'medium' };
  const errorStyle = { backgroundColor: '#FFCCCC', fontWeight: 'medium' };
  const successIconTheme = { primary: 'white', secondary: 'black' };
  const errorIconTheme = { primary: 'white', secondary: 'red' };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(toggleModal());

      toast.success('Logout successful!', {
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
      <h2 className={css.modalTitle}>Log out</h2>
      <p className={css.modalText}>Do you really want to leave?</p>
      <div className={css.modalActions}>
        <button className={css.confirmBtn} onClick={handleLogout}>
          Log out
        </button>
        <button className={css.cancelBtn} onClick={() => dispatch(toggleModal())}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
