import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUsersQuery } from '../services/usersApi';
import { selectFavoriteUsers } from '../store/favoritesSlice';
import { UserCard } from './UsersList'; // Importamos la tarjeta que acabamos de exportar
import { Button, Loader, ErrorMessage } from '../components/common';

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // 1. Obtener IDs de favoritos del store
  const favoriteIds = useSelector(selectFavoriteUsers);
  
  // 2. Obtener TODOS los usuarios de la API
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  if (isLoading) return <Loader text="Cargando favoritos..." />;
  
  if (error) return <ErrorMessage message="Error al cargar usuarios" onRetry={refetch} />;

  // 3. Filtrar: Cruzar los usuarios de la API con los IDs guardados
  // Usamos String() para asegurar que comparamos texto con texto
  const favoriteUsersList = users?.filter(user => 
    favoriteIds.some(favId => String(favId) === String(user.id))
  ) || [];

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mis Favoritos ⭐</h1>
        <Button onClick={() => navigate('/users')}>← Volver a la lista</Button>
      </div>

      {favoriteUsersList.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {favoriteUsersList.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              dispatch={dispatch} 
              navigate={navigate} 
            />
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px', 
          background: '#f8f9fa', 
          borderRadius: '12px',
          color: '#6c757d' 
        }}>
          <h3>Aún no tienes favoritos</h3>
          <p>Ve a la lista de usuarios y marca algunos con la estrella ⭐</p>
          <Button variant="primary" onClick={() => navigate('/users')} style={{ marginTop: '10px' }}>Ir a Usuarios</Button>
        </div>
      )}
    </div>
  );
};

export default Favorites;