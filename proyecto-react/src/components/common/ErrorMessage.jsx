import React from 'react';
import './ErrorMessage.css';
import Button from './Button';

/**
 * Componente para mostrar errores
 * @param {string} message - Mensaje de error
 * @param {function} onRetry - Función para reintentar (opcional)
 */
const ErrorMessage = ({ message = 'Ocurrió un error', onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">¡Oops! Algo salió mal</h3>
      <p className="error-message">{message}</p>
      
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;