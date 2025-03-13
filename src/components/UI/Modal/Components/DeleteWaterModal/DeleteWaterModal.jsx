import { useDispatch, useSelector } from 'react-redux';
import css from './DeleteWaterModal.module.css';
import { deleteWaterEntry } from '../../../../../redux/water/operations.js';
import toast from 'react-hot-toast';
import { toggleModal } from '../../../../../redux/modal/slice.js';
import { selectWaterId } from '../../../../../redux/water/selectors.js';

const DeleteWaterModal = () => {
  const dispatch = useDispatch();
  const waterId = useSelector(selectWaterId);

  const successStyle = { backgroundColor: '#9be1a0', fontWeight: 'medium' };
  const errorStyle = { backgroundColor: '#FFCCCC', fontWeight: 'medium' };
  const successIconTheme = { primary: 'white', secondary: 'black' };
  const errorIconTheme = { primary: 'white', secondary: 'red' };

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(waterId)).unwrap();

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
      <h2 className={css.modalTitle}>Delete entry</h2>
      <p className={css.modalText}>Are you sure you want to delete the entry?</p>
      <div className={css.modalActions}>
        <button className={css.confirmBtn} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.cancelBtn} onClick={() => dispatch(toggleModal())}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
