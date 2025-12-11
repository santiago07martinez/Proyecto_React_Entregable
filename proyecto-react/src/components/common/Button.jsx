import React from 'react';
import './Button.css';

/**
 * Componente Button reutilizable
 * @param {string} variant - Tipo: 'primary', 'secondary', 'danger'
 * @param {string} size - Tamaño: 'small', 'medium', 'large'
 * @param {boolean} disabled - Si está deshabilitado
 * @param {function} onClick - Función al hacer click
 * @param {ReactNode} children - Contenido del botón
 * @param {string} type - Tipo HTML: 'button', 'submit', 'reset'
 */
const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick,
  children,
  type = 'button',
  className = '',
  ...props 
}) => {
  // Construir clases CSS dinámicamente
  const buttonClass = `btn btn-${variant} btn-${size} ${className}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;