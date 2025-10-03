import React, { useState } from 'react';
import { Star } from 'lucide-react';
import SearchBar from '../Components/molecules/SearchBar/SearchBar.jsx';
import Pagination from '../Components/molecules/Pagination/Pagination.jsx';
import ProductTable from '../Components/organisms/ProductTable/ProductTable.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import Button from '../Components/atoms/Button/Button.jsx';

const PriceListPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Cemento Portland', unit: 'Saco 50kg', price: 185.50, active: true },
    { id: 2, name: 'Varilla 3/8"', unit: 'Pieza 6m', price: 95.00, active: true },
    { id: 3, name: 'Arena de río', unit: 'M³', price: 350.00, active: true },
    { id: 4, name: 'Grava', unit: 'M³', price: 380.00, active: true },
    { id: 5, name: 'Ladrillo rojo', unit: 'Millar', price: 4500.00, active: true },
    { id: 6, name: 'Block hueco', unit: 'Pieza', price: 12.50, active: true },
    { id: 7, name: 'Cal hidratada', unit: 'Saco 20kg', price: 85.00, active: true },
    { id: 8, name: 'Alambrón', unit: 'Kg', price: 22.00, active: true },
  ]);

  const [editedPrices, setEditedPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeatured, setShowFeatured] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    setEditedPrices(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = (id) => {
    const newPrice = parseFloat(editedPrices[id]);
    if (!newPrice || newPrice <= 0) {
      setToast({ message: 'El precio debe ser mayor a cero', type: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, price: newPrice } : p
      ));
      setToast({ message: 'Precio actualizado correctamente', type: 'success' });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Lista de Precios</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto..."
        />
        <Button
          onClick={() => setShowFeatured(!showFeatured)}
          variant={showFeatured ? 'primary' : 'secondary'}
        >
          <div className="flex items-center gap-2">
            <Star size={18} fill={showFeatured ? 'white' : 'none'} />
            {showFeatured ? 'Mostrar Todos' : 'Destacados'}
          </div>
        </Button>
      </div>

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

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default PriceListPage;
