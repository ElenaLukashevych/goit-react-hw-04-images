import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal__root');

function Modal({onClose, children}) {

  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);
  
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
        return createPortal( <div onClick={handleBackdropClick} className={s.overlay}>
                <div className={s.modal}>{children}</div>
            </div>, modalRoot)
   
} 

Modal.propTypes = {
   onClose: PropTypes.func.isRequired,
   children: PropTypes.object.isRequired,
}

export default Modal;