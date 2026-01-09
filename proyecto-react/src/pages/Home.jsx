import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '../components/common';
import { useGetUsersQuery } from '../services/usersApi';
import { selectFavoriteUsers } from '../store/favoritesSlice';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { data: users = [], isLoading } = useGetUsersQuery();
  const favoriteIds = useSelector(selectFavoriteUsers);

  return (
    <div className="nexus-home">
      {/* Fondo estrellado sutil */}
      <div className="starry-bg"></div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="logo-mark">
            <img src="logo.png" 
            width="500"
            style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          {/* Constelación de métricas */}
          <div className="metrics-constellation">
            <MetricCard 
              value={users.length} 
              label="Usuarios Registrados" 
              onClick={() => navigate('/users')} 
            />
            <MetricCard 
              value={favoriteIds.length} 
              label="Favoritos" 
              onClick={() => navigate('/favorites')} 
            />
          </div>

          <div className="cta-buttons">
            <Button 
              variant="primary" 
              size="large"
              onClick={() => navigate('/create-user')}
            >
              Añadir Nueva Persona
            </Button>
            <Button 
              variant="outline" 
              size="medium"
              onClick={() => navigate('/users')}
            >
              Explorar constelación
            </Button>
          </div>
        </div>
      </section>

      {/* Recién llegados */}
      <section className="recent-section">
        <div className="section-header">
          <p>Las últimas estrellas agregadas en tu universo</p>
        </div>

        {isLoading ? (
          <div className="loading-state">Observando el cielo...</div>
        ) : users.length === 0 ? (
          <div className="empty-universe">
            <p>El cielo está despejado.</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/create-user')}
            >
              Ilumina una estrella
            </Button>
          </div>
        ) : (
          <div className="stars-grid">
            {users.slice(0, 6).map((user) => (
              <StarCard 
                key={user.id}
                user={user}
                isFavorite={favoriteIds.includes(user.id)}
                onClick={() => navigate(`/users/${user.id}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Componente reutilizable: Métrica como nodo estelar
const MetricCard = ({ value, label, onClick }) => (
  <div className="metric-node" onClick={onClick} role="button" tabIndex={0}>
    <div className="metric-value">{value}</div>
    <div className="metric-label">{label}</div>
  </div>
);

// Componente: Tarjeta de estrella (usuario)
const StarCard = ({ user, isFavorite, onClick }) => (
  <div className={`star-card ${isFavorite ? 'is-favorite' : ''}`} onClick={onClick} role="button" tabIndex={0}>
    <div className="star-avatar">
      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
    </div>
    <div className="star-info">
      <h3 className="star-name">{user.name}</h3>
      <p className="star-detail">{user.email}</p>
      <p className="star-detail">{user.company?.name || '—'}</p>
    </div>
    {isFavorite && <div className="glow-pulse"></div>}
  </div>
);

export default Home;