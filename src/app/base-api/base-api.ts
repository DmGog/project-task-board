import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.todo.ivrupo.ru/api/v1',
    credentials: 'include',
  }),
  endpoints: () => ({}),
  tagTypes: ['editor', 'tasks'],
});
