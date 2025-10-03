import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white'
  };

  return (
    <div className={`fixed top-6 right-6 ${styles[type]} px-6 py-4 rounded-lg shadow-2xl z-50 min-w-[300px] animate-slide-in`}>
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default Toast;
