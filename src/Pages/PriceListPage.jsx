import React, { useState, useEffect } from 'react';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchBar from '../Components/molecules/SearchBar/SearchBar.jsx';
import Pagination from '../Components/molecules/Pagination/Pagination.jsx';
import ProductTable from '../Components/organisms/ProductTable/ProductTable.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import styles from './PriceListPage.module.css';
import { getProductList, saveProductPrice } from '../services/api.js';

const PriceListPage = () => {
  const [products, setProducts] = useState([]);
  const [editedPrices, setEditedPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const itemsPerPage = 5;

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const data = await getProductList(token, currentPage);

      console.log('Respuesta del backend:', data); // 👀

      const mapped = data.map(p => ({
        id: p.id,
        name: p.nombre,
        unit: p.unidad,
        price: typeof p.precio === 'number' && !isNaN(p.precio) ? p.precio : 0,
        active: true,
      }));

      setProducts(mapped);
    } catch (err) {
      setToast({ message: 'Error al cargar productos', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [currentPage]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFeatured = !showFeatured || editedPrices[p.id];
    return matchesSearch && matchesFeatured && p.active;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePriceChange = (id, value) => {
    const parsed = parseFloat(value);
    setEditedPrices(prev => ({
      ...prev,
      [id]: !isNaN(parsed) ? parsed : ''
    }));
  };

  const handleSave = (id) => {
    const newPrice = parseFloat(editedPrices[id]);
    if (!newPrice || newPrice <= 0) {
      setToast({ message: 'El precio debe ser mayor a cero', type: 'error' });
      return;
    }

    setSelectedProductId(id);
    setSelectedDate(new Date());
    setIsDateModalOpen(true);
  };

  const handleConfirmDate = async () => {
    const id = selectedProductId;
    const newPrice = parseFloat(editedPrices[id]);
    const fecha = selectedDate.toISOString().split('T')[0];

    setLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      await saveProductPrice(token, id, newPrice, fecha);

      setProducts(prev => prev.map(p =>
        p.id === id ? { ...p, price: newPrice } : p
      ));
      setToast({ message: 'Precio guardado correctamente', type: 'success' });
    } catch (err) {
      setToast({ message: 'Error al guardar el precio', type: 'error' });
    } finally {
      setLoading(false);
      setIsDateModalOpen(false);
      setSelectedProductId(null);
    }
  };
  
  return (
  <div className={styles.pageContainer}>
  <div className={styles.contentContainer}>
    <h2 className={styles.title}>Lista de Precios</h2>

    <SearchBar
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar producto..."
      showFeatured={showFeatured}
      onFeaturedToggle={() => setShowFeatured(!showFeatured)}
    />

    <ProductTable
      products={paginatedProducts}
      editedPrices={editedPrices}
      onPriceChange={handlePriceChange}
      onSave={handleSave}
      loading={loading}
    />

    {totalPages > 1 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    )}

    <Modal
      isOpen={isDateModalOpen}
      onClose={() => setIsDateModalOpen(false)}
      title="Selecciona la fecha de vigencia"
      size="small"
    >
      <div style={{ padding: '1rem' }}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
        />
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={() => setIsDateModalOpen(false)}>Cancelar</button>
          <button onClick={handleConfirmDate}>Confirmar</button>
        </div>
      </div>
    </Modal>

    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}
  </div>
</div>

  );
};

export default PriceListPage;
