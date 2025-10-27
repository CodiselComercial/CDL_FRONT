import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onSelect, selected = false }) => {
  return (
    <div 
      className={`${styles.productCard} ${selected ? styles.selected : ''}`}
      onClick={() => onSelect(product)}
    >
      <div className={styles.imageContainer}>
        {product.image ? (
         <img
            src={`https://arxsoftware.cloud/pedidoscodisel/files/${product.image}`}
            alt={product.name}
            className={styles.productImage}
          />

        ) : (
          <div className={styles.placeholderImage}>
            <span className={styles.placeholderText}>Sin imagen</span>
          </div>
        )}
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productUnit}>{product.unit}</p>
        <div className={styles.providerCount}>
          {product.providers?.length || 0} proveedor{product.providers?.length !== 1 ? 'es' : ''}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
