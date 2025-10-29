import React from 'react';
import TableInput from '../../atoms/TableInput/TableInput.jsx';
import SaveButton from '../../atoms/SaveButton/SaveButton.jsx';
import styles from './ProductTable.module.css';



const ProductTable = ({ products, editedPrices, onPriceChange, onSave, loading }) => {

  console.log('Productos recibidos en tabla:', products);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.headerCell}>Producto</th>
            <th className={styles.headerCell}>Unidad</th>
            <th className={styles.headerCell}>Precio Actual</th>
            <th className={styles.headerCell}>Nuevo Precio</th>
            <th className={styles.headerCell}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {products.map((product) => (
            <tr key={product.id} className={styles.tableRow}>
              <td className={styles.dataCell}>{product.name}</td>
              <td className={styles.dataCell}>{product.unit}</td>
             <td className={styles.priceCell}>
                {typeof product.price === 'number' && !isNaN(product.price)
                  ? `$${product.price.toFixed(2)}`
                  : '—'}
              </td>

              <td className={styles.inputCell}>
                <TableInput
                  type="number"
                  value={editedPrices[product.id] || ''}
                  onChange={(e) => onPriceChange(product.id, e.target.value)}
                  placeholder="Nuevo precio"
                  name={`price-${product.id}`}
                />
              </td>
              <td className={styles.actionCell}>
                <SaveButton
                  onClick={() => onSave(product.id)}
                  disabled={!editedPrices[product.id]}
                  loading={loading}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
