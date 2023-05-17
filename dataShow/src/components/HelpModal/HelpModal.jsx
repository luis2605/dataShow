import React from 'react'
import styles from "./helpModal.module.css"

const HelpModal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  )
}

export default HelpModal