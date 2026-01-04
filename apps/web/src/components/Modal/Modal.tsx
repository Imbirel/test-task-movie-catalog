import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles['modal__overlay']} onClick={onClose}>
      <div className={styles['modal__content']} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles['modal__close-button']} onClick={onClose} aria-label="Закрыть модальное окно">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M17.414 16L26 7.414L24.586 6L16 14.586L7.414 6L6 7.414L14.586 16L6 24.586L7.414 26L16 17.414L24.586 26L26 24.586z"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};
