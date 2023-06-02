import React from 'react'
import styles from "./Modal.module.css"

const Modal = ({ isOpen, onClose, children ,onSelection}) => {
  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} >
     <div className={onSelection && onSelection.length === 0 ? `${styles['modalContent-noSelection']} ${styles['modalContent']}` : styles['modalContent']}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        {children }
      </div>
    </div>
  )
}

export default Modal