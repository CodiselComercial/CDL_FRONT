import React from 'react';
import { Star } from 'lucide-react';
import styles from './FeaturedButton.module.css';

const FeaturedButton = ({ active, onClick, children }) => {
  return (
    <button 
      className={`${styles.featuredButton} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      <Star size={18} fill={active ? 'currentColor' : 'none'} />
      {children}
    </button>
  );
};

export default FeaturedButton;
