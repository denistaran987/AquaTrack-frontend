import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import css from './Modal.module.css';

const Modal = ({ children, toggleModal, isOpen, position }) => {
  const modalRoot = document.querySelector('#modal-root');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        setIsAnimating(false);
        setTimeout(toggleModal, 300);
      }
    };

    if (isOpen) {
      setIsAnimating(true);
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleModal]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      setIsAnimating(false);
      setTimeout(toggleModal, 300);
    }
  };

  return createPortal(
    <div
      className={clsx(css.backdrop, { [css.active]: isOpen, [css.hidden]: !isAnimating })}
      onClick={handleClickBackdrop}
    >
      <div className={clsx(css.modalContent, { [css.topPosition]: position === 'top' })}>
        <button
          className={css.btn}
          onClick={() => {
            setIsAnimating(false);
            setTimeout(toggleModal, 300);
          }}
        >
          <svg width="28" height="28" className={css.icon}>
            <use href="/images/icons.svg#icon-x"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
