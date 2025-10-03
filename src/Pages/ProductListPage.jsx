import React, { useState } from 'react';
import { Package } from 'lucide-react';
import ProductGrid from '../Components/molecules/ProductGrid/ProductGrid.jsx';
import ProviderList from '../Components/molecules/ProviderList/ProviderList.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import SearchBar from '../Components/molecules/SearchBar/SearchBar.jsx';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Cemento Portland',
      unit: 'Saco 50kg',
      image: null,
      providers: [
        { name: 'Juan Pérez', company: 'Constructora ABC', price: 185.50, status: 'activo' },
        { name: 'María García', company: 'Materiales XYZ', price: 190.00, status: 'activo' },
        { name: 'Carlos López', company: 'Suministros 123', price: 180.00, status: 'pendiente' }
      ]
    },
    {
      id: 2,
      name: 'Varilla 3/8"',
      unit: 'Pieza 6m',
      image: null,
      providers: [
        { name: 'Ana Martínez', company: 'Aceros del Norte', price: 95.00, status: 'activo' },
        { name: 'Roberto Silva', company: 'Hierros Unidos', price: 98.50, status: 'activo' }
      ]
    },
    {
      id: 3,
      name: 'Arena de río',
      unit: 'M³',
      image: null,
      providers: [
        { name: 'Luis Herrera', company: 'Arenas del Sur', price: 350.00, status: 'activo' },
        { name: 'Carmen Ruiz', company: 'Materiales del Valle', price: 345.00, status: 'activo' }
      ]
    },
    {
      id: 4,
      name: 'Grava',
      unit: 'M³',
      image: null,
      providers: [
        { name: 'Pedro Morales', company: 'Graveras Central', price: 380.00, status: 'activo' }
      ]
    },
    {
      id: 5,
      name: 'Ladrillo rojo',
      unit: 'Millar',
      image: null,
      providers: [
        { name: 'Elena Vargas', company: 'Ladrillos del Este', price: 4500.00, status: 'activo' },
        { name: 'Miguel Torres', company: 'Cerámicas del Oeste', price: 4600.00, status: 'activo' }
      ]
    },
    {
      id: 6,
      name: 'Block hueco',
      unit: 'Pieza',
      image: null,
      providers: [
        { name: 'Sofia Jiménez', company: 'Bloques del Norte', price: 12.50, status: 'activo' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Package className={styles.icon} size={32} />
            <h2 className={styles.title}>Lista de Productos</h2>
          </div>
          <p className={styles.subtitle}>
            Visualiza todos los productos disponibles y consulta qué proveedores los ofrecen
          </p>
        </div>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto..."
        />

        <ProductGrid
          products={filteredProducts}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
        />

        {filteredProducts.length === 0 && (
          <div className={styles.emptyState}>
            <Package size={48} className={styles.emptyIcon} />
            <h3>No se encontraron productos</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Proveedores de ${selectedProduct?.name}`}
          size="large"
        >
          {selectedProduct && (
            <ProviderList
              providers={selectedProduct.providers}
              productName={selectedProduct.name}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ProductListPage;
