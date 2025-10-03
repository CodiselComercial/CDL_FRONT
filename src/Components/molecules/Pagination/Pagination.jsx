import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../atoms/PaginationButton/PaginationButton.jsx';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Si no hay páginas o solo hay una página, no mostrar la paginación
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    // Prevenir cambio si ya está en la primera página
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    // Prevenir cambio si ya está en la última página
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <Button
        variant="secondary"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="p-1 min-w-[28px] h-[28px] flex items-center justify-center"
      >
        <ChevronLeft size={12} />
      </Button>
      
      <span className="text-gray-600 text-xs px-2">
        {currentPage}/{totalPages}
      </span>
      
      <Button
        variant="secondary"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-1 min-w-[28px] h-[28px] flex items-center justify-center"
      >
        <ChevronRight size={12} />
      </Button>
    </div>
  );
};

export default Pagination;