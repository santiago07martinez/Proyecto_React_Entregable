import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../services/usersApi';
import favoritesReducer from './favoritesSlice';

// Store central de la aplicación - Es como el "cerebro" que guarda todo el estado
export const store = configureStore({
  reducer: {
    // Maneja las peticiones a la API automáticamente
    [usersApi.reducerPath]: usersApi.reducer,
    
    // Slice de favoritos - Maneja el estado de usuarios favoritos
    favorites: favoritesReducer,
  },
  
  // Middleware necesario para que RTK Query funcione correctamente
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export default store;