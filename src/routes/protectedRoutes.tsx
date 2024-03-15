import React from 'react';
import Profile from '@pages/User/Profile';
import Dashboard from '@pages/Dashboard';
import { Navigate } from 'react-router-dom';

export const protectedRoutes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];
