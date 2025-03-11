import { useDispatch } from 'react-redux';
import css from './ConfirmModal.module.css';
import { deleteWaterEntry } from '../../../../../redux/water/operations.js';
import toast from 'react-hot-toast';

export default function ConfirmModal({ toggleModal, entryId, title, text, buttonText }) {
  const dispatch = useDispatch();

  const successStyle = { backgroundColor: '#00ced1', fontWeight: 'bold' };
  const errorStyle = { backgroundColor: '#FFCCCC', fontWeight: 'bold' };
  const successIconTheme = { primary: 'white', secondary: 'black' };
  const errorIconTheme = { primary: 'white', secondary: 'red' };

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(entryId)).unwrap();

      toast.success('Entry deleted successfully!', {
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
      <h2 className={css.modalTitle}>{title}</h2>
      <p className={css.modalText}>{text}</p>
      <div className={css.modalActions}>
        <button className={css.confirmBtn} onClick={handleDelete}>
          {buttonText}
        </button>
        <button className={css.cancelBtn} onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}
