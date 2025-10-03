import React, { useState } from 'react';
import { FileText, Filter, Calendar } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import styles from './PurchaseOrdersPage.module.css';

const PurchaseOrdersPage = () => {
  const [orders] = useState([
    {
      id: 1,
      orderNumber: 'OC-2024-001',
      date: '2024-01-15',
      provider: 'Constructora ABC',
      status: 'pendiente',
      total: 15750.00,
      items: [
        { product: 'Cemento Portland', quantity: 50, unit: 'Saco 50kg', price: 185.50, total: 9275.00 },
        { product: 'Varilla 3/8"', quantity: 100, unit: 'Pieza 6m', price: 95.00, total: 9500.00 },
        { product: 'Arena de río', quantity: 5, unit: 'M³', price: 350.00, total: 1750.00 }
      ]
    },
    {
      id: 2,
      orderNumber: 'OC-2024-002',
      date: '2024-01-14',
      provider: 'Materiales XYZ',
      status: 'aceptada',
      total: 8900.00,
      items: [
        { product: 'Ladrillo rojo', quantity: 2, unit: 'Millar', price: 4500.00, total: 9000.00 },
        { product: 'Block hueco', quantity: 200, unit: 'Pieza', price: 12.50, total: 2500.00 }
      ]
    },
    {
      id: 3,
      orderNumber: 'OC-2024-003',
      date: '2024-01-13',
      provider: 'Aceros del Norte',
      status: 'rechazada',
      total: 4750.00,
      items: [
        { product: 'Varilla 3/8"', quantity: 50, unit: 'Pieza 6m', price: 95.00, total: 4750.00 }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('todos');

  const filteredOrders = orders.filter(order => 
    statusFilter === 'todos' || order.status === statusFilter
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pendiente: styles.pending,
      aceptada: styles.accepted,
      rechazada: styles.rejected
    };
    return `${styles.statusBadge} ${statusClasses[status] || ''}`;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <FileText className={styles.icon} size={32} />
            <h2 className={styles.title}>Órdenes de Compra</h2>
          </div>
          <p className={styles.subtitle}>
            Visualiza y gestiona las cotizaciones generadas por el sistema
          </p>
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={18} className={styles.filterIcon} />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="todos">Todos los estados</option>
              <option value="pendiente">Pendiente</option>
              <option value="aceptada">Aceptada</option>
              <option value="rechazada">Rechazada</option>
            </select>
          </div>
        </div>

        <div className={styles.ordersTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Número</div>
            <div className={styles.headerCell}>Fecha</div>
            <div className={styles.headerCell}>Proveedor</div>
            <div className={styles.headerCell}>Estado</div>
            <div className={styles.headerCell}>Total</div>
            <div className={styles.headerCell}>Acciones</div>
          </div>
          <div className={styles.tableBody}>
            {filteredOrders.map((order) => (
              <div key={order.id} className={styles.orderRow}>
                <div className={styles.orderNumber}>{order.orderNumber}</div>
                <div className={styles.orderDate}>
                  <Calendar size={14} />
                  {new Date(order.date).toLocaleDateString()}
                </div>
                <div className={styles.providerName}>{order.provider}</div>
                <div className={styles.status}>
                  <span className={getStatusBadge(order.status)}>
                    {order.status}
                  </span>
                </div>
                <div className={styles.total}>${order.total.toFixed(2)}</div>
                <div className={styles.actions}>
                  <ActionButton
                    type="view"
                    onClick={() => handleViewOrder(order)}
                    size="small"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className={styles.emptyState}>
            <FileText size={48} className={styles.emptyIcon} />
            <h3>No se encontraron órdenes</h3>
            <p>No hay órdenes de compra con el filtro seleccionado</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={`Detalle de ${selectedOrder?.orderNumber}`}
          size="large"
        >
          {selectedOrder && (
            <div className={styles.orderDetail}>
              <div className={styles.orderInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Número:</span>
                  <span className={styles.infoValue}>{selectedOrder.orderNumber}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Fecha:</span>
                  <span className={styles.infoValue}>
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Proveedor:</span>
                  <span className={styles.infoValue}>{selectedOrder.provider}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Estado:</span>
                  <span className={getStatusBadge(selectedOrder.status)}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div className={styles.itemsTable}>
                <h4>Productos</h4>
                <div className={styles.itemsHeader}>
                  <div>Producto</div>
                  <div>Cantidad</div>
                  <div>Precio Unit.</div>
                  <div>Total</div>
                </div>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className={styles.itemRow}>
                    <div className={styles.itemName}>
                      <div>{item.product}</div>
                      <div className={styles.itemUnit}>{item.unit}</div>
                    </div>
                    <div>{item.quantity}</div>
                    <div>${item.price.toFixed(2)}</div>
                    <div className={styles.itemTotal}>${item.total.toFixed(2)}</div>
                  </div>
                ))}
                <div className={styles.totalRow}>
                  <div></div>
                  <div></div>
                  <div className={styles.totalLabel}>Total:</div>
                  <div className={styles.totalAmount}>${selectedOrder.total.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PurchaseOrdersPage;
