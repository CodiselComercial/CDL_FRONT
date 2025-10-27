import React, { useState, useEffect  } from 'react';
import { FileText, Calendar } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import styles from './PurchaseOrdersPage.module.css';
import { getCotizaciones } from '../services/api.js';


const PurchaseOrdersPage = () => {
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(false);
const [viewMode, setViewMode] = useState('orders');

    
useEffect(() => {
  const fetchCotizaciones = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwtToken');
      const data = await getCotizaciones(token, '2020-01-01', '2025-12-31', 1);

      const mapped = data.map(cot => ({
        id: cot.CIDDOCUMENTO,
        orderNumber: `COT-${cot.CFOLIO}`,
        date: cot.CFECHA.split('T')[0],
        provider: cot.CRAZONSOCIAL,
        status: cot.CCANCELADO ? 'cancelada' : 'pendiente',
        total: cot.CTOTAL,
        items: cot.Movimientos.map(mov => ({
          product: `Producto ${mov.CIDPRODUCTO}`,
          quantity: mov.CUNIDADES,
          unit: `Unidad ${mov.CIDUNIDAD}`,
          price: mov.CPRECIO,
          total: mov.CTOTAL
        }))
      }));

      setOrders(mapped);
    } catch (err) {
      console.error('Error al cargar cotizaciones:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchCotizaciones();
}, []);

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
