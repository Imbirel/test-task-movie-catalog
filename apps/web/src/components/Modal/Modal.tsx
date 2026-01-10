import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [container] = useState(() => (typeof document !== 'undefined' ? document.getElementById('modal-root') : null));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  if (!container) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles['modal']}
      aria-modal="true"
      aria-label={title || 'Модальное окно'}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <button className={styles['modal__close-button']} onClick={onClose} aria-label="Закрыть окно">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.414 16L26 7.414L24.586 6L16 14.586L7.414 6L6 7.414L14.586 16L6 24.586L7.414 26L16 17.414L24.586 26L26 24.586z"
          />
        </svg>
      </button>
      {children}
    </dialog>,
    container
  );
};
