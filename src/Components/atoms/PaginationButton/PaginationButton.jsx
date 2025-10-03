import React from 'react';
import styles from './PaginationButton.module.css';

const PaginationButton = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'default'
}) => {
  return (
    <button 
      className={`${styles.paginationButton} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default PaginationButton;