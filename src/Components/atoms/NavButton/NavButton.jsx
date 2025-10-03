import React from 'react';
import styles from './NavButton.module.css';

const NavButton = ({ children, onClick, active = false, variant = 'default' }) => {
  const buttonClass = `${styles.navButton} ${active ? styles.active : ''} ${styles[variant]}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default NavButton;
