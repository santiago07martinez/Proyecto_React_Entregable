// src/pages/Login.jsx
import React, { useState } from 'react';
import { Card, Button, Input } from '../components/common';
import './Login.css';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="nexus-login">
      {/* Fondo cósmico (igual que Home) */}
      <div className="cosmic-bg"></div>
      
      <div className="login-container">
        <div className="login-header">
          <h1 className="app-title">Bienvenido a Nexus</h1>
        </div>

        <Card className="login-card">
          {loading ? (
            <div className="login-loading-state">
              <div className="orbit-loader">
                <div className="orbit"></div>
                <div className="core"></div>
              </div>
              <p className="loading-text">Estableciendo conexión...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-header">
                <h2 className="form-title">Iniciar sesión</h2>
              </div>

              <div className="input-group">
                <Input 
                  label="Correo electrónico"
                  type="email"
                  placeholder="ejemplo@nexus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <Input 
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="login-btn">
                Acceder a mi constelación
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Login;