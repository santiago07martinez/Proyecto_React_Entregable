import React from 'react';
import './Loader.css';

/**
 * Componente Loader para mostrar estado de carga
 * @param {string} size - Tamaño: 'small', 'medium', 'large'
 * @param {string} text - Texto opcional debajo del loader
 */
const Loader = ({ size = 'medium', text = '' }) => {
  return (
    <div className="loader-container">
      <div className={`loader loader-${size}`}></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;