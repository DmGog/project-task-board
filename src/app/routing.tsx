import { Dashboard, Home, Login, Registration, TodolistBoard } from '@/pages';
import { Route, Routes } from 'react-router';

export const PATH = {
  HOME_PAGE: '/',
  NOT_FOUND_PAGE: '*',
  LOGIN_PAGE: '/login',
  REGISTRATION_PAGE: '/registration',
  PROFILE_PAGE: '/profile',
  DASHBOARD_PAGE: '/dashboard',
  TODOLIST_BOARD_PAGE: '/todolist-board/:id',
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route path={PATH.HOME_PAGE} element={<Home />} />
      <Route path={PATH.LOGIN_PAGE} element={<Login />} />
      <Route path={PATH.REGISTRATION_PAGE} element={<Registration />} />
      <Route path={PATH.DASHBOARD_PAGE} element={<Dashboard />} />
      <Route path={PATH.TODOLIST_BOARD_PAGE} element={<TodolistBoard />} />
    </Routes>
  );
};
