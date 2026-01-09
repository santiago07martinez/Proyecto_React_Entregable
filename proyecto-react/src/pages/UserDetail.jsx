import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserByIdQuery, useDeleteUserMutation } from '../services/usersApi';
import { toggleFavorite, selectIsFavorite, removeFavorite } from '../store/favoritesSlice';
import { Card, Button, Loader, ErrorMessage } from '../components/common';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(id);
  const [deleteUser] = useDeleteUserMutation();
  const isFavorite = useSelector(selectIsFavorite(id));

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(id));
  };

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${user.name}? Esta acción no se puede deshacer.`)) {
      try {
        await deleteUser(id).unwrap();
        dispatch(removeFavorite(id));
        navigate('/users'); // Redirigir a la lista después de eliminar
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('No se pudo eliminar el usuario');
      }
    }
  };

  if (isLoading) {
    return <Loader size="large" text="Cargando usuario..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="No se pudo cargar el usuario"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="user-detail-page">
      <div className="detail-header">
        <Button onClick={() => navigate('/users')}>← Volver a la lista</Button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="danger" onClick={handleDelete}>Eliminar Usuario</Button>
          <Button variant={isFavorite ? 'danger' : 'secondary'} onClick={handleFavoriteClick}>
            {isFavorite ? '⭐ Quitar de favoritos' : '☆ Agregar a favoritos'}
          </Button>
        </div>
      </div>

      <Card className="detail-card">
        <div className="detail-card-header">
          <h1 className="detail-title">
            {user.name}
            {isFavorite && <span>⭐</span>}
          </h1>
        </div>

        <div className="detail-body">
          <div className="info-section">
            <h3 className="section-title">Información del Usuario</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Teléfono</div>
                <div className="info-value">{user.phone}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Empresa</div>
                <div className="info-value">{user.company.name}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Rol en la empresa</div>
                <div className="info-value">{user.company.role || 'No especificado'}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserDetail;