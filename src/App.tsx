import React, { useEffect, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../public/favicon.ico';

import { getUser } from '@services/user.service';
import { loginSuccess } from '@redux/slices/auth.slice';
import { persistor } from '@redux/store';
import useAuth from '@hooks/useAuth';
import { handleApiError } from '@utils/errorHandler';
import { getAuthTokens } from '@utils/auth';
import createRoutes from './routes';

function App() {
  const dispatch = useDispatch();

  // Check if the user is authenticated by checking availability of tokens
  const isAuthenticated = useAuth();

  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  /**
   * Get user data or initiate logout procedure
   * @returns
   */
  const fetchUser = async () => {
    try {
      const authTokens = getAuthTokens();

      // check if access token is missing if so reset user data from redux state
      if (!authTokens?.accessToken) {
        // Dispatch the PURGE action to clear all persisted states
        persistor.purge();
        return;
      }

      const response = await getUser();
      if (response?.data) {
        // update redux state
        dispatch(loginSuccess(response.data));
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  // Memoize the routes configuration to prevent unnecessary re-renders
  const routers = useMemo(() => createRoutes(isAuthenticated), [isAuthenticated]);

  return <RouterProvider key="router" router={routers} />;
}

export default App;
