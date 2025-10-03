import React from 'react';
import styles from './InputMain.module.css';

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name,
  className = '',
  variant = 'default'
}) => {
  const inputClass = `${styles.input} ${styles[variant]} ${className}`;
  
  return (
    <input
      className={inputClass}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default Input;