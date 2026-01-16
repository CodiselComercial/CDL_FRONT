import React, { useState, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import Button from '../../atoms/Button/Button.jsx';
import styles from './ProviderPriorityModal.module.css';

const ProviderPriorityModal = ({ providers, onSave, onClose }) => {
  const [orderedProviders, setOrderedProviders] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    // Ordenar proveedores por prioridad (si existe) o mantener orden original
    const sorted = [...providers].sort((a, b) => {
      const priorityA = a.prioridad !== undefined && a.prioridad !== null ? a.prioridad : 999;
      const priorityB = b.prioridad !== undefined && b.prioridad !== null ? b.prioridad : 999;
      return priorityA - priorityB;
    });
    setOrderedProviders(sorted);
  }, [providers]);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndex === null || draggedIndex === index) return;
    
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newOrderedProviders = [...orderedProviders];
    const draggedItem = newOrderedProviders[draggedIndex];
    
    // Remover el elemento arrastrado
    newOrderedProviders.splice(draggedIndex, 1);
    
    // Insertar en la nueva posición
    newOrderedProviders.splice(dropIndex, 0, draggedItem);
    
    setOrderedProviders(newOrderedProviders);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleSave = () => {
    // Asignar prioridades consecutivas del 1 al N según el orden
    const providersWithPriority = orderedProviders.map((provider, index) => ({
      ...provider,
      prioridad: index + 1,
    }));

    onSave(providersWithPriority);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Priorizar Proveedores</h3>
        <p className={styles.subtitle}>
          Arrastra los proveedores para cambiar su orden de prioridad
        </p>
      </div>

      <div className={styles.providersList}>
        {orderedProviders.map((provider, index) => (
          <div
            key={provider.id}
            className={`${styles.providerItem} ${
              draggedIndex === index ? styles.dragging : ''
            } ${
              dragOverIndex === index && draggedIndex !== index ? styles.dragOver : ''
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className={styles.dragHandle}>
              <GripVertical size={20} />
            </div>
            <div className={styles.priorityNumber}>{index + 1}</div>
            <div className={styles.providerInfo}>
              <div className={styles.providerName}>{provider.company || provider.nombre}</div>
              {provider.representative && (
                <div className={styles.providerDetail}>{provider.representative}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button onClick={onClose} type="button">
          Cerrar
        </Button>
        <Button onClick={handleSave} type="button">
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default ProviderPriorityModal;

