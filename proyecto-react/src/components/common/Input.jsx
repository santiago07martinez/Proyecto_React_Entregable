import React from 'react';
import './Input.css';

/**
 * Componente Input reutilizable
 * @param {string} label - Etiqueta del input
 * @param {string} type - Tipo: 'text', 'email', 'password', 'number'
 * @param {string} placeholder - Texto de ejemplo
 * @param {string} value - Valor del input
 * @param {function} onChange - Función cuando cambia el valor
 * @param {string} error - Mensaje de error (opcional)
 * @param {boolean} disabled - Si está deshabilitado
 * @param {boolean} required - Si es obligatorio
 */
const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  disabled = false,
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <input
        type={type}
        className={`input-field ${error ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
      
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;