import React from 'react';
import { Search } from 'lucide-react';
import Input from '../../atoms/InputMain/InputMain.jsx';
import FeaturedButton from '../../atoms/FeaturedButton/FeaturedButton.jsx';
import styles from './SearchBar.module.css';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Buscar producto...', 
  showFeatured, 
  onFeaturedToggle,
  onExportExcel 
}) => (
  <div className={styles.searchContainer}>
    <div className={styles.searchInputContainer}>
      <Search className={styles.searchIcon} size={20} />
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.searchInput}
      />
    </div>
    <div className={styles.buttonsContainer}>
      <FeaturedButton
        active={showFeatured}
        onClick={onFeaturedToggle}
      >
        {showFeatured ? 'Mostrar Todos' : 'Destacados'}
      </FeaturedButton>
      {onExportExcel && (
        <button 
          className={styles.exportButton}
          onClick={onExportExcel}
        >
          Exportar Excel
        </button>
      )}
    </div>
  </div>
);

export default SearchBar;
