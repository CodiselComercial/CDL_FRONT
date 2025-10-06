import React, { useState } from 'react';
import { FileText, Calendar } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import styles from './PurchaseOrdersPage.module.css';

const PurchaseOrdersPage = () => {
  const [viewMode, setViewMode] = useState('orders'); // 'orders' | 'invoiceSummary'
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

  // Datos simulados para resumen de facturas
  const [invoices] = useState([
    {
      id: 'FAC-001', folio: 'A-001', date: '2024-01-16', series: 'A', provider: 'Constructora ABC',
      subtotal: 14500.0, iva: 2320.0, total: 16820.0,
      items: [
        { code: 'CEM-50', name: 'Cemento Portland', unitPrice: 185.5, quantity: 50, amount: 9275.0 },
        { code: 'VAR-38', name: 'Varilla 3/8"', unitPrice: 95.0, quantity: 50, amount: 4750.0 },
      ],
    },
    {
      id: 'FAC-002', folio: 'B-014', date: '2024-01-14', series: 'B', provider: 'Materiales XYZ',
      subtotal: 8000.0, iva: 1280.0, total: 9280.0,
      items: [
        { code: 'LAD-ROJ', name: 'Ladrillo rojo', unitPrice: 4500.0, quantity: 1, amount: 4500.0 },
        { code: 'BLO-HUE', name: 'Block hueco', unitPrice: 12.5, quantity: 280, amount: 3500.0 },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = orders; // sin filtro de estado
  const [providerFilter, setProviderFilter] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setSelectedInvoice(null);
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
        {viewMode === 'orders' && (
          <>
            <div className={styles.header}>
              <div className={styles.titleSection}>
                <FileText className={styles.icon} size={32} />
                <h2 className={styles.title}>Órdenes de Compra</h2>
              </div>
              <p className={styles.subtitle}>
                Visualiza y gestiona las cotizaciones generadas por el sistema
              </p>
            </div>

            <div className={styles.actionsBar}>
              <button className={styles.calculateButton} onClick={() => setViewMode('invoiceSummary')}>
                Calcular órdenes de compra
              </button>
            </div>
          </>
        )}

        {viewMode === 'orders' && (
          <div className={styles.ordersTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Número</div>
              <div className={styles.headerCell}>Fecha</div>
              <div className={styles.headerCell}>Proveedor</div>
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
                  <div className={styles.total}>${order.total.toFixed(2)}</div>
                  <div className={styles.actions}>
                    <ActionButton
                      type="view"
                      onClick={() => handleViewOrder(order)}
                      size="small"
                    />
                    <ActionButton
                      type="calc"
                      onClick={() => {
                        setProviderFilter(order.provider);
                        setViewMode('invoiceSummary');
                      }}
                      size="small"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'invoiceSummary' && (
          <div className={styles.invoicesTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>Folio</div>
              <div className={styles.headerCell}>Fecha</div>
              <div className={styles.headerCell}>Serie</div>
              <div className={styles.headerCell}>Proveedor</div>
              <div className={styles.headerCell}>Subtotal</div>
              <div className={styles.headerCell}>IVA</div>
              <div className={styles.headerCell}>Total</div>
              <div className={styles.headerCell}>Acciones</div>
            </div>
            <div className={styles.tableBody}>
              {invoices
                .filter(inv => !providerFilter || inv.provider === providerFilter)
                .map((invoice) => (
                  <div key={invoice.id} className={styles.invoiceRow}>
                    <div className={styles.cell}>{invoice.folio}</div>
                    <div className={styles.cell}>{new Date(invoice.date).toLocaleDateString()}</div>
                    <div className={styles.cell}>{invoice.series}</div>
                    <div className={styles.cell}>{invoice.provider}</div>
                    <div className={styles.cell}>${invoice.subtotal.toFixed(2)}</div>
                    <div className={styles.cell}>${invoice.iva.toFixed(2)}</div>
                    <div className={styles.cell}>${invoice.total.toFixed(2)}</div>
                    <div className={styles.actions}>
                      <ActionButton
                        type="view"
                        onClick={() => handleViewInvoice(invoice)}
                        size="small"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {viewMode === 'orders' && filteredOrders.length === 0 && (
          <div className={styles.emptyState}>
            <FileText size={48} className={styles.emptyIcon} />
            <h3>No se encontraron órdenes</h3>
            <p>No hay órdenes de compra registradas</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={
            viewMode === 'orders'
              ? 'Historial de precios unitarios por producto'
              : 'Detalle de productos en factura'
          }
          size="large"
        >
          {viewMode === 'orders' && selectedOrder && (
            <div className={styles.itemsTable}>
              <div className={styles.itemsHeader}>
                <div>Código producto</div>
                <div>Nombre producto</div>
                <div>Último precio unitario</div>
                <div>Cantidad</div>
                <div>Último importe</div>
              </div>
              {selectedOrder.items.map((item, index) => (
                <div key={index} className={styles.itemRow}>
                  <div className={styles.cell}>COD-{index + 1}</div>
                  <div className={styles.cell}>{item.product}</div>
                  <div className={styles.cell}>${item.price.toFixed(2)}</div>
                  <div className={styles.cell}>{item.quantity}</div>
                  <div className={styles.itemTotal}>${item.total.toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'invoiceSummary' && selectedInvoice && (
            <div className={styles.itemsTable}>
              <div className={styles.itemsHeader}>
                <div>Código producto</div>
                <div>Nombre producto</div>
                <div>Precio unitario</div>
                <div>Cantidad</div>
                <div>Importe</div>
              </div>
              {selectedInvoice.items.map((item, index) => (
                <div key={index} className={styles.itemRow}>
                  <div className={styles.cell}>{item.code}</div>
                  <div className={styles.cell}>{item.name}</div>
                  <div className={styles.cell}>${item.unitPrice.toFixed(2)}</div>
                  <div className={styles.cell}>{item.quantity}</div>
                  <div className={styles.itemTotal}>${item.amount.toFixed(2)}</div>
                </div>
              ))}
              <div className={styles.totalRow}>
                <div></div>
                <div></div>
                <div className={styles.totalLabel}>Total:</div>
                <div className={styles.totalAmount}>${selectedInvoice.total.toFixed(2)}</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PurchaseOrdersPage;
