import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteUsers: [], // Array vacío de donde se almacenan usuarios favoritos
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  
  reducers: {
    
    // Agregar un usuario a favoritos
    addFavorite: (state, action) => {
      const userId = action.payload; // El ID del usuario
      // Solo agregar si NO está ya en favoritos
      if (!state.favoriteUsers.includes(userId)) {
        state.favoriteUsers.push(userId);
      }
    },
    
    // Quitar un usuario de favoritos
    removeFavorite: (state, action) => {
      const userId = action.payload;
      // Filtrar = quedarnos con todos MENOS el que queremos quitar
      state.favoriteUsers = state.favoriteUsers.filter(id => id !== userId);
    },
    
    // Alternar favorito (si está lo quita, si no está lo agrega)
    toggleFavorite: (state, action) => {
      const userId = action.payload;
      const index = state.favoriteUsers.indexOf(userId);
      
      if (index !== -1) {
        // Si existe, quitarlo
        state.favoriteUsers.splice(index, 1);
      } else {
        // Si no existe, agregarlo
        state.favoriteUsers.push(userId);
      }
    },
    
    // Limpiar TODOS los favoritos
    clearFavorites: (state) => {
      state.favoriteUsers = [];
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
  state.favorites.favoriteUsers.includes(userId);

// Exportar el reducer para el store
export default favoritesSlice.reducer;