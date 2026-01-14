import React from 'react';
import styles from './Input.module.css';

const Input = ({ type, placeholder, value, onChange, name, required = true, autoComplete }) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      autoComplete={autoComplete}
    />
  );
};

export default Input;