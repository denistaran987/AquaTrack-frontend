import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import css from './Modal.module.css';
import sprite from '/images/icons.svg';

const Modal = ({ children, toggleModal, position }) => {
  const modalRoot = document.querySelector('#modal-root');

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code !== 'Escape') {
        return;
      }
      toggleModal();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const handleClickBackdrop = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    toggleModal();
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleClickBackdrop}>
      <div className={clsx(css.modal, { [css.topPosition]: position === 'top' })}>
        <button className={css.btn} onClick={toggleModal}>
          <svg className={css.icon}>
            <use href={`${sprite}#icon-x`}></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
