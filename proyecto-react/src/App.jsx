import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import UsersList from './pages/UsersList';
import UserDetail from './pages/UserDetail';
import Favorites from './pages/Favorites';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';

function App() {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('nexus_auth') === 'true';
  });

  // Función para iniciar sesión
  const handleLogin = () => {
    localStorage.setItem('nexus_auth', 'true');
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('nexus_auth');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />

        {/* Rutas privadas: Protegidas por Layout */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <Layout onLogout={handleLogout}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:id" element={<UserDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/create-user" element={<CreateUser />} />
                  {/* Cualquier otra ruta redirige al home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;