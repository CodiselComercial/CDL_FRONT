import React from 'react';
import { RefreshCcw } from 'lucide-react';
import styles from './SyncButton.module.css';

const SyncButton = ({ onClick, children, disabled = false }) => {
  return (
    <button 
      className={`${styles.syncButton} ${disabled ? styles.disabled : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <RefreshCcw size={18} />
      {children}
    </button>
  );
};

export default SyncButton;
