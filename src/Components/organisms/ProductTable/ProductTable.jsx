import React from 'react';
import { Save } from 'lucide-react';
import Input from '../../atoms/Input/Input.jsx';
import Button from '../../atoms/Button/Button.jsx';

const ProductTable = ({ products, editedPrices, onPriceChange, onSave, loading }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unidad</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Precio Actual</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nuevo Precio</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{product.unit}</td>
              <td className="px-6 py-4 text-sm text-gray-900">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4">
                <Input
                  type="number"
                  value={editedPrices[product.id] || ''}
                  onChange={(e) => onPriceChange(product.id, e.target.value)}
                  placeholder="Nuevo precio"
                  name={`price-${product.id}`}
                />
              </td>
              <td className="px-6 py-4 text-center">
                <Button
                  onClick={() => onSave(product.id)}
                  type="button"
                  disabled={!editedPrices[product.id] || loading}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <Save size={16} />
                    Guardar
                  </div>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
