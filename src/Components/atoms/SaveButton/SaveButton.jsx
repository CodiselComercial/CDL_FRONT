import React from 'react';
import { Save } from 'lucide-react';
import styles from './SaveButton.module.css';

const SaveButton = ({ onClick, disabled, loading }) => {
  return (
    <button 
      className={`${styles.saveButton} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <Save size={16} />
      {loading ? 'Guardando...' : 'Guardar'}
    </button>
  );
};

export default SaveButton;
