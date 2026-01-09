import { createSlice } from '@reduxjs/toolkit';

// Función auxiliar para cargar desde localStorage
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('favoriteUsers');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error al cargar favoritos del almacenamiento local:", error);
    return []; // Si falla, iniciamos con un array vacío para no romper la app
  }
};

const initialState = {
  favoriteUsers: loadFromStorage(), // Cargar favoritos guardados al iniciar
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  
  reducers: {
    
    // Agregar un usuario a favoritos
    addFavorite: (state, action) => {
      const userId = action.payload; // El ID del usuario
      // Solo agregar si NO está ya en favoritos
      if (!state.favoriteUsers.some(id => String(id) === String(userId))) {
        state.favoriteUsers.push(userId);
        localStorage.setItem('favoriteUsers', JSON.stringify(state.favoriteUsers));
      }
    },
    
    // Quitar un usuario de favoritos
    removeFavorite: (state, action) => {
      const userId = action.payload;
      // Filtrar = quedarnos con todos MENOS el que queremos quitar
      state.favoriteUsers = state.favoriteUsers.filter(id => String(id) !== String(userId));
      localStorage.setItem('favoriteUsers', JSON.stringify(state.favoriteUsers));
    },
    
    // Alternar favorito (si está lo quita, si no está lo agrega)
    toggleFavorite: (state, action) => {
      const userId = action.payload;
      const index = state.favoriteUsers.findIndex(id => String(id) === String(userId));
      
      if (index !== -1) {
        // Si existe, quitarlo
        state.favoriteUsers.splice(index, 1);
      } else {
        // Si no existe, agregarlo
        state.favoriteUsers.push(userId);
      }
      localStorage.setItem('favoriteUsers', JSON.stringify(state.favoriteUsers));
    },
    
    // Limpiar TODOS los favoritos
    clearFavorites: (state) => {
      state.favoriteUsers = [];
      localStorage.removeItem('favoriteUsers');
    },
  },
});

// Exportar las acciones para usarlas en los componentes
export const { 
  addFavorite, 
  removeFavorite, 
  toggleFavorite, 
  clearFavorites 
} = favoritesSlice.actions;

// Selectores = Funciones para LEER el estado
export const selectFavoriteUsers = (state) => state.favorites.favoriteUsers;
export const selectIsFavorite = (userId) => (state) => 
  state.favorites.favoriteUsers.some(id => String(id) === String(userId));

// Exportar el reducer para el store
export default favoritesSlice.reducer;