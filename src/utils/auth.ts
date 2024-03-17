import { ITokens } from '@interfaces/auth.interface';
import { encryptStorage } from './storage';

/**
 * Extracts the access token from a Bearer authorization header.
 * @param authorizationHeader The Bearer authorization header string.
 * @returns The access token extracted from the authorization header, or null if the header is missing or invalid.
 * @example
 * Example usage:
 * const authorizationHeader = 'Bearer eyJhbGciOiJIUzI1NiI...';
 * const accessToken = getAccessTokenFromBearer(authorizationHeader); // output: eyJhbGciOiJIUzI1NiI...
 */
export const getAccessTokenFromBearer = (authorizationHeader: string): string | null => {
  if (!authorizationHeader) {
    return null; // Handle missing header case
  }

  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    console.error(`Invalid Authorization header value received`);
    return null; // Handle invalid format
  }

  return parts[1];
};

/**
 * Stores the authentication tokens securely using encryption.
 * @param {ITokens} tokens - The authentication tokens containing access token and refresh token.
 */
export const storeAuthTokens = (tokens: ITokens) => {
  const { accessToken: bearerAccessToken, refreshToken } = tokens;
  // strip out `Bearer` part from thr token
  const accessToken = getAccessTokenFromBearer(bearerAccessToken);

  // Store the tokens securely using encryption
  encryptStorage.setMultipleItems([
    ['accessToken', accessToken],
    ['refreshToken', refreshToken],
  ]);
};

/**
 * Retrieves the authentication tokens securely using encryption.
 * @returns {ITokens | null} The authentication tokens containing access token and refresh token, or null if not found.
 */
export const getAuthTokens = (): ITokens | null => {
  // Retrieve the tokens securely using encryption
  const accessToken = encryptStorage.getItem('accessToken');
  const refreshToken = encryptStorage.getItem('refreshToken');

  // Return the tokens if both are present, otherwise return null
  if (accessToken && refreshToken) {
    return { accessToken, refreshToken };
  } else {
    return null;
  }
};

/**
 * Removes the authentication tokens from storage.
 */
export const removeAuthTokens = (): void => {
  // Remove the tokens from storage
  encryptStorage.removeItem('accessToken');
  encryptStorage.removeItem('refreshToken');
};
