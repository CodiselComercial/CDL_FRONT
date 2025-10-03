import React from 'react';
import { Plus } from 'lucide-react';
import styles from './AddButton.module.css';

const AddButton = ({ onClick, children, disabled = false }) => {
  return (
    <button 
      className={`${styles.addButton} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Plus size={18} />
      {children}
    </button>
  );
};

export default AddButton;
