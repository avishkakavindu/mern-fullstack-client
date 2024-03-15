import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { getAuthTokens } from '@utils/auth';

const useAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Retrieve the authentication token
  let authTokens = null;
  try {
    authTokens = getAuthTokens();
  } catch (error) {
    console.error('Error retrieving authentication token:', error);
  }

  // Determine if the user is authenticated
  const isAuthenticatedUser = !!(authTokens?.accessToken && isAuthenticated);

  // Return the authentication state
  return isAuthenticatedUser;
};

export default useAuth;
