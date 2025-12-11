import React from 'react';
import './Card.css';

/**
 * Componente Card reutilizable para mostrar contenido
 * @param {ReactNode} children - Contenido de la tarjeta
 * @param {string} className - Clases CSS adicionales
 * @param {function} onClick - Función al hacer click (opcional)
 */
const Card = ({ children, className = '', onClick, ...props }) => {
  const cardClass = `card ${onClick ? 'card-clickable' : ''} ${className}`;
  
  return (
    <div className={cardClass} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

/**
 * Componente para el encabezado de la tarjeta
 */
export const CardHeader = ({ children, className = '' }) => {
  return <div className={`card-header ${className}`}>{children}</div>;
};

/**
 * Componente para el cuerpo de la tarjeta
 */
export const CardBody = ({ children, className = '' }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

/**
 * Componente para el pie de la tarjeta
 */
export const CardFooter = ({ children, className = '' }) => {
  return <div className={`card-footer ${className}`}>{children}</div>;
};

export default Card;