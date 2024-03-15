import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { PrivateLayout, PublicLayout } from '@components/index';
import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';

/**
 * Creates a router configuration based on authentication state.
 *
 * This function dynamically defines routes based on whether the user is authenticated or not.
 * It returns a `createBrowserRouter` configuration object for use with React Router DOM.
 *
 * @param isAuthenticated - A boolean indicating whether the user is currently authenticated.
 * @returns A `createBrowserRouter` configuration object.
 */
const createRoutes = (isAuthenticated: boolean) =>
  createBrowserRouter([
    {
      element: isAuthenticated ? <PrivateLayout /> : <PublicLayout />,
      children: isAuthenticated ? protectedRoutes : publicRoutes,
    },
  ]);

export default createRoutes;
