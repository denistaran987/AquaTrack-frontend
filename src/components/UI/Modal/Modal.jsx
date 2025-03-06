import clsx from 'clsx';
import css from './Modal.module.css';
import sprite from '/public/images/icons.svg';
import { useEffect } from 'react';

// для прикладу, викликається ось так <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
//         <AddWaterModal onSubmit={handleAddWater} onCancel={closeModal} />
//       </Modal>

export default function Modal({ children, isOpen, onRequestClose }) {
  // це стиль для кнопки закривання, буде завжди в кутку елементу children(має бути як мінімум, побачимо)
  const closeButtonPosition =
    window.innerWidth > 768 ? { right: '40px', top: '40px' } : { right: '20px', top: '20px' };
  const handleModalClick = e => {
    e.stopPropagation();
  };
  useEffect(() => {
    const bodyElement = document.body;
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      bodyElement.classList.add('lock');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      bodyElement.classList.remove('lock');
    };
  }, [isOpen, onRequestClose]);

  return (
    <div
      className={isOpen ? clsx(css.backdrop, css.active) : css.backdrop}
      onClick={onRequestClose}
    >
      <div className={clsx(css.modal, { [css.active]: isOpen })} onClick={handleModalClick}>
        <button className={css.btn} onClick={onRequestClose} style={closeButtonPosition}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-x`}></use>
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
