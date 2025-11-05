import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Zap, DollarSign } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import styles from './PurchaseOrdersPage.module.css';
import { getCotizaciones, analizarCotizacion } from '../services/api.js';

const PurchaseOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('orders');
  const [toast, setToast] = useState(null);

  const [invoices, setInvoices] = useState([]);
  const [analisisData, setAnalisisData] = useState(null); 

  useEffect(() => {
    const fetchCotizaciones = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('No se encontró token de autenticación');
        }
        const data = await getCotizaciones(token, '2020-01-01', '2025-12-31', 1);

        console.log(data);

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
        setToast({ message: err.message || 'Error al cargar cotizaciones', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCotizaciones();
  }, []);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrders = orders; 
  const [providerFilter, setProviderFilter] = useState(null);

  const handleViewOrder = (order) => {
    setAnalisisData(null);
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
    setAnalisisData(null);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pendiente: styles.pending,
      aceptada: styles.accepted,
      rechazada: styles.rejected
    };
    return `${styles.statusBadge} ${statusClasses[status] || ''}`;
  };

const handleCalcularCotizacion = async (cotizacionId) => {
  if (!Number.isInteger(cotizacionId)) {
    console.warn('ID inválido para cotización:', cotizacionId);
    console.trace();
    return;
  }

  const token = localStorage.getItem('jwtToken');
  if (!token) {
    setToast({ message: 'No se encontró token de autenticación', type: 'error' });
    return;
  }

  setLoading(true);
  try {
    const result = await analizarCotizacion(cotizacionId, token);

    if (!result || typeof result !== 'object') {
      setToast({ message: 'No se pudo analizar la cotización. Verifica tu sesión o el backend.', type: 'error' });
      return;
    }

    const productos = Object.values(result)
      .flatMap(prov => prov.productos.map(p => ({
        proveedorNombre: prov.nombre,
        codigo: p.codigo,
        nombre: p.nombre,
        precioMinimo: parseFloat(p.precio_minimo),
        fechaVigencia: p.fecha_vigencia || null,
      })));

    setAnalisisData(productos);
    const orderToView = orders.find(o => o.id === cotizacionId);
    setSelectedOrder(orderToView);
    setIsModalOpen(true);
    setToast({ message: 'Cotización analizada correctamente', type: 'success' });

  } catch (err) {
    console.error(`Error al analizar cotización ${cotizacionId}:`, err);
    setToast({ message: 'Error al analizar cotización', type: 'error' });
  } finally {
    setLoading(false);
  }
};



  const AnalisisModalContent = ({ productos }) => (
    <div className={styles.itemsTable}>
      <div className={styles.itemsHeader}>
        <div><Zap size={16}/> Proveedor</div>
        <div><FileText size={16}/> Código</div>
        <div>Producto</div>
        <div><DollarSign size={16}/> Precio Mínimo</div>
        <div>Vigencia</div>
      </div>
      {productos.map((item, index) => (
        <div key={index} className={styles.itemRow}>
          <div className={styles.cell} style={{fontWeight: 'bold'}}>{item.proveedorNombre}</div>
          <div className={styles.cell}>{item.codigo}</div>
          <div className={styles.cell}>{item.nombre}</div>
          <div className={styles.cell} style={{fontWeight: 'bold'}}>
            ${item.precioMinimo.toFixed(2)}
          </div>
          <div className={styles.cell}>
             {new Date(item.fechaVigencia.split(' ')[0]).toLocaleDateString()}
          </div>
        </div>
      ))}
      {productos.length === 0 && (
          <div className={styles.emptyState}>
             No se encontraron productos con precios.
          </div>
      )}
    </div>
  );


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
                        console.log('Cotización seleccionada desde botón:', order.id);
                        handleCalcularCotizacion(order.id);
                      }}
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
            analisisData
              ? `Análisis de precios para COT-${selectedOrder?.orderNumber.split('-')[1]}`
              : 'Detalle de Cotización'
          }
          size="large"
        >
          {selectedOrder && analisisData && (
             <AnalisisModalContent productos={analisisData} />
          )}

          {viewMode === 'orders' && selectedOrder && !analisisData && (
            <div className={styles.itemsTable}>
              <div className={styles.itemsHeader}>
                <div>Código producto</div>
                <div>Nombre producto</div>
                <div>Precio Unitario</div>
                <div>Cantidad</div>
                <div>Importe</div>
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
        </Modal>
      </div>
    </div>
  );
};

export default PurchaseOrdersPage;