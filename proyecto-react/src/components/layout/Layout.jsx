// src/components/layout/Layout.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="nexus-app">
      <nav className="nexus-navbar">
        <div 
          className="navbar-brand" 
          onClick={() => navigate('/')}
          role="button"
          tabIndex={0}
        >
          <img src="/logoLateral.png" alt="Nexus" className="navbar-logo" />
        </div>

        {/* Enlaces de navegación */}
        <div className="navbar-links">
          <button
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            Inicio
          </button>

          <button
            className={`nav-link ${isActive('/users') ? 'active' : ''}`}
            onClick={() => navigate('/users')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-5-5.7V4a1 1 0 001-1h2a1 1 0 001 1v17m-3 0a4 4 0 00-5-5.7V4a1 1 0 001-1h2a1 1 0 001 1v17" />
            </svg>
            Usuarios
          </button>

          <button
            className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
            onClick={() => navigate('/favorites')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87.69 6.88L12 21l-5.69-4.87.69-6.88L22 9.27l-6.91-1.01L12 2z" />
            </svg>
            Favoritos
          </button>

          <button
            className={`nav-link ${isActive('/create-user') ? 'active' : ''}`}
            onClick={() => navigate('/create-user')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nuevo
          </button>

          {/* Botón de Cerrar Sesión */}
          <button
            className="nav-link"
            onClick={onLogout}
            style={{ color: '#ef5350', marginLeft: '12px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Salir
          </button>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;