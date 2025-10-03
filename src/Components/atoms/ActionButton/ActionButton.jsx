import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import styles from './ActionButton.module.css';

const ActionButton = ({ type, onClick, disabled = false, size = 'medium' }) => {
  const getIcon = () => {
    switch (type) {
      case 'edit':
        return <Edit size={16} />;
      case 'delete':
        return <Trash2 size={16} />;
      case 'view':
        return <Eye size={16} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'edit':
        return 'Editar';
      case 'delete':
        return 'Eliminar';
      case 'view':
        return 'Ver';
      default:
        return '';
    }
  };

  return (
    <button
      className={`${styles.actionButton} ${styles[type]} ${styles[size]}`}
      onClick={onClick}
      disabled={disabled}
      title={getLabel()}
    >
      {getIcon()}
      <span className={styles.label}>{getLabel()}</span>
    </button>
  );
};

export default ActionButton;
