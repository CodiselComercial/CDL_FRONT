import React from 'react';
import ProductCard from '../../atoms/ProductCard/ProductCard.jsx';
import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, selectedProduct, onProductSelect }) => {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          selected={selectedProduct?.id === product.id}
          onSelect={onProductSelect}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
