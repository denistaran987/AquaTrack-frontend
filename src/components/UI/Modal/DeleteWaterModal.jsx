import { useDispatch } from 'react-redux';
import Modal from './Modal';
import css from './DeleteWaterModal.module.css';
import { deleteWaterEntry } from '../../../redux/waterList/operations';

export default function DeleteWaterModal({ isOpen, onRequestClose, entryId }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(entryId)).unwrap();
      alert('Entry deleted successfully'); // Уведомление об успешном удалении
      onRequestClose(); // Закрываем модальное окно
    } catch (error) {
      console.error(`Error: ${error.message}`);
      alert(`Error: ${error.message}`); // Уведомление об ошибке
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={css.modalContent}>
        <h2 className={css.modalTitle}>Delete entry</h2>
        <p className={css.modalText}>Are you sure you want to delete the entry?</p>
        <div className={css.modalActions}>
          <button className={css.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
          <button className={css.cancelBtn} onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
