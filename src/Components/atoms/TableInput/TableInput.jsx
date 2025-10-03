import React from 'react';
import styles from './TableInput.module.css';

const TableInput = ({ value, onChange, placeholder, name, type = 'text' }) => {
  return (
    <input
      type={type}
      className={styles.tableInput}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default TableInput;
