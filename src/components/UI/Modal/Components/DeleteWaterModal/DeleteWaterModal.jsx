import { useDispatch, useSelector } from 'react-redux';
import css from './DeleteWaterModal.module.css';
import { deleteWaterEntry } from '../../../../../redux/water/operations.js';
import toast from 'react-hot-toast';
import { toggleModal } from '../../../../../redux/modal/slice.js';
import { selectConsumedWaterData, selectWaterId } from '../../../../../redux/water/selectors.js';
import { useTranslation } from 'react-i18next';
import { removeTotalDayWater } from '../../../../../redux/water/slice';

const DeleteWaterModal = () => {
  const waterNotesArray = useSelector(selectConsumedWaterData);

  const dispatch = useDispatch();
  const waterId = useSelector(selectWaterId);
  const deletedDayData = waterNotesArray.find(({ _id }) => _id === waterId);
  const { t } = useTranslation();

  const successStyle = { backgroundColor: '#9be1a0', fontWeight: 'medium' };
  const errorStyle = { backgroundColor: '#FFCCCC', fontWeight: 'medium' };
  const successIconTheme = { primary: 'white', secondary: 'black' };
  const errorIconTheme = { primary: 'white', secondary: 'red' };

  const handleDelete = async () => {
    try {
      await dispatch(deleteWaterEntry(waterId)).unwrap();
      dispatch(toggleModal());
      dispatch(removeTotalDayWater(deletedDayData));

      toast.success(t('notifications.water_deleted'), {
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
      <h2 className={css.modalTitle}>{t('deleteWaterModal.delete_entry')}</h2>
      <p className={css.modalText}>{t('deleteWaterModal.are_you_sure')}</p>
      <div className={css.modalActions}>
        <button className={css.confirmBtn} onClick={handleDelete}>
          {t('common.delete')}
        </button>
        <button className={css.cancelBtn} onClick={() => dispatch(toggleModal())}>
          {t('common.cancel')}
        </button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
