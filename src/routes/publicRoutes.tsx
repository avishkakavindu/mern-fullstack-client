import React from 'react';
import About from '@pages/About';
import SignIn from '@pages/Auth/SignIn';
import SignUp from '@pages/User/SignUp';
import { Navigate } from 'react-router-dom';

export const publicRoutes = [
  {
    path: '/',
    element: <Navigate to="/sign-in" />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/about',
    element: <About />,
  },
];
