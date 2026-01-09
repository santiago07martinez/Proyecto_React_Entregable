import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API para consumir datos de usuarios desde JSONPlaceholder
export const usersApi = createApi({
  reducerPath: 'usersApi',
  
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),

  
  tagTypes: ['User'],
  
  endpoints: (builder) => ({
    
    // GET: Obtener TODOS los usuarios
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
      // Cache por 60 segundos
      keepUnusedDataFor: 60,
    }),
    
    // GET: Obtener UN usuario por ID
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    
    // POST: Crear nuevo usuario
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      // Invalida el cache para refrescar la lista
      invalidatesTags: ['User'],
    }),
    
    // PUT: Actualizar usuario existente
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    
    // DELETE: Eliminar usuario
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    
  }),
});

// RTK Query genera estos hooks automáticamente
export const {
  useGetUsersQuery,           // Hook para obtener usuarios
  useGetUserByIdQuery,        // Hook para obtener un usuario
  useCreateUserMutation,      // Hook para crear usuario
  useUpdateUserMutation,      // Hook para actualizar usuario
  useDeleteUserMutation,      // Hook para eliminar usuario
} = usersApi;