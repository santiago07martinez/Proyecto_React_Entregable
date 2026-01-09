import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUsersQuery, useDeleteUserMutation } from '../services/usersApi';
import { toggleFavorite, selectIsFavorite } from '../store/favoritesSlice';
import { Card, CardHeader, CardBody, CardFooter, Button, Loader, ErrorMessage, Input } from '../components/common';

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  
  // RTK Query - Obtener usuarios
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  // Filtrar usuarios por búsqueda
  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mostrar loader mientras carga
  if (isLoading) {
    return <Loader size="large" text="Cargando usuarios..." />;
  }

  // Mostrar error si falla
  if (error) {
    return (
      <ErrorMessage
        message="No se pudieron cargar los usuarios"
        onRetry={refetch}
      />
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Lista de Usuarios</h1>
        <Button onClick={() => navigate('/')}>← Volver al inicio</Button>
      </div>

      <Input
        placeholder="Buscar por nombre o email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '30px' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {filteredUsers?.map((user) => (
          <UserCard key={user.id} user={user} dispatch={dispatch} navigate={navigate} />
        ))}
      </div>

      {filteredUsers?.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          No se encontraron usuarios
        </p>
      )}
    </div>
  );
};

// Componente de tarjeta de usuario
export const UserCard = ({ user, dispatch, navigate }) => {
  const isFavorite = useSelector(selectIsFavorite(user.id));
  const [deleteUser] = useDeleteUserMutation();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(user.id));
  };

  const handleDelete = async (e) => {
    e.stopPropagation(); // Evita que se abra el detalle al hacer click en eliminar
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${user.name}?`)) {
      try {
        await deleteUser(user.id).unwrap();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('No se pudo eliminar el usuario');
      }
    }
  };

  return (
    <Card onClick={() => navigate(`/users/${user.id}`)}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>{user.name}</h3>
          <span
            onClick={handleFavoriteClick}
            style={{ fontSize: '24px', cursor: 'pointer' }}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {isFavorite ? '⭐' : '☆'}
          </span>
        </div>
      </CardHeader>
      <CardBody>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Empresa:</strong> {user.company.name}</p>
      </CardBody>
      <CardFooter>
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <Button variant="primary" size="small" onClick={() => navigate(`/users/${user.id}`)} style={{ flex: 1 }}>
            Ver detalle
          </Button>
          <Button variant="danger" size="small" onClick={handleDelete} style={{ flex: 1 }}>
            Eliminar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UsersList;